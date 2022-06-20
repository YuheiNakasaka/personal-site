import { Head, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Flex, Box, FormControl, Select, Button, Text, Spacer, Link } from "@chakra-ui/react"
import { useEffect } from "react"
import init, { ToMd } from "../../resources/wasm/sb2md_converter_bg"

const Sb2Md: BlitzPage = () => {
  useEffect(() => {
    init().then(async () => {
      const text =
        "- this is a [* test]. In details, [https://example.com/ link] should be shown. [https://scrapbox.io/files/test.png]"
      const tomd = await ToMd.new(text)
      const res = await tomd.convert()
      console.log(`result: ${res}`)
    })
  })

  return (
    <>
      <Head>
        <title>Scrapbox to Markdown</title>
        <meta name="twitter:card" content="summary" />
        <meta property="og:url" content="https://razokulover.com/playgrounds/sb2md" />
        <meta property="og:title" content="Scrapbox to Markdown" />
        <meta property="og:description" content="Convert Scrapbox Page to Markdown" />
        <meta property="og:image" content={`${process.env.BASE_URL}/razokulover-icon.png`} />
      </Head>
      <Flex alignItems="center" justifyContent="center" w="100vw" minH="100vh">
        <Box textAlign="center"></Box>
      </Flex>
    </>
  )
}

Sb2Md.authenticate = false
Sb2Md.getLayout = (page) => <Layout>{page}</Layout>

export default Sb2Md
