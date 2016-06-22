---
title: Ruby on Rails Touch has_many association
tags:
  - Ruby on Rails
date: 2016-06-22 14:15:45
---


## What about touch option

Uploate association attributes (default updated_at)
http://railsdoc.com/references/belongs_to

Example
```
class Hello
  belongs_to :hoge, touch: true
end

# then
UPDATE `hellos` SET `name` = 'Hey', `updated_at` = '2016-06-22 13:21:19' WHERE `hellos`.`id` = 1
UPDATE `hoges`  SET `hoges`.`updated_at` = '2016-06-22 13:21:19' WHERE `hoges`.`id` = 1
```

## Touch to has_many association

use after save callback
https://github.com/rails/rails/issues/8759

```
class Hoge
  has_many :hellos
  after_save -> { self.hellos.map(&:touch) }
end

# then
UPDATE `hoges`  SET `name` = 'Hey', `hoges`.`updated_at` = '2016-06-22 13:21:19' WHERE `hoges`.`id` = 1
UPDATE `hellos`  SET `hellos`.`updated_at` = '2016-06-22 13:21:19' WHERE `hellos`.`id` = 1
UPDATE `hellos`  SET `hellos`.`updated_at` = '2016-06-22 13:21:19' WHERE `hellos`.`id` = 2
UPDATE `hellos`  SET `hellos`.`updated_at` = '2016-06-22 13:21:19' WHERE `hellos`.`id` = 3




```

## References
Callback - after_save
http://apidock.com/rails/ActiveRecord/Callbacks/after_save
