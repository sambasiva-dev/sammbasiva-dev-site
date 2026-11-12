---
title: "Free Website Hosting with GitHub Pages"
description: "How to host a static website on GitHub Pages for free and map your own domain to it, with the GitHub and DNS steps and how to verify the setup."
pubDate: 2017-06-15
tags: ["GitHub Pages", "Static Hosting", "DNS", "Web Hosting"]
category: "DevOps"
draft: false
featured: false
readingTime: "6 min read"
---

## Introduction

This article explains how to use [GitHub Pages](https://pages.github.com/) as a static web hosting server. Usually, if you want a website, you need to buy a domain and then buy storage space to keep the static files. There are many domain providers in the market. I did my domain registration through [GoDaddy](http://www.godaddy.com), but you can choose any domain provider you like.

Once you register a domain, you need a web server to serve your content. That content could be plain text, images, music, videos and so on. Like domain providers, there are many hosting providers. Most domain providers offer hosting as well, but you pay for it.

If you only need standard or static content for your website, and you don't need any special server-side software (this is called static web hosting), there are providers that offer it at a lower price. For example, [Amazon S3 static website hosting](https://aws.amazon.com/getting-started/projects/host-static-website/). With GitHub Pages, we don't need to spend any money on this. We can host a website on GitHub without paying a single penny. This is useful for anyone who wants a site with static pages, such as a company profile, a business brochure, a blog or a personal profile.

Use the steps below to create a page on GitHub and map it to your domain.

## Create a GitHub Pages site

The first step is creating a page. Follow the steps in the [GitHub Pages documentation](https://pages.github.com/) to create one. Don't forget to name your repository with the `.github.io` suffix. For example, if your repository is called `techsams`, name it `techsams.github.io`. If you don't use this suffix, the site still works, but the default page is rendered from the `README.md` file. With the suffix, GitHub picks `index.html` as the default page.

## GitHub configuration

GitHub has good documentation on using a custom domain with [GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site), but you have to follow several links to get the full picture. Use the steps below to add your domain to GitHub.

1. Log in to [GitHub](https://github.com/). Select your Pages repository from *Your repositories* and click *Settings*.

   ![GitHub repository settings](/blog/free-website-hosting-with-github/git-repo-settings.png)

2. Scroll down until you see *GitHub Pages*. If you haven't enabled Pages yet, select the branch that holds your web pages and click *Save*.

3. Once Pages is enabled, enter your domain name and click *Save*. You will see a success message with your website address. As soon as you save the domain, GitHub adds a file called `CNAME` to your repository.

   ![GitHub Pages settings](/blog/free-website-hosting-with-github/github-pages.png)

Once GitHub is configured, move on to the DNS configuration.

## DNS configuration

To point your domain at GitHub, you need to know how to add DNS records with your DNS provider. If you don't know how, contact your domain provider. Most providers have a web page for managing DNS records online. Here I use the [GoDaddy](http://www.godaddy.com) DNS page for the examples.

There are two kinds of domains: subdomains and apex domains. A subdomain usually starts with `www`, for example `www.techjira.com`. An apex domain has no `www`, for example `techjira.com`. The DNS configuration is different for each.

1. Log in to your DNS provider and open the DNS settings.
2. Remove any existing entries. Make sure there are no conflicting `A` or `CNAME` records for the names you are configuring.
3. If you use a subdomain (`www`), add a `CNAME` record with the value `YOUR-GITHUB-USERNAME.github.io`. For example, if your GitHub username is `sivreddyp`, the value is `sivreddyp.github.io`.
4. If you use an apex domain, add `A` records pointing to GitHub's Pages IP addresses: `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`. Check GitHub's [custom domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for the current list.
5. If you use both a subdomain and an apex domain, you need both sets of records. A sample configuration with GoDaddy looks like this:

   ![DNS settings with GoDaddy](/blog/free-website-hosting-with-github/godady-dns-setting.png)

That's it. Your hosting is set up. Once the configuration is done, open your website in a browser. Some DNS providers can take up to a day to refresh their records. To check that the configuration is correct, use the verification steps below.

## Verify the configuration

You can verify the configuration in several ways. The easiest is an online lookup. Open the [Google Admin Toolbox Dig tool](https://toolbox.googleapps.com/apps/dig/), select `A` or `CNAME`, and look up your domain. The result should look similar to this:

![DNS lookup result for a CNAME record](/blog/free-website-hosting-with-github/dig-cname.png)

## Custom error page

To serve your own page for HTTP 404 errors, create a `404.html` file in the root folder of your Pages repository.

## Key takeaway

GitHub Pages gives you free static hosting. Create a repository named `<username>.github.io`, enable Pages, map your domain with a `CNAME` or `A` record, and verify the DNS records. Once that's done, your site is served from your own domain at no cost.
