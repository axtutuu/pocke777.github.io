---
title: Set RAILS_ENV with puma and capistrano3
tags:
  - puma
  - capistrano3
date: 2016-08-15 23:43:56
---


## doesn't work

```
set :rails_env,      "staging"
```

## Try this

```
set :default_env, { "RAILS_ENV" => "staging" }
```


