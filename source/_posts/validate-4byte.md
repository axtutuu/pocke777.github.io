---
title: How to validate 4byte char with utf-8 on Rails
tags:
  - "Ruby on Rails"
---

## Custom Validator of 4byte char

```
class 4byteCharValidator < ActiveModel::Validator
  CHAR_TYPES = [:string, :text]

  def validate(record)
    klass        = record.class
    columns      = klass.columns.select { |c| CHAR_TYPES.include? c.type }
    char_columns = columns.map { |c| c.name.to_sym }

    char_columns.each do |c|
      next unless record.send(c).instance_of? String

      unless record.send(c).match(/[^\u{0}-\u{FFFF}]/).nil?
        record.errors.add(c, "set error message")
      end
    end
  end
end

```

## Point

```
# Get all columns of string or text type
Hoge.columns.select { |c| [:string, :text].include? c.type }

# Match only BMP characters
"string".match(/[^\u{0}-\u{FFFF}]/)
```

## Reference

Plane (Unicode)
https://en.wikipedia.org/wiki/Plane_(Unicode)
