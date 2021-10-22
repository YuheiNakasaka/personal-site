# Personal Site

## Usage

### Setup

#### .env.local

```
DATABASE_URL=mysql://roor:root@local-mysql:3306/personal-site-db
```

#### DB

```
yarn predev # Create DB with Docker
blitz prisma migrate dev # Migrate DB
blitz prisma generate # Create prisma client
```

#### Run

```
yarn dev
```

### Build a image for production

If it needs to use docker image for Cloud Run, run below.

```
docker build . -t personal-site-app
docker run --env-file=.env.local -p 3000:3000 personal-site-app
```

## TODO

- [x] TOP ページ(静的ページ)
- [x] 記事ページ(静的ページ)
  - [x] 記事一覧
  - [x] 記事詳細
- [x] 記事管理ページ(動的ページ)
  - [x] 作成
  - [x] 更新
  - [x] 削除
- [x] プロフィールページ(静的ページ)
