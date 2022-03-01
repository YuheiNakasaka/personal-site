import { Box, Button, Flex, Input, Text } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Head } from "blitz"
import { providers } from "ethers"
import { useState } from "react"

const MainContent = () => {
  const [message, setMessage] = useState("")
  const [contractAddress, setContractAddress] = useState("")
  const [tokenId, setTokenId] = useState("")
  const onClick = async () => {
    const provider = new providers.Web3Provider((window as any).ethereum)
    const signer = provider.getSigner()
    const myAddress = await signer.getAddress()
    await fetch(
      `/api/playgrounds/is_owner_of_nft?myAddress=${myAddress}&contractAddress=${contractAddress}&tokenId=${tokenId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res && res.result) {
          if (tokenId !== "") {
            setMessage("あなたはこのNFTを所有しています")
          } else {
            setMessage("あなたはこのコントラクトのNFTを1つ以上所有しています")
          }
        } else {
          if (tokenId !== "") {
            setMessage("あなたはこのNFTを所有していません")
          } else {
            setMessage("あなたはこのコントラクトのNFTを１つも所有していません")
          }
        }
      })
  }
  return (
    <Flex
      flexDir={"column"}
      w={"70vw"}
      minH={"100vh"}
      m={"0 auto"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text fontSize={"xl"} fontWeight={"600"} mb={4}>
        NFTの保有状況を調べるデモ
      </Text>
      <Text fontSize={"md"} mb={8}>
        ERC721とERC1155の保有状況を調べるためのデモです。 <br />
        ERC721の場合は「指定したcontract addressのNFTを保有しているか」と「指定したcontract
        addressのtokenIdのNFTを保有しているか」を調べることができます。
        <br />
        ERC1155の場合は「指定したcontract
        addressのtokenIdのNFTを保有しているか」を調べることができます。
      </Text>
      <Flex>
        <Box>
          <Text fontSize={12} fontWeight={"bold"} mb={2}>
            Contract Address
          </Text>
          <Input
            w={"55vw"}
            mr={4}
            type={"text"}
            placeholder={"ex: 0x00000000000000000000000000000000000000000"}
            onChange={(e) => {
              setContractAddress(e.target.value)
            }}
          />
        </Box>
        <Box>
          <Text fontSize={12} fontWeight={"bold"} mb={2}>
            Token ID
          </Text>
          <Input
            w={"10vw"}
            type={"text"}
            placeholder={"ex: 1"}
            onChange={(e) => {
              setTokenId(e.target.value)
            }}
          />
        </Box>
      </Flex>
      <Flex justifyContent={"center"} mt={4}>
        <Button onClick={onClick}>check</Button>
      </Flex>
      {message != "" && (
        <Box mt={8}>
          <Text color={"#00cc00"}>{message}</Text>
        </Box>
      )}
    </Flex>
  )
}

const NftOwnerCheckerPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>NftOwnerChecker</title>
      </Head>
      <MainContent />
    </>
  )
}

NftOwnerCheckerPage.authenticate = false
NftOwnerCheckerPage.getLayout = (page) => <Layout>{page}</Layout>

export default NftOwnerCheckerPage
