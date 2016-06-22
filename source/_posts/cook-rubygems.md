---
title: Rubygems の作成から公開まで
tags:
  - gem
  - Ruby on Rails
date: 2016-06-20 00:27:30
---


## はじめに

今回公開したGem

* 郵便番号から住所検索
* Rakeタスクで最新の郵便番号を取り込み
* 海外の郵便番号も欲しい <- まだ未対応
とのことなので今回のGemを作成

world_postal_codes
https://rubygems.org/gems/world_postal_codes


## 手順
* 1.雛形の作成

雛形を作成するためにいつもはパッケージマネージャーで活躍するbundlerを使用します。
http://bundler.io/v1.12/bundle_gem.html

```
# 初回起動時は色々オプションを聞かれるので適当に答えましょう
$ bundle gem gem_gem_gem

Creating gem 'gem_gem_gem'...
MIT License enabled in config
Code of conduct enabled in config
      create  gem_gem_gem/Gemfile
      create  gem_gem_gem/.gitignore
      create  gem_gem_gem/lib/gem_gem_gem.rb
      create  gem_gem_gem/lib/gem_gem_gem/version.rb
      create  gem_gem_gem/gem_gem_gem.gemspec
      create  gem_gem_gem/Rakefile
      create  gem_gem_gem/README.md
      create  gem_gem_gem/bin/console
      create  gem_gem_gem/bin/setup
      create  gem_gem_gem/.travis.yml
      create  gem_gem_gem/test/test_helper.rb
      create  gem_gem_gem/test/gem_gem_gem_test.rb
      create  gem_gem_gem/LICENSE.txt
      create  gem_gem_gem/CODE_OF_CONDUCT.md
Initializing git repo in /Users/kawasaki-atsushi/workspace/gem_gem_gem
```

* Gemに公開するために基本的な設定をしていきます。

gemspecの雛形の`TODO`は全て変更しましょう。 (後々、Rubygemsにdeployするときに怒られるので)
```
# gem_gem_gem.gemspec
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'gem_gem_gem/version'

Gem::Specification.new do |spec|
  spec.name          = "gem_gem_gem"
  spec.version       = GemGemGem::VERSION
  spec.authors       = ["kawasaki-atsushi"]
  spec.email         = ["kawasaki8910@gmail.com"]

  spec.summary       = %q{test!test!}
  spec.description   = %q{test!test!}
  spec.homepage      = "http://example.com"
  spec.license       = "MIT"

  # rubygemsに公開したくない場合は設定するけど今回はコメントアウト
  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  # if spec.respond_to?(:metadata)
  #   spec.metadata['allowed_push_host'] = "TODO: Set to 'http://mygemserver.com'"
  # else
  #   raise "RubyGems 2.0 or newer is required to protect against public gem pushes."
  # end

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  # 依存Gemはここ
  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "minitest", "~> 5.0"
end

```

ここで使用されたオプションは下記のファイルに保存されている
```
cat ~/.bundle/config

```

* メインのファイルに仮のロジックをおきます
```
# lib/gem_gem_gem.rb
require "gem_gem_gem/version"

module GemGemGem
  # Your code goes here...
  def self.gemgem
    p "GEM!!"
  end
end
```

* 実行テスト
```
$ bin/console
irb(main):001:0> GemGemGem.gemgem
"GEM!!"
=> "GEM!!"
```

* Deploy

パッケージの作成
```
$ rake build
gem_gem_gem 0.1.0 built to pkg/gem_gem_gem-0.1.0.gem.
```

パッケージのデプロイ
※デプロイ前にパッケージはリモートにアップしてください。
```
$ rake release
gem_gem_gem 0.1.0 built to pkg/gem_gem_gem-0.1.0.gem.
Tagged v0.1.0.
Pushed git commits and tags.
Pushed gem_gem_gem 0.1.0 to rubygems.org.
```

## Tips

* デプロイしたRubygemsの削除
```
$ gem install gemcutter
$ gem yank -v 0.1.0 gem_sample
Yanking gem from https://rubygems.org...
Successfully deleted gem: gem_sample (0.1.0)
```

* Gemの名前が重複するとデプロイできないので注意

* Gem名のハイフンは名前空間になるので注意
ハイフンとアンダースコアの使い分け
http://ackintosh.github.io/blog/2013/08/11/hypen-under-score/

## 参考

bundle gemのオプション
http://docs.komagata.org/5275

Removing a published RubyGem
http://help.rubygems.org/kb/gemcutter/removing-a-published-rubygem
