---
title: How to use ORDER BY FIELD with Rails
tags:
  - Ruby on Rails
  - Mysql
date: 2016-06-24 15:20:08
---


## Case
* when sort with array ids

Example
```
ids = [1,2,3]
=> [1, 2, 3]
Hello.where(id: ids).order(["field(id, #{ids.join(",")})"]).to_sql
=> "SELECT `hellos`.* FROM `hello` WHERE `hello`.`id` IN (1, 2, 3)  ORDER BY field(id, 1,2,3)"

# Better
query = Mysql2::Client.escape("field(id, #{ids.join(",")})")
=> "field(id, 1,2,3)"

Hello.where(id: ids).order(query).to_sql
=> "SELECT `hellos`.* FROM `hello` WHERE `hello`.`id` IN (1, 2, 3)  ORDER BY field(id, 1,2,3)"

```

## Reference

http://qiita.com/chezou/items/8c0481044c954c4bca3b
