# hestia

レシピのランダム選出 Web アプリ

# 使用技術

- Docker
- nodejs 19
- express 4.18.2
- MongoDB

# 機能

- レシピ CRUD
- ランダム選出
- ランダム選出(タグ指定)

#　前提

- Docker と docker-compose のインストール
- MongoDB の登録と DB,ユーザ の作成

# 起動

```
$ git clone git@github.com:hito-kotaro/hestia.git
$ echo "PORT=<PORT>\nDB_USER=<MongoDM_USER>\nDB_PASS=<MongoDB_PASSWORD>\nDB_NAME=<MongoDB_COLLECTION>" > .env
$ cd hestia
$ make up
```
