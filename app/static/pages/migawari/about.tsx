import { Head, BlitzPage } from "blitz"
import { Avatar, Image } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"

const MigawariAboutPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Migawari ~しつこいセールスや勧誘を男の声で撃退~</title>
        <meta
          name="description"
          content="Migawariはしつこい訪問販売や勧誘に困っている一人暮らしの方向けに男性のボイスを提供するアプリです。"
        />
      </Head>
      <section className="container">
        <div className="section">
          <div className="icon">
            <Avatar size="4xl" src={"../../migawari_app_icon.png"}></Avatar>
          </div>

          <h1>Migawari ~しつこいセールスや勧誘を男の声で撃退~</h1>

          <p>
            Migawariはしつこい訪問販売や勧誘に困っている一人暮らしの方向けに男性のボイスを提供するアプリです。
          </p>

          <p>
            「しつこいセールスを強く追い払えない」 「女性だとナメてかかってくる」
            「出前の配達員に女性の一人暮らしであることを悟られたく無い」 等の場合に使うと有効です。
            使い方は簡単。アプリを開きインターホンに近づけ、相手の返答に合ったボイスを選択し再生するだけです。
            ボイスのリクエストがある場合は[設定] &gt; [ボイスリクエスト]からご連絡ください。
          </p>

          <p>
            ■注意 ・このボイスを使っても勧誘を100%追い払える訳ではありません
            ・このアプリを使ってトラブルが発生しても一切責任は追えません
          </p>

          <div className="dl-icons">
            <div className="dl-icon">
              <a href="https://apps.apple.com/bg/app/id1546572807" target="_blank" rel="noreferrer">
                <Image
                  className="apple"
                  alt="apple btn"
                  size="4xl"
                  src={"../../apple_dl_icon.svg"}
                ></Image>
              </a>
            </div>
            <div className="dl-icon">
              <a
                href="https://play.google.com/store/apps/details?id=com.razokulover.sales_migawari&amp;hl=ja"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  className="android"
                  alt="android btn"
                  size="4xl"
                  src={"../../google-play-badge.png"}
                ></Image>
              </a>
            </div>
          </div>
        </div>
      </section>
      <style global jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .section {
          padding: 10px;
        }
        .section .icon {
          text-align: center;
        }
        .section .icon img {
          width: 200px;
          height: 200px;
          border-radius: 50%;
        }
        .section .dl-icons {
          display: flex;
          justify-content: center;
          margin-top: 40px;
        }
        .section .dl-icons .dl-icon {
          display: inline-block;
        }
        .section .dl-icons .dl-icon img {
          width: 100px;
        }
        .section .dl-icons .dl-icon img.apple {
          margin: 8px;
        }
        .section .dl-icons .dl-icon img.android {
          width: 140px;
        }
        h1,
        p {
          padding: 20px 0 0 0;
        }
      `}</style>
    </>
  )
}

MigawariAboutPage.authenticate = false
MigawariAboutPage.getLayout = (page) => <Layout>{page}</Layout>

export default MigawariAboutPage
