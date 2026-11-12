---
title: "Single Sign-On with Spring and SAML 2.0"
description: "How SAML 2.0 single sign-on works, the terms you need, and how to wire a Spring Boot service provider to the OneLogin identity provider with the Spring SAML DSL."
pubDate: 2018-09-12
tags: ["Spring Boot", "Spring Security", "SAML", "SSO", "OneLogin"]
category: "Spring"
draft: false
featured: false
readingTime: "12 min read"
---

> **Note:** The demo code uses [Project Lombok](https://projectlombok.org/). Install the Lombok plugin in your IDE to avoid compile errors.
>
> The Spring SAML artifacts and `WebSecurityConfigurerAdapter` used in this article are from the Spring Security 5 era. They are deprecated in current Spring releases. The concepts still apply, but check the current Spring Security documentation before you start a new project.

## Overview

[Single sign-on (SSO)](https://en.wikipedia.org/wiki/Single_sign-on) is an authentication process that lets users use one set of credentials across several applications in an organization. SSO gives you:

- **One set of credentials,** defined in an [LDAP](https://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol) server.
- **One login** to access multiple applications.
- **Less user management,** such as disabling, locking and unlocking accounts.

Two protocols are commonly used for SSO: [OpenID Connect](https://en.wikipedia.org/wiki/OpenID_Connect) and [SAML 2.0](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html). This article focuses on SAML 2.0. Before we get into the code, let's go through some SSO and SAML terminology.

## SSO terminology

- **SAML**: Security Assertion Markup Language is a digitally signed XML document. It contains information about the user, the source and destination systems that should use the document, and other details needed to validate the XML signature.
- **IDP**: The Identity Provider identifies the user and issues the signed SAML document.
- **SP**: The Service Provider receives the SAML XML.
- **Metadata**: An XML document that describes the identity provider and the service provider. The [SAML metadata](https://en.wikipedia.org/wiki/SAML_Metadata) is issued by the identity provider when a service provider registers an application. Metadata is specific to each application. It contains an `entityId` attribute that is unique to that application.
- **Success callback URL**: The service provider's URL where the identity provider posts the SAML response.
- **IDP-initiated SSO**: The user logs in to the identity provider's website, then accesses a service provider's resources. The identity provider starts the request to the service provider and posts the SAML response to grant access.
- **SP-initiated SSO**: The user requests a protected page on the service provider. The service provider sends the request to the identity provider to validate the user. If the user isn't logged in, the identity provider asks for credentials. After a successful login, the identity provider posts the SAML response to the service provider.

## Spring SAML

Spring provides two artifacts for SAML 2.0:

- **`spring-security-saml2-core`** extends Spring Security to support basic SAML processing for single sign-on.
- **`spring-security-saml-dsl-core`** is used with the SAML 2 core. It provides the basic configuration for request mappings, filters and the authentication provider.

You can use the SAML 2 core alone, but then you have to configure request mappings, filters, authentication, the SAML context and many other details that most applications need. The DSL handles that for you. `spring-security-saml-dsl-core` configures these request mappings by default:

- **`/saml/metadata`** displays and reads the metadata file.
- **`/saml/login`** generates the login request and redirects to the IDP login page.
- **`/saml/logout`** logs out and clears the global or local session. Pass `local=true` to log out of only the application session. Without that parameter, the global session is cleared and you are logged out of every application open in the browser.
- **`/saml/SSO`** is the success callback URL. The IDP posts the SAML response to this endpoint.

## IDP configuration

Spring SAML supports several identity providers, including ADFS, Okta, Shibboleth, OpenAM and OneLogin. This demo uses OneLogin, but the code can work with other vendors too.

### OneLogin registration

1. Sign up for a free trial on the [OneLogin developer portal](https://www.onelogin.com/developer-signup).
2. After you register, follow the [OneLogin Java guide](https://developers.onelogin.com/saml/java) and complete only **task 2** to register your application.
3. Once the app is added in the portal, open the **Configuration** tab and enter these values:

   | Setting | Value |
   | --- | --- |
   | Audience | `http://localhost:8080/saml/metadata` |
   | Recipient | `http://localhost:8080/saml/SSO` |
   | ACS URL validator | `.*` |
   | ACS URL | `http://localhost:8080/saml/SSO` |
   | Single Logout URL | `http://localhost:8080/saml/logout` |

   This demo runs on port 8080 over HTTP. If you use a different port, update these values. Property names can differ between providers. The configuration looks like this:

   ![OneLogin application configuration](/blog/spring-saml-single-sign-on/idp-register.png)

4. Download the metadata file. Use the **More Actions** menu and select **SAML Metadata**. Copy the downloaded XML into your project's resources folder.

   ![Downloading the OneLogin SAML metadata](/blog/spring-saml-single-sign-on/idp-metadata.png)

## SP configuration

1. Create a Spring Boot Maven project and add the SAML core and SAML DSL dependencies to `pom.xml`:

   ```xml
   ...
   <dependencies>
       <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-web</artifactId>
       </dependency>
       <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-security</artifactId>
       </dependency>
       <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-test</artifactId>
         <scope>test</scope>
       </dependency>
       <dependency>
         <groupId>org.springframework.security.extensions</groupId>
         <artifactId>spring-security-saml2-core</artifactId>
         <version>1.0.3.RELEASE</version>
       </dependency>
       <dependency>
         <groupId>org.springframework.security.extensions</groupId>
         <artifactId>spring-security-saml-dsl-core</artifactId>
         <version>1.0.5.RELEASE</version>
       </dependency>
   </dependencies>
   ...
   ```

2. Use the Java `keytool` to generate a self-signed certificate. Place the resulting `keystore.jks` file in the resources folder:

   ```bash
   keytool -genkey -keyalg RSA -alias onelogin -keystore keystore.jks -storepass secret -validity 360 -keysize 2048
   ```

3. Place the OneLogin [metadata](#idp-configuration) file in the resources folder. You downloaded it in the previous section.

4. Create `SecurityConfig.java` with the configuration below:

   ```java
   package com.techsam.onelogin.config;

   import static org.springframework.security.extensions.saml2.config.SAMLConfigurer.saml;

   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.beans.factory.annotation.Value;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.security.config.annotation.web.builders.HttpSecurity;
   import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
   import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

   @EnableWebSecurity
   @Configuration
   public class SecurityConfig extends WebSecurityConfigurerAdapter {

     @Value("${onelogin.metadata-path}")
     private String metadataPath;

     @Value("${onelogin.sp.protocol}")
     private String spProtocol;

     @Value("${onelogin.sp.host}")
     private String spHost;

     @Value("${onelogin.sp.path}")
     private String spBashPath;

     @Value("${onelogin.sp.key-store.file}")
     private String keyStoreFile;

     @Value("${onelogin.sp.key-store.password}")
     private String keyStorePassword;

     @Value("${onelogin.sp.key-store.alias}")
     private String keyStoreAlias;

     @Autowired
     private SAMLUserService samlUserService;

     @Override
     protected void configure(final HttpSecurity http) throws Exception {
       //@formatter:off
       http
         .csrf().and()
         .authorizeRequests()
           .antMatchers("/saml/**").permitAll()
           .anyRequest().authenticated()
           .and()
         .apply(saml())
           .userDetailsService(samlUserService)
           .serviceProvider()
             .protocol(spProtocol)
             .hostname(spHost)
             .basePath(spBashPath)
             .keyStore()
               .storeFilePath(keyStoreFile)
               .keyPassword(keyStorePassword)
               .keyname(keyStoreAlias)
             .and()
           .and()
           .identityProvider()
             .metadataFilePath(metadataPath)
           .and()
       .and();
       //@formatter:on
     }
   }
   ```

   `saml()` is a static method that returns the `SAMLConfigurer` singleton. It holds the SAML 2 request mappings, filters and authentication provider details.

   When the application receives a SAML response, it validates the XML first. That includes the source and destination IDs, the session time and the signature. If the response is valid, the SAML DSL calls `userDetailsService()`. You can implement your own user service there to convert the XML into your user model.

   The most important part of this configuration is `serviceProvider()`. After a successful login, the IDP posts the SAML response to `/saml/SSO` on the service provider. The service provider validates the entity ID, destination, audience and other details. In the [IDP configuration](#idp-configuration) step, I used the `http://localhost:8080` domain everywhere, so the SAML response's destination is `http://localhost:8080/saml/SSO`. The request is checked against the local instance's domain. If the SAML destination doesn't match the local instance name, validation fails.

   That works for local development or a single instance. In production, the situation changes. You usually run multiple instances on several nodes behind a load balancer. In the IDP configuration, you enter the load balancer's domain instead of a single node's domain. Validation then fails if the SAML destination is the load balancer domain and the request comes to a node.

   `spring-security-saml2-core` includes two SAML context providers: `SAMLContextProviderImpl` and `SAMLContextProviderLB`. `spring-security-saml-dsl-core` uses `SAMLContextProviderLB` by default. When it validates the SAML destination, `SAMLContextProviderLB` uses the configured domain instead of the processing node's domain. For a load-balanced environment, set `onelogin.sp.protocol` and `onelogin.sp.host` in `application.yml` to the load balancer's values.

5. Add the self-signed certificate and metadata file details to `application.yml`:

   ```yaml
   onelogin:
     metadata-path: classpath:onelogin/onelogin_metadata_897921.xml
     sp:
       protocol: http
       host: localhost:8080
       path: /
       key-store:
         file: classpath:onelogin/keystore.jks
         alias: onelogin
         password: secret
   ```

## Process flow

![SSO flow with Spring and SAML](/blog/spring-saml-single-sign-on/single-sign-on-with-spring-saml-sm.svg)

## Source code

The complete code is in the [springboot-onelogin-sso repository](https://github.com/sambasiva-dev/springboot-onelogin-sso).

## Key takeaway

Spring's SAML DSL handles most of the SAML plumbing. Your job is to match the identity provider's configuration to your service provider: the audience, the ACS URL, the metadata file, and the destination domain, including the load balancer's domain in production.
