---
title: 【Ruby on Rails】boolean型のカラムに必須制約を付ける方法
date: 2016-06-14 21:11:51
tags:
 - "Ruby on Rails"
 - "boolean"
---

## Bad

```
validates :boolean, presence: true
```
※boolean値でfalseが返ってきた時に必須制約がかかってしまうので登録できない

## Good

```
validates :boolean, inclusion: { in: [true, false] }
```
