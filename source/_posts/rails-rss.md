---
title: RSS 2.0 feed in Ruby on Rails
tags:
  - Ruby on Rails
  - RSS
  - Atom
date: 2016-06-14 01:15:04
---


### RSS 2.0
Rss Feed Example for posts [more infomation](http://www.rssboard.org/rss-profile)

Use xml builder Create file with `app/views/feed.rss.builder`

```
feed_default_options = {
  "version"    => "2.0",
  "xmlns:dc"   => "http://purl.org/dc/elements/1.1/",
  "xmlns:atom" => "http://www.w3.org/2005/Atom"
}

site_url = "example.com"

atom_link_options = {
  href: URI.join(site_url, "rss").to_s,
  rel:  "self",
  type: "application/rss+xml"
}

xml.instruct!
xml.rss feed_default_options do
  xml.channel do
    xml.title       "title"
    xml.link        site_url
    xml.pubDate     Time.now.to_s(:rfc822)
    xml.description "description"
    xml.atom        :link, atom_link_options

    @items.each do |item|
      xml.item do
        xml.title       item.title
        xml.link        item.feed_url
        xml.guid        item.feed_url
        xml.description item.feed_description
        xml.pubDate     item.feed_published_at.to_s(:rfc822)
        xml.category    item.feed_category
      end
    end

  end
end

```

### add auto discovery link in `<head>`
```
= auto_discovery_link_tag rss_path
```

### last check url xml with validator

validator.w3.org
https://validator.w3.org/feed/check.cgi

## Reference

RSS feed in Ruby on Rails
http://crabonature.pl/posts/18-rss-feed-in-ruby-on-rails

Atom 1.0 のフォーマット
http://phpjavascriptroom.com/?t=topic&p=atom_format

Rails で Atom / RSS フィードを生成する Builder テンプレート
http://webos-goodies.jp/archives/builder_templates_for_atom_and_rss_feeds.html
