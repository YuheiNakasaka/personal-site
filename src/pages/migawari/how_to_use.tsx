import Head from "next/head";
import { NextPage } from "next";
import { Box, Flex, Text } from "@chakra-ui/react";

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
      <Flex>
        <Box p={"10px"} maxW={"600px"}>
          <Text fontSize={"1.5rem"} fontWeight={"bold"}>
            使い方・よくある質問
          </Text>

          <Box mt={"2rem"}>
            <Text fontSize={"1.2rem"} fontWeight={"bold"}>
              # ボイスを再生するには？
            </Text>
            <p>
              使いたいボイスをクリックするだけです。ボイスが再生し終わるまで別のボイスは再生できないので気をつけてください。
            </p>
          </Box>

          <Box mt={"2rem"}>
            <Text fontSize={"1.2rem"} fontWeight={"bold"}>
              # お気に入りとは？
            </Text>
            <p>よく使うボイスを「お気に入り」ページに保存する機能です。</p>
            <p>
              ホームには沢山ボイスがあるのでよく利用するボイスはお気に入りに追加しておくと便利です。
            </p>
          </Box>

          <Box mt={"2rem"}>
            <Text fontSize={"1.2rem"} fontWeight={"bold"}>
              # お気に入りボイスを並べ替えたい
            </Text>
            <p>
              お気に入りに入れたボイスの右端のハシゴアイコンを長押しすると上下好きな場所に移動できます。
            </p>
            <Flex
              w={"100%"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              m={"1rem 0 4rem"}
            >
              <video width="50%" controls>
                <source
                  src="../../how_to_sort_favorite_voice_res.mp4"
                  type="video/mp4"
                />
              </video>
            </Flex>
          </Box>

          <Box mt={"2rem"}>
            <Text fontSize={"1.2rem"} fontWeight={"bold"}>
              # ほしいボイスや機能が無い
            </Text>
            <p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfpzn42RJALUdumkXfz-WfBiPS1cLQHsEnT9eoULMU99QEZfg/viewform?usp=sf_link"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#3182ce" }}
              >
                リクエストフォーム
              </a>
              からリクエストしてください。
            </p>
          </Box>

          <Box mt={"2rem"}>
            <Text fontSize={"1.2rem"} fontWeight={"bold"}>
              # ネットがなくても使える？
            </Text>
            <p>はい。インターネット接続なしでボイスを再生できます。</p>
          </Box>

          <Box mt={"2rem"}>
            <Text fontSize={"1.2rem"} fontWeight={"bold"}>
              # 広告を入れる予定はある？
            </Text>
            <p>
              いいえ。広告を入れるといざ使いたいと思った時にスムーズに使えなくて不便だと思うので入れる予定はありません。
            </p>
          </Box>

          <Box mt={"2rem"}>
            <Text fontSize={"1.2rem"} fontWeight={"bold"}>
              # 友人に紹介したい
            </Text>
            <p>
              アプリのホームの右上の[歯車アイコン]をクリックして表示される[応援する
              📣]という文字を押していただくとアプリのレビューやシェア用のボタンが表示されます。
            </p>
            <p>
              また、
              <a
                href="/migawari/about"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#3182ce" }}
              >
                こちらのアプリ紹介ページ
              </a>
              のURLをシェアしていただくのも良いかもしれないです。
            </p>
          </Box>

          <Box mt={"2rem"}>
            <Text fontSize={"1.2rem"} fontWeight={"bold"}>
              # 利用規約/プライバシーポリシーはどこにありますか？
            </Text>
            <p>
              <a
                href="/migawari/migawari_privacy_policy"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#3182ce" }}
              >
                こちら
              </a>
              です。
            </p>
          </Box>

          <Box mt={"2rem"}>
            <Text fontSize={"1.2rem"} fontWeight={"bold"}>
              # 誰が作っているの？
            </Text>
            <p>
              <a
                href="https://twitter.com/razokulover"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#3182ce" }}
              >
                @Yuhei Nakasaka
              </a>
              が細々と作っています。
            </p>
            <p>
              元々は一人暮らしで困っていた友人向けに作っただけのアプリです。使いにくい点も多々あるかと思いますが広告無しでボランティアとして作っているので温かい目で見ていただけると幸いです。
            </p>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default MigawariHowToUsePage;
