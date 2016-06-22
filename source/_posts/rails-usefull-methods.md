---
title: Ruby on Rails useful methods
tags:
  - Ruby on Rails
  - Methods
  - develop
date: 2016-06-19 23:41:27
---


## Hash

* Remove

```
{"1" => "one", "2" => "two", "3" => "three"}.slice("3")
=> {"3"=>"three"}

{"1" => "one", "2" => "two", "3" => "three"}.except("3")
=> {"1"=>"one", "2"=>"two"}
```

## String

* To snake case
```
"HelloWorld".underscore
=> "hello_world"

"hello_world".camelize
=> "HelloWorld"
```

* To object
```
"HelloWorld".constantize
=> HelloWorld
```

* plural form <=> singular form

```
"hello_world".pluralize
=> "hello_worlds"

"hello_worlds".singularize
=> "hello_world"
```

* 文字列パディング

```
6.to_s.rjust(2, "0")
=> "06"
6.to_s.ljust(2, "0")
=> "60"
6.to_s.center(4, "0")
=> "0600"
```

* `.to_s(:db)` には注意
それぞれ、タイムゾーンの違いに注意してください。
特にActiveRecordを使った際など`created_at`はTimeWithZoneになるため、
期待した挙動と変わる。

```
Time.now.to_s(:db)
=> "2016-06-19 21:14:41"
Time.zone.now.to_s(:db)
=> "2016-06-19 12:15:00"
```

## Array

* Remove

```
["ja", "ja", "en"].delete_if { |i| i == "ja" }
=> ["en"]

["ja", "ja", "en"].reject { |i| i == "ja" }
=> ["en"]

["ja", "ja", "en"].reject! { |i| i == "ja" }
=> ["en"]
```
