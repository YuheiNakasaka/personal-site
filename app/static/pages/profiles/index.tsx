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
                Name
              </Text>
              <Text fontSize="xl">Yuhei Nakasaka</Text>
            </Box>
            <Box mt={"2.5rem"}>
              <Text fontSize="2xl" fontWeight="bold">
                Location
              </Text>
              <Text fontSize="xl">Tokyo</Text>
            </Box>
            <Box mt={"2.5rem"}>
              <Text fontSize="2xl" fontWeight="bold">
                Hobby
              </Text>
              <UnorderedList>
                <ListItem fontSize="xl">Development of web/mobile apps</ListItem>
                <ListItem fontSize="xl">H!P</ListItem>
              </UnorderedList>
            </Box>
            <Box mt={"2.5rem"}>
              <Text fontSize="2xl" fontWeight="bold">
                Job
              </Text>
              <Text fontSize="xl">Software Developer</Text>
            </Box>
            <Box mt={"2.5rem"}>
              <Text fontSize="2xl" fontWeight="bold">
                RESUME(Japanese)
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
                WORKS
              </Text>
              <UnorderedList>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://gifmagazine.net/" isExternal>
                    GIFMAGAZINE
                  </Link>
                  <Text fontSize="sm">
                    Article:
                    <Link
                      href="https://jp.techcrunch.com/2019/01/30/gifmagazine-fundraising/"
                      isExternal
                    >
                      TechCrunch
                    </Link>
                  </Text>
                </ListItem>
                <ListItem fontSize="lg">
                  <Link href="https://gifmagazine.net/converters/teigashitsu" isExternal>
                    低画質画像メーカー
                  </Link>
                  <Text fontSize="sm">
                    Article:{" "}
                    <Link
                      href="https://gigazine.net/news/20170311-teigashitsu-gazou-maker/"
                      isExternal
                    >
                      GIGAZINE
                    </Link>
                  </Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Text fontSize="sm">
                    Article:{" "}
                    <Link
                      href="https://nlab.itmedia.co.jp/nl/articles/1909/06/news118.html"
                      isExternal
                    >
                      ねとらぼ
                    </Link>
                  </Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://yuheinakasaka.github.io/marriage-ability-calc/" isExternal>
                    結婚偏差値診断
                  </Link>
                  <Text fontSize="sm">
                    Twitter Trend No.1:{" "}
                    <Link
                      href="https://twitter.com/hashtag/%E7%B5%90%E5%A9%9A%E5%81%8F%E5%B7%AE%E5%80%A4%E8%A8%BA%E6%96%AD?src=hash"
                      isExternal
                    >
                      みんなの反応
                    </Link>
                  </Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://yuheinakasaka.github.io/hello-project-one/" isExternal>
                    ハロプロワン
                  </Link>
                  <Text fontSize="sm">Culation site of H!P members blogs</Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://yuheinakasaka.github.io/yukanya-front/" isExternal>
                    Juice=Juice顔診断
                  </Link>
                  <Text fontSize="sm">
                    Site of comparing your face and Juice=Juice members face with Deep Learning
                  </Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://razokulover.hateblo.jp/entry/2017/08/21/130000" isExternal>
                    RNHBFav
                  </Link>
                  <Text fontSize="sm">Mobile App for Hatena Bookmark with React Native</Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://wonderful-kepler-5018a5.netlify.com/#/" isExternal>
                    ポジティブおみくじ
                  </Link>
                  <Text fontSize="sm">Japanese Positive lot</Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://razokulover.hateblo.jp/entry/2018/05/14/170206" isExternal>
                    mspeakerdeck
                  </Link>
                  <Text fontSize="sm">speakerdeck viewer for Mobile</Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://github.com/YuheiNakasaka/radiorec" isExternal>
                    radiorec
                  </Link>
                  <Text fontSize="sm">Radio Server for A&G and Radiko</Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://github.com/YuheiNakasaka/sayhuuzoku" isExternal>
                    sayhuuzoku
                  </Link>
                  <Text fontSize="sm">porn shop name generator</Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://github.com/YuheiNakasaka/vue-twitter-client" isExternal>
                    vue-twitter-client
                  </Link>
                  <Text fontSize="sm">Twitter Client with Vue + Electron</Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://github.com/YuheiNakasaka/franz-scrapbox" isExternal>
                    franz-scrapbox
                  </Link>
                  <Text fontSize="sm">Franz plugin for Scrapbox</Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://github.com/YuheiNakasaka/flutter_live_photos" isExternal>
                    flutter_live_photos
                  </Link>
                  <Text fontSize="sm">Flutter library for converting MP4 to LivePhotos</Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://github.com/YuheiNakasaka/flutter_ig_story" isExternal>
                    ig_story
                  </Link>
                  <Text fontSize="sm">Flutter library for creating UI of Stories</Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://github.com/YuheiNakasaka/ag_viewer" isExternal>
                    AgViewer
                  </Link>
                  <Text fontSize="sm">Viewer app for A&G</Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://razokulover.com/migawari/about/" isExternal>
                    Migawari ~しつこいセールスや勧誘を男の声で撃退~
                  </Link>
                  <Text fontSize="sm">
                    Migawari is an application that provides male voices for those living alone who
                    are troubled by persistent door-to-door salespeople and solicitors.
                  </Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://razokulover.com/fleet_art_editor/about/" isExternal>
                    Fleet Art Editor
                  </Link>
                  <Text fontSize="sm">
                    Fleet Art Editor is an application for creating FleetArt using emojis and texts.
                  </Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://razokulover.com/playgrounds/asset_search" isExternal>
                    Crypto Asset Search
                  </Link>
                  <Text fontSize="sm">
                    Crypto Asset Search allows you to search for crypto assets and get detailed
                    information about them.
                  </Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://twitter-eth.vercel.app/" isExternal>
                    Twitter ETH
                  </Link>
                  <Text fontSize="sm">
                    The implementation of dApp like Twitter for Ethereum(ropsten)
                  </Text>
                </ListItem>
                <ListItem fontSize="lg" mb={4}>
                  <Link href="https://bnftly.com/" isExternal>
                    BNFTLY
                  </Link>
                  <Text fontSize="sm">Create a link that NFT owners can only access easily</Text>
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
