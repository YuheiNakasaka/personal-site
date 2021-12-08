import { Head, BlitzPage, Link } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Flex, Box, Heading, Text, Link as ExternalLink } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { ChangeEvent, useState } from "react"
import { CursorPointer } from "app/core/components/CursorPointer"

interface ListBoxProps {
  url: string
  title: string
  description: string
  external?: boolean
}

const ListBox = ({ url, title, description, external }: ListBoxProps) => {
  return (
    <Box mb="1rem">
      {!external ? (
        <Link href={url}>
          <CursorPointer>
            <Text fontSize="1.2rem" fontWeight="bold">
              {title}
            </Text>
          </CursorPointer>
        </Link>
      ) : (
        <ExternalLink href={url} isExternal>
          <CursorPointer>
            <Text fontSize="1.2rem" fontWeight="bold">
              {title} <ExternalLinkIcon mx="2px" />
            </Text>
          </CursorPointer>
        </ExternalLink>
      )}
      <Text>{description}</Text>
    </Box>
  )
}

const PlaygroundsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Playgrounds</title>
        <meta name="twitter:card" content="summary" />
        <meta property="og:url" content={`${process.env.BASE_URL}/playgrounds`} />
        <meta property="og:title" content="Playgrounds" />
        <meta property="og:image" content={`${process.env.BASE_URL}/razokulover-icon.png`} />
      </Head>
      <Flex flexDir="column" alignItems="center" justifyContent="center" w="100vw" minH="100vh">
        <Heading mb="2rem">Playgrounds</Heading>
        <Box>
          <ListBox
            title="Crypto Asset Search"
            description="Crypto Asset Search allows you to search balances and nfts."
            url="/playgrounds/asset_search"
          />
          <ListBox
            title="ハロメン名前シャッフル"
            description="ハロメンの名前をシャッフルできます。"
            url="https://haropuro-shuffle.pages.dev/"
            external={true}
          />
          <ListBox
            title="NFT Login"
            description="If you have a specific NFT, you can access a page. (localhost only)"
            url="/playgrounds/nft_login"
          />
          <ListBox
            title="Twitter ETH"
            description="The implementation of dApp like Twitter for Ethereum(ropsten)"
            url="/playgrounds/twitter_eth"
          />
        </Box>
      </Flex>
    </>
  )
}

PlaygroundsPage.authenticate = false
PlaygroundsPage.getLayout = (page) => <Layout>{page}</Layout>

export default PlaygroundsPage
