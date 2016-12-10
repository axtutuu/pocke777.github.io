---
title: Fix Brakeman Warnning
tags:
  - "Ruby on Rails"
---

Fix examples with Brakeman
https://github.com/presidentbeef/brakeman

### Unsafe reflection method constantize called with model attribute
do not use constantize method

```
klass = "Hoge".constantize
↓
klass = [Hoge].find { |c| c.name == "Hoge" }
```

### User input in eval near
do not use eval method

```
eval("hoge")
↓
hoge
```
### Unsafe parameter value in link_to
do not use raw parameter
```
link_to params.merge(hoge: "fuga")
↓
link_to hoge: "fuga", hogehoge: params[:hogehoge]
```

