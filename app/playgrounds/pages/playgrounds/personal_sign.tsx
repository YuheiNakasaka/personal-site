import { Head, BlitzPage, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import { utils, providers } from "ethers"
import { useEffect, useState } from "react"
import { Box, Button, Flex, Text } from "@chakra-ui/react"

const MainContent = () => {
  const router = useRouter()
  const [status, setStatus] = useState("")
  const [signerToken, setSignerToken] = useState("")
  useEffect(() => {
    if (window) {
      getSignerToken()
    }

    if (router.query.status) {
      setStatus(`${router.query.status}`)
    }
  }, [setStatus])

  const getSignerToken = async () => {
    const provider = new providers.Web3Provider((window as any).ethereum)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    await fetch(`/api/playgrounds/get_signer_token?address=${address}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          console.log(res)
          setSignerToken(res.token)
        }
      })
  }

  const runSignMessage = async () => {
    const provider = new providers.Web3Provider((window as any).ethereum)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    const bytes = utils.toUtf8Bytes(signerToken)
    const digest = utils.keccak256(bytes)
    const bin = utils.arrayify(digest)
    const signature = await signer.signMessage(bin)
    await fetch(`/api/playgrounds/verify_message?address=${address}&sig=${signature}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.url) {
          location.href = res.url
        }
      })
  }

  return (
    <Flex
      maxW={"50vw"}
      minH={"100vh"}
      flexDir={"column"}
      m={"0 auto"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box mb={8} textAlign={"center"}>
        <Text fontSize={"xl"} fontWeight={"600"} mb={4}>
          Walletの署名を使ってアドレスを認証するデモ
        </Text>
        <Text fontSize={"ld"} mb={4}>
          全体の流れ
        </Text>
        <Box textAlign={"left"}>
          <Text fontSize={"md"}>1. (フロント) サーバー側から適当なワンタイムトークンを取得。</Text>
          <Text fontSize={"md"}>
            2. (フロント) そのトークンにウォレットを用いて署名をしてもらう。
          </Text>
          <Text fontSize={"md"}>3. (フロント) 生成された署名とアドレスをサーバー側に送信。</Text>
          <Text fontSize={"md"}>
            4. (サーバー)
            送信されたアドレスと署名から、そのアドレスがウォレットを持つ本人のものかどうかを確認する。
          </Text>
        </Box>
      </Box>
      <Box mb={8}>
        <Button onClick={runSignMessage}>メッセージの署名</Button>
      </Box>
      <Box textAlign={"center"}>
        <Text mb={2} fontWeight={"bold"}>
          署名の検証結果
        </Text>
        {status === "success" ? (
          <Text color={"#0F0"}>検証成功です</Text>
        ) : status === "failure" ? (
          <Text color={"#F00"}>検証失敗です</Text>
        ) : (
          <Text>未検証です</Text>
        )}
      </Box>
    </Flex>
  )
}

const PersonalSignPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>PersonalSign</title>
      </Head>
      <MainContent />
    </>
  )
}

PersonalSignPage.authenticate = false
PersonalSignPage.getLayout = (page) => <Layout>{page}</Layout>

export default PersonalSignPage
