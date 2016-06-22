---
title: Get Error with Too-many-open-files
tags:
  - Troubleshooting
  - OSX
date: 2016-06-16 14:28:16
---


## Find Too-many-open-files
`rspec` や `minitest` を回すときにたまに遭遇する`Too-many-open-files`
ファイルディスクリプタの上限数に達していることが原因

```

# テストコケまくり!! と思いきや failしている
HogeTest
  #POST/hoge

  Errno::EMFILE
  Too many open files - getcwd


FugaTest
  InvalidValue

  Errno::EMFILE
  Too many open files - getcwd


# 現在のファイルリミット数
$ launchctl limit maxfiles
maxfiles    256            unlimited


# オープンファイルをプロセスごとに一覧化
$ lsof | awk '{print $1, $2}' | sort | uniq -c | sort -rn
1705 duet 70485
1077 Google 838
 576 Dock 619
 299 Google 731
 299 Dropbox 711
 298 Finder 623
 237 SIMBL\x20 645
 204 mysqld 41836
 177 AppleSpel 5393
 153 iTerm 15385
```

## Fix

一時的にlimit数を引き上げる

```
$ ulimit -n 1024
# 設定画変更されていることを確認
$ ulimit -n
1024
```

## Reference

https://docs.basho.com/riak/kv/2.1.4/using/performance/open-files-limit/#mac-os-x
