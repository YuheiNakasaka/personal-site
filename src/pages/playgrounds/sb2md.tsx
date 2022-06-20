import Head from "next/head";
import { Flex, Box, Text, Textarea, Link, Button } from "@chakra-ui/react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic.js";

const Converter = dynamic(
  {
    loader: async () => {
      const initWasm = await import("../../resources/wasm");
      const { ToMd } = initWasm;
      return () => {
        const [sbText, setSbText] = useState("");
        const [mdText, setMdText] = useState("");
        const onClick = useCallback(async () => {
          const tomd = await ToMd.new(sbText);
          const result = await tomd.convert();
          setMdText(result);
        }, [sbText]);

        useEffect(() => {
          initWasm.default();
        }, []);

        return (
          <>
            <Textarea
              w={{
                base: "95%",
                sm: "95%",
                md: "60vw",
                lg: "60vw",
              }}
              h={"35vh"}
              placeholder="Scrapboxのテキストを入力して下さい。"
              value={sbText}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setSbText(e.target.value)
              }
            />

            <Box my={4}>
              <Button onClick={onClick}>↓変換する↓</Button>
            </Box>

            <Textarea
              w={{
                base: "95%",
                sm: "95%",
                md: "60vw",
                lg: "60vw",
              }}
              h={"35vh"}
              placeholder="結果"
              value={mdText}
              readOnly
            />
          </>
        );
      };
    },
  },
  { ssr: false }
);

const Sb2Md: NextPage = () => {
  return (
    <>
      <Head>
        <title>Scrapbox to Markdown</title>
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:url"
          content="https://razokulover.com/playgrounds/sb2md"
        />
        <meta property="og:title" content="Scrapbox to Markdown" />
        <meta
          property="og:description"
          content="Convert Scrapbox Page to Markdown"
        />
        <meta
          property="og:image"
          content={`${process.env.BASE_URL}/razokulover-icon.png`}
        />
      </Head>
      <Flex
        flexDir={"column"}
        alignItems="center"
        justifyContent="center"
        w="100vw"
        minH="100vh"
      >
        <Text fontSize={"3xl"} fontWeight={"600"} mb={4}>
          Scrapbox to Markdown
        </Text>
        <Converter />
      </Flex>
      <Box textAlign="center">
        <Text fontSize="sm">
          Scrapbox to Markdown © 2022 |{" "}
          <Link
            href="https://github.com/YuheiNakasaka/sb2md-rs"
            target="_blank"
            color="#FF5252"
            outline="none"
          >
            GitHub
          </Link>
        </Text>
      </Box>
    </>
  );
};

export default Sb2Md;
