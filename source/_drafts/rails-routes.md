---
title: Rails How to Get Url from Controller and Action Name
tags:
  - "Ruby on Rails"
---

## Case

* Get Url
```
Rails.application.routes.path_for(controller: "controller_name", action: "action_name")
=> "/index"
```

* Get Controller
```
Rails.application.routes.recognize_path("/")
=> {:controller=>"site/top", :action=>"index"}
```
