---
title: "Spring Kafka Integration with Kerberos Authentication"
description: "How Kerberos ticket-based authentication works, how to create a krb5 configuration and keytab, and how to connect a Spring Boot Kafka producer to a Kerberos-secured cluster."
pubDate: 2018-11-05
tags: ["Spring Boot", "Spring Kafka", "Kafka", "Kerberos", "Security"]
category: "Spring"
draft: false
featured: false
readingTime: "10 min read"
---

![Spring Kafka integration with Kerberos authentication](/blog/spring-kafka-kerberos-authentication/spring-kafka-integration-with-kerberos-authentication-sm.svg)

## Overview

In a distributed system, services run on different machines. When one service needs to call another over the network, the simplest approach is password-based authentication. The consuming service sends its username and password with each request. That means the serving services must store every consumer's credentials to validate each request, and each consumer must store its own credentials to call the services.

[Kerberos](https://en.wikipedia.org/wiki/Kerberos_(protocol)) is a network authentication protocol that works with tickets. It lets nodes that communicate over an insecure network prove their identity to one another securely ([source: Wikipedia](https://en.wikipedia.org/wiki/Kerberos_(protocol))). It uses tickets and symmetric-key cryptography. Kerberos supports single sign-on, so the serving and consuming systems don't need a separate set of credentials. They can use the network credentials that users already use to log in. Kerberos is supported by most operating systems, including Windows, Solaris, Unix and Unix-like systems. To learn how it works, see the [Wikipedia article](https://en.wikipedia.org/wiki/Kerberos_(protocol)) and the [Red Hat documentation](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/managing_smart_cards/using_kerberos). A few terms are worth knowing first:

- **Key Distribution Center (KDC)** is a trusted third party. It identifies a system or user by principal and issues an encrypted Ticket-Granting Ticket (TGT).
- **Authentication Server (AS)** is part of the KDC. It validates the principal.
- **Ticket Granting Service (TGS)** is also part of the KDC. Once the principal is identified, the TGS issues the encrypted, timestamped ticket (TGT).

The diagram below shows the flow. The [Red Hat documentation](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/managing_smart_cards/using_kerberos) explains it in more detail.

![Kerberos authentication flow](https://access.redhat.com/webassets/avalon/d/Red_Hat_Enterprise_Linux-6-Managing_Smart_Cards-en-US/images/d314590391f06f79ad4bc8433ab5480a/kerberos.png)

## Prerequisites

This article covers only the Kafka producer configuration with [Spring Boot](https://spring.io/projects/spring-kafka). It does not cover Kafka server administration. To set up Kafka, follow the [Kafka quick start](https://kafka.apache.org/quickstart).

## Kerberos configuration

1. Check whether the consumer or provider system already has a Kerberos configuration file. Use the `locate` or `find` command to search for it. It is usually in the `/etc/krb5` folder. If you find the file, skip to step 7.

   ```bash
   $ find krb5.conf
   ```

2. If the file doesn't exist, create a folder called `krb5` in any path, then create `krb5.conf` with the configuration below. Replace the placeholders in **bold capitals** with your realm and server details.

   ```ini
   [libdefaults]
   default_realm = YOUR_REALM
   dns_lookup_kdc = false
   dns_lookup_realm = false
   ticket_lifetime = 86400
   renew_lifetime = 604800
   forwardable = true
   default_tgs_enctypes = rc4-hmac aes256-cts aes128-cts
   default_tkt_enctypes = rc4-hmac aes256-cts aes128-cts
   permitted_enctypes = rc4-hmac aes256-cts aes128-cts
   udp_preference_limit = 1
   rdns = false
   kdc_timeout=10
   [realms]
   YOUR_REALM = {
      kdc = YOUR_PRIMARY_KDC_SERVER_ADDRESS
      kdc = YOUR_SECONDARY_KDC_SERVER_ADDRESS
      admin_server = YOUR_KDC_ADMIN_SERVER_ADDRESS
   }
   ```

   You can adjust other settings, such as encryption algorithms, ticket renewal time or lifetime, to suit your needs. If you are not sure about these values, check with your infrastructure team.

3. Create a keytab file with the `ktutil` command inside the `krb5` folder. The prompt changes to `ktutil`.

   ```bash
   $ ktutil
   ```

4. Add your principal, password and encryption type. Enter the password when prompted.

   ```
   ktutil: addent -password -p YOUR_PRINCIPAL -k 1 -e rc4-hmac
   ```

5. Save the entries to a keytab file.

   ```
   ktutil: wkt YOUR_FILE_NAME.keytab
   ```

6. Quit `ktutil`.

   ```
   ktutil: quit
   ```

7. Get a ticket and check the configuration with `kinit`. Enter the principal's password when prompted.

   ```bash
   $ kinit
   ```

## Spring configuration

Add the Kafka dependencies to your Spring Boot `pom.xml`:

```xml
<!-- spring-kafka -->
<dependency>
  <groupId>org.springframework.kafka</groupId>
  <artifactId>spring-kafka</artifactId>
  <version>${spring-kafka.version}</version>
</dependency>
<dependency>
  <groupId>org.springframework.kafka</groupId>
  <artifactId>spring-kafka-test</artifactId>
  <version>${spring-kafka.version}</version>
  <scope>test</scope>
</dependency>
```

Then update `application.yml` with the Kafka configuration:

```yaml
spring:
  kafka:
    bootstrap-servers: node1.sam.org:6667,node2.sam.org:6667
    consumer:
      group-id: price
    jaas:
      enabled: true
    properties:
      security:
        protocol: SASL_PLAINTEXT
      sasl:
        mechanism: GSSAPI
        kerberos:
          service:
            name: kafka
        jaas:
          config: com.sun.security.auth.module.Krb5LoginModule required useTicketCache=true renewTicket=true serviceName="kafka" principal="svc-kafka@SAM.ORG" useKeyTab=true keyTab="/etc/kbr5/svc-kafka.keytab";
```

The Kafka service name must match the Kafka server configuration. Replace the principal and keytab path with your own values.

## Source code

Before you run the demo, create the topic `DATA.PRICE` and start the Kafka server, ZooKeeper and a topic consumer. See the [Kafka quick start](https://kafka.apache.org/quickstart) for details. The complete code is in the [spring-kafka-kerberos repository](https://github.com/sambasiva-dev/spring-kafka-kerberos). This code runs from the command prompt. Run `com.techsams.spring.Application` to start the program.

## Key takeaway

Kerberos lets a Spring Boot Kafka client authenticate with the network identity it already has, so you don't have to store passwords in each service. Set up `krb5.conf` and a keytab, confirm the ticket with `kinit`, and point the Spring Kafka JAAS configuration at the keytab and principal.
