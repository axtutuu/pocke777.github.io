---
title: Rails redirect with query parameters in routes
tags:
  - Ruby on Rails
date: 2016-06-21 10:51:19
---



## Redirect with query parameter

```
get "/hoge", to: redirect { |params, request|
                                  parameters = request.params
                                  hash   =
                                    {
                                      hoge: parameters[:hoge],
                                      fuga: parameters[:fuga]
                                    }
                                 "/fuga?#{hash.to_query}"
                               }
```

* Use params

```
get "/hoge/:fuga", to: redirect { |params, request|
                                  hash   =
                                    {
                                      hoge: params[:fuga]
                                    }
                                 "/fuga?#{hash.to_query}"
                               }
```


* Other options

```
get "/hoge/:fuga", to: redirect { |params, request|
                                  hash   =
                                    {
                                      hoge: params[:fuga]
                                    }
                                 "/fuga?#{hash.to_query}"
                               },
                               constraints: {
                                 fuga: /hoge|fuga/
                               }
```
