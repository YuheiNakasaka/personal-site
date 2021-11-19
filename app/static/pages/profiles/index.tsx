import { BlitzPage, Head } from "blitz"
import { Flex, Link, Box, UnorderedList, ListItem, IconButton, Text } from "@chakra-ui/react"
import { ExternalLinkIcon, ChevronLeftIcon } from "@chakra-ui/icons"
import Layout from "app/core/layouts/Layout"

const ProfilesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>razokulover</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@razokulover" />
        <meta property="og:url" content={`${process.env.BASE_URL}/profiles`} />
        <meta property="og:title" content="razokulover" />
        <meta property="og:image" content={`${process.env.BASE_URL}/razokulover-icon.png`} />
      </Head>
      <Flex bg="white" w="100vw">
        <Flex as="header" position="fixed" top={0} width="full" py={4} px={8}>
          <Box>
            <Link href="/">
              <IconButton
                aria-label="back"
                color="black"
                rounded="full"
                icon={<ChevronLeftIcon />}
              />
            </Link>
          </Box>
        </Flex>
        <Box
          mx="auto"
          pt={"6rem"}
          pb={"2.5rem"}
          pl={{
            base: "2rem",
            sm: "2rem",
            md: "2rem",
            lg: "0rem",
          }}
        >
          <Box
            w={{
              base: "100%",
              sm: "100%",
              md: "50rem",
              lg: "50rem",
            }}
          >
            <Box>
              <Text fontSize="2xl" fontWeight="bold">
                名前
              </Text>
              <Text fontSize="xl">Yuhei Nakasaka</Text>
            </Box>
            <Box mt={"2.5rem"}>
              <Text fontSize="2xl" fontWeight="bold">
                住居
              </Text>
              <Text fontSize="xl">東京都</Text>
            </Box>
            <Box mt={"2.5rem"}>
              <Text fontSize="2xl" fontWeight="bold">
                趣味
              </Text>
              <UnorderedList>
                <ListItem fontSize="xl">ウェブ・モバイルで何か作る</ListItem>
                <ListItem fontSize="xl">活字を読む</ListItem>
                <ListItem fontSize="xl">ラジオ</ListItem>
                <ListItem fontSize="xl">ハロプロ</ListItem>
              </UnorderedList>
            </Box>
            <Box mt={"2.5rem"}>
              <Text fontSize="2xl" fontWeight="bold">
                職業
              </Text>
              <Text fontSize="xl">Software Developer</Text>
            </Box>
            <Box mt={"2.5rem"}>
              <Text fontSize="2xl" fontWeight="bold">
                職務経歴書
              </Text>
              <Link
                href="https://findy-code.io/share_profiles/wSLmwWasT0_mq"
                fontSize="xl"
                isExternal
              >
                PDF <ExternalLinkIcon mx={"0.1rem"} />
              </Link>
            </Box>
            <Box mt={"2.5rem"}>
              <Text fontSize="2xl" fontWeight="bold">
                過去の創作物
              </Text>
              <UnorderedList>
                <ListItem fontSize="xl">
                  <Link href="https://gifmagazine.net/" isExternal>
                    GIFMAGAZINE
                  </Link>
                  <Text fontSize="sm">
                    メディア掲載:
                    <Link
                      href="https://jp.techcrunch.com/2019/01/30/gifmagazine-fundraising/"
                      isExternal
                    >
                      TechCrunch
                    </Link>
                  </Text>
                </ListItem>
                <ListItem fontSize="xl">
                  <Link href="https://gifmagazine.net/converters/teigashitsu" isExternal>
                    低画質画像メーカー
                  </Link>
                  <Text fontSize="sm">
                    メディア掲載:{" "}
                    <Link
                      href="https://gigazine.net/news/20170311-teigashitsu-gazou-maker/"
                      isExternal
                    >
                      GIGAZINE
                    </Link>
                  </Text>
                </ListItem>
                <ListItem fontSize="xl">
                  <Text fontSize="sm">
                    メディア掲載:{" "}
                    <Link
                      href="https://nlab.itmedia.co.jp/nl/articles/1909/06/news118.html"
                      isExternal
                    >
                      ねとらぼ
                    </Link>
                  </Text>
                </ListItem>
                <ListItem fontSize="xl">
                  <Link href="https://yuheinakasaka.github.io/marriage-ability-calc/" isExternal>
                    結婚偏差値診断
                  </Link>
                  <Text fontSize="sm">
                    Twitterトレンド１位獲得:{" "}
                    <Link
                      href="https://twitter.com/hashtag/%E7%B5%90%E5%A9%9A%E5%81%8F%E5%B7%AE%E5%80%A4%E8%A8%BA%E6%96%AD?src=hash"
                      isExternal
                    >
                      みんなの反応
                    </Link>
                  </Text>
                </ListItem>
                <ListItem fontSize="xl">
                  <Link href="https://yuheinakasaka.github.io/hello-project-one/" isExternal>
                    ハロプロワン
                  </Link>
                  <Text fontSize="sm">
                    ハロプロの全メンバーのやっているブログやSNSをまとめたサイト
                  </Text>
                </ListItem>
                <ListItem fontSize="xl">
                  <Link href="https://yuheinakasaka.github.io/yukanya-front/" isExternal>
                    Juice=Juice顔診断
                  </Link>
                  <Text fontSize="sm">
                    DeepLearningを使ってJuice=Juiceの誰に似ているかを診断できるサイト
                  </Text>
                </ListItem>
                <ListItem fontSize="xl">
                  <Link href="https://razokulover.hateblo.jp/entry/2017/08/21/130000" isExternal>
                    RNHBFav
                  </Link>
                  <Text fontSize="sm">
                    はてなブックマークのお気に入りフィードを使いやすくしたアプリ
                  </Text>
                </ListItem>
                <ListItem fontSize="xl">
                  <Link href="https://wonderful-kepler-5018a5.netlify.com/#/" isExternal>
                    ポジティブおみくじ
                  </Link>
                  <Text fontSize="sm">大吉しか出ないおみくじ</Text>
                </ListItem>
                <ListItem fontSize="xl">
                  <Link href="https://razokulover.hateblo.jp/entry/2018/05/14/170206" isExternal>
                    mspeakerdeck
                  </Link>
                  <Text fontSize="sm">
                    昔モバイルでみづらかったspeakerdeckをみやすくするためのサービス
                  </Text>
                </ListItem>
                <ListItem fontSize="xl">
                  <Link href="https://github.com/YuheiNakasaka/radiorec" isExternal>
                    radiorec
                  </Link>
                  <Text fontSize="sm">ラジオ録音サーバー。A&Gとradikoだけ対応している。</Text>
                </ListItem>
                <ListItem fontSize="xl">
                  <Link href="https://github.com/YuheiNakasaka/sayhuuzoku" isExternal>
                    sayhuuzoku
                  </Link>
                  <Text fontSize="sm">風俗店っぽい名前を生成するライブラリ</Text>
                </ListItem>
                <ListItem fontSize="xl">
                  <Link href="https://github.com/YuheiNakasaka/vue-twitter-client" isExternal>
                    vue-twitter-client
                  </Link>
                  <Text fontSize="sm">Vue+Electronで作ったTwitterクライアントサンプル</Text>
                </ListItem>
                <ListItem fontSize="xl">
                  <Link href="https://github.com/YuheiNakasaka/franz-scrapbox" isExternal>
                    franz-scrapbox
                  </Link>
                  <Text fontSize="sm">FranzのScrapbox用のプラグイン</Text>
                </ListItem>
                <ListItem fontSize="xl">
                  <Link href="https://github.com/YuheiNakasaka/flutter_live_photos" isExternal>
                    flutter_live_photos
                  </Link>
                  <Text fontSize="sm">
                    mp4からLivePhotosを作成するFlutter用のライブラリ。iOS限定。
                  </Text>
                </ListItem>
                <ListItem fontSize="xl">
                  <Link href="https://github.com/YuheiNakasaka/flutter_ig_story" isExternal>
                    ig_story
                  </Link>
                  <Text fontSize="sm">ストーリーのUIを実現するFlutter用のライブラリ</Text>
                </ListItem>
                <ListItem fontSize="xl">
                  <Link href="https://github.com/YuheiNakasaka/ag_viewer" isExternal>
                    AgViewer
                  </Link>
                  <Text fontSize="sm">A&Gの視聴アプリ</Text>
                </ListItem>
                <ListItem fontSize="xl">
                  <Link href="https://razokulover.com/migawari/about/" isExternal>
                    Migawari ~しつこいセールスや勧誘を男の声で撃退~
                  </Link>
                  <Text fontSize="sm">
                    Migawariはしつこい訪問販売や勧誘に困っている一人暮らしの方向けに男性のボイスを提供するアプリです。
                  </Text>
                </ListItem>
                <ListItem fontSize="xl">
                  <Link href="https://razokulover.com/fleet_art_editor/about/" isExternal>
                    Fleet Art Editor
                  </Link>
                  <Text fontSize="sm">
                    Fleet Art Editor is an application for creating FleetArt using emojis and texts.
                  </Text>
                </ListItem>
                <ListItem fontSize="xl">
                  <Link href="https://razokulover.com/playgrounds/asset_search" isExternal>
                    Crypto Asset Search
                  </Link>
                  <Text fontSize="sm">
                    Crypto Asset Search allows you to search for crypto assets and get detailed
                    information about them.
                  </Text>
                </ListItem>
              </UnorderedList>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

ProfilesPage.authenticate = false
ProfilesPage.getLayout = (page) => <Layout>{page}</Layout>

export default ProfilesPage
