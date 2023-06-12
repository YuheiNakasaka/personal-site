import Head from "next/head";
import { Avatar, Image } from "@chakra-ui/react";
import { NextPage } from "next";

const MigawariHowToUsePage: NextPage = () => {
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
          <h1>使い方・よくある質問</h1>

          <section className="how-to-section">
            <h2># ボイスを再生するには？</h2>
            <p>
              使いたいボイスをクリックするだけです。ボイスが再生し終わるまで別のボイスは再生できないので気をつけてください。
            </p>
          </section>

          <section className="how-to-section">
            <h2># お気に入りとは？</h2>
            <p>よく使うボイスを「お気に入り」ページに保存する機能です。</p>
            <p>
              ホームには沢山ボイスがあるのでよく利用するボイスはお気に入りに追加しておくと便利です。
            </p>
          </section>

          <section className="how-to-section">
            <h2># お気に入りボイスを並べ替えたい</h2>
            <p>
              お気に入りに入れたボイスの右端のハシゴアイコンを長押しすると上下好きな場所に移動できます。
            </p>
            <div className="video-section">
              <video width="50%" controls>
                <source
                  src="../../how_to_sort_favorite_voice_res.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </section>

          <section className="how-to-section">
            <h2># ほしいボイスや機能が無い</h2>
            <p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfpzn42RJALUdumkXfz-WfBiPS1cLQHsEnT9eoULMU99QEZfg/viewform?usp=sf_link"
                target="_blank"
                rel="noreferrer"
              >
                リクエストフォーム
              </a>
              からリクエストしてください。
            </p>
          </section>

          <section className="how-to-section">
            <h2># ネットがなくても使える？</h2>
            <p>はい。インターネット接続なしでボイスを再生できます。</p>
          </section>

          <section className="how-to-section">
            <h2># 広告を入れる予定はある？</h2>
            <p>
              いいえ。広告を入れるといざ使いたいと思った時にスムーズに使えなくて不便だと思うので入れる予定はありません。
            </p>
          </section>

          <section className="how-to-section">
            <h2># 友人に紹介したい</h2>
            <p>
              アプリのホームの右上の[歯車アイコン]をクリックして表示される[応援する
              📣]という文字を押していただくとアプリのレビューやシェア用のボタンが表示されます。
            </p>
            <p>
              また、
              <a href="/migawari/about" target="_blank" rel="noreferrer">
                こちらのアプリ紹介ページ
              </a>
              のURLをシェアしていただくのも良いかもしれないです。
            </p>
          </section>

          <section className="how-to-section">
            <h2># 利用規約/プライバシーポリシーはどこにありますか？</h2>
            <p>
              <a
                href="/migawari/migawari_privacy_policy"
                target="_blank"
                rel="noreferrer"
              >
                こちら
              </a>
              です。
            </p>
          </section>

          <section className="how-to-section">
            <h2># 誰が作っているの？</h2>
            <p>
              <a
                href="https://twitter.com/razokulover"
                target="_blank"
                rel="noreferrer"
              >
                @Yuhei Nakasaka
              </a>
              が細々と作っています。
            </p>
            <p>
              元々は一人暮らしで困っていた友人向けに作っただけのアプリです。使いにくい点も多々あるかと思いますが広告無しでボランティアとして作っているので温かい目で見ていただけると幸いです。
            </p>
          </section>
        </div>
      </section>
      <style global jsx>{`
        h1,
        h2,
        p {
          font-weight: bold;
        }
        h1 {
          font-size: 1.5rem;
          padding: 1rem 0 0 0;
        }
        h2 {
          font-size: 1.2rem;
          padding: 1rem 0 0 0;
        }
        p {
          font-weight: normal;
          padding: 8px 0 0 0;
        }
        a {
          color: #3182ce;
        }
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .section {
          max-width: 600px;
          padding: 10px;
        }
        .how-to-section {
          margin-top: 2rem;
        }
        .video-section {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 1rem 0 4rem;
        }
        video {
          margin-top: 1rem;
        }
      `}</style>
    </>
  );
};

export default MigawariHowToUsePage;
