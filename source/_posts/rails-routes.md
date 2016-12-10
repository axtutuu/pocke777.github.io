---
title: Rails Fetch Url from Controller and Action Name
tags:
  - Ruby on Rails
date: 2016-06-27 23:56:19
---


## Case

* Fetch Url
```
Rails.application.routes.path_for(controller: "controller_name", action: "action_name")
=> "/index"
```

* Fetch Controller
```
Rails.application.routes.recognize_path("/")
=> {:controller=>"site/top", :action=>"index"}
```
