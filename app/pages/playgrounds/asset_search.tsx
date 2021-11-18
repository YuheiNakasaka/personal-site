import { Head, BlitzPage } from "blitz"
import { Flex, Box, Text, Image, Button, Link } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import Layout from "app/core/layouts/Layout"
import AssetSearchForm from "app/playgrounds/components/AssetSearchForm"
import {
  AssetSearchContextProvider,
  AssetSearchContextType,
  AssetSearchContext,
} from "app/playgrounds/context/AssetSearchContext"
import { useContext, useState } from "react"
import { useGetNFTs } from "app/playgrounds/hooks/useGetNFTs"
import { useGetBalance } from "app/playgrounds/hooks/useGetBalance"
import { NFTMetaData } from "app/playgrounds/models/nft"
import { useResolveENS } from "app/playgrounds/hooks/useResolveENS"

const AddressArea = () => {
  const context: AssetSearchContextType = useContext(AssetSearchContext)
  return (
    <>
      <Box textAlign="center">
        <Text fontSize="xl" fontWeight="bold">
          Address
        </Text>
        {context.text !== "" ? (
          <Link
            display="inline-block"
            w="300px"
            color="blue.500"
            fontSize="lg"
            fontWeight="500"
            href={
              context.chain === "polygon"
                ? `https://polygonscan.com/address/${context.address}`
                : `https://etherscan.io/address/${context.address}`
            }
            target="_blank"
          >
            {context.text} <ExternalLinkIcon fontSize="sm" />
          </Link>
        ) : (
          <Text>Empty</Text>
        )}
      </Box>
    </>
  )
}

const BalanceArea = () => {
  const context: AssetSearchContextType = useContext(AssetSearchContext)
  return (
    <>
      <Box textAlign="center">
        <Text fontSize="xl" fontWeight="bold">
          Balance
        </Text>
        <Text fontSize="lg" fontWeight="500">
          {context.balance} {context.chain === "polygon" ? "MATIC" : "Ether"}
        </Text>
      </Box>
    </>
  )
}

const NoNFTItems = () => {
  return (
    <>
      <Box textAlign="center">
        <Text>No Items</Text>
      </Box>
    </>
  )
}

const NFTItems = () => {
  const limit = 10
  const context: AssetSearchContextType = useContext(AssetSearchContext)
  const [itemOffset, setItemOffset] = useState(0)
  return (
    <>
      <Box id="nft-items" width="93%" margin="1rem auto 50px auto">
        {context.nftItems.slice(itemOffset, itemOffset + limit).map((item) => {
          const metadata = item.metadata as NFTMetaData
          return (
            <Box key={item.token_id} marginBottom="1em" style={{ display: "inline-block" }}>
              <Link
                color="blue.500"
                href={
                  context.chain === "polygon"
                    ? `https://polygonscan.com/token/${item.token_address}?a=${item.token_id}`
                    : `https://etherscan.io/token/${item.token_address}?a=${item.token_id}`
                }
                target="_blank"
              >
                <Image alt={metadata.name} src={metadata.image} w="100%" maxW="334px" />
              </Link>
              <Text fontSize="1em">{metadata.name}</Text>
              <Text fontSize="0.5em">{metadata.description}</Text>
            </Box>
          )
        })}
        <style>{`
          #nft-items {
            column-width: 320px;
            column-gap: 15px;
          }
        `}</style>
      </Box>

      <Flex justifyContent="center">
        {itemOffset - limit >= 0 && (
          <Button
            mr={3}
            onClick={() => {
              setItemOffset(itemOffset - limit)
            }}
          >
            Prev
          </Button>
        )}
        {itemOffset + limit < context.nftItems.length && (
          <Button
            onClick={() => {
              setItemOffset(itemOffset + limit)
            }}
          >
            Next
          </Button>
        )}
      </Flex>
    </>
  )
}

const AssetSearchMain = () => {
  const context: AssetSearchContextType = useContext(AssetSearchContext)
  const searchNft = useGetNFTs()
  const resolveENS = useResolveENS()
  const getBalance = useGetBalance()

  return (
    <>
      <Head>
        <title>Crypto Asset Search</title>
      </Head>
      <Flex bg="white" w="100vw">
        <Box mx="auto" pt={"1rem"} pb={"2.5rem"}>
          <Flex as="header" width="full" py={4} px={8}>
            <AssetSearchForm
              initialValues={{ text: "" }}
              onSubmit={async (_) => {
                context.setLoading(true)

                const { address } = await resolveENS(context.text)
                console.log(address)

                context.setAddress(address)

                const account = await getBalance(address, context.chain)
                context.setBalance(account.balance)

                const nfts = await searchNft(address, context.chain)
                context.setTotalNFT(nfts.total)
                context.setNFTItems(nfts.result.slice())

                context.setLoading(false)
              }}
            ></AssetSearchForm>
          </Flex>
          <Box
            w={{
              base: "100%",
              sm: "100%",
              md: "50rem",
              lg: "50rem",
            }}
            py={4}
          >
            <AddressArea />
          </Box>
          <Box
            w={{
              base: "100%",
              sm: "100%",
              md: "50rem",
              lg: "50rem",
            }}
            py={4}
            px={8}
          >
            <BalanceArea />
          </Box>
          <Box
            w={{
              base: "100%",
              sm: "100%",
              md: "50rem",
              lg: "50rem",
            }}
            py={4}
            px={8}
          >
            <Text textAlign="center" fontSize="xl" fontWeight="bold">
              NFTs({context.totalNFT})
            </Text>
            {context.nftItems.length > 0 ? <NFTItems /> : <NoNFTItems />}
          </Box>
        </Box>
      </Flex>
    </>
  )
}

const AssetSearchPage: BlitzPage = () => {
  return (
    <AssetSearchContextProvider>
      <AssetSearchMain></AssetSearchMain>
    </AssetSearchContextProvider>
  )
}

AssetSearchPage.authenticate = false
AssetSearchPage.getLayout = (page) => <Layout>{page}</Layout>

export default AssetSearchPage
