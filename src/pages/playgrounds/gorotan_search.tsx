import { Box, Flex, Input, Link, Spacer, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useState } from "react";
import GOROTAN_WORDS from "../../resources/gorotan_word.json";

type Word = {
  word: string;
  meaning: string;
  href: string;
  images: string[];
};

const GorotanSearchMain = () => {
  const gorotanWords = GOROTAN_WORDS as Record<string, Word>;
  const allKeys = Object.keys(gorotanWords);
  const [matchWords, setMatchWords] = useState<Word[]>([]);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 3) {
      setMatchWords([]);
      return;
    }
    const matchedObjects: Word[] = [];
    allKeys
      .filter((key) => key.startsWith(e.target.value))
      .forEach((key) => matchedObjects.push(gorotanWords[key]));
    setMatchWords(matchedObjects);
  };
  return (
    <>
      <Head>
        <title>ごろたん検索</title>
        <meta name="description" content="ごろたんの検索ができます"></meta>
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:url"
          content="https://razokulover.com/playgrounds/gorotan_search"
        />
        <meta property="og:title" content="ごろたん検索" />
        <meta property="og:description" content="ごろたんの検索ができます" />
        <meta
          property="og:image"
          content={`${process.env.BASE_URL}/razokulover-icon.png`}
        />
      </Head>
      <Flex
        w={{
          base: "100%",
          md: "65vw",
        }}
        minH="100vh"
        m={"0 auto"}
        px={{
          base: "4",
          md: "0",
        }}
      >
        <Flex w="100%" flexDir={"column"} alignItems={"center"} my={20}>
          <Text fontSize={"2.4rem"}>ごろたん検索</Text>
          <Link href="https://www.en-tango.com/" isExternal mb={4}>
            元サイト: https://www.en-tango.com/
          </Link>
          <Input
            type={"text"}
            placeholder={"単語を入力してください"}
            onChange={onChange}
            mb={4}
          />
          <Flex
            flexDir={"column"}
            w={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {matchWords.map((word) => {
              return (
                <>
                  <Flex
                    key={word.href}
                    w={{
                      base: "100%",
                      md: "100%",
                    }}
                    flexDir={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderBottom={"1px solid #eee"}
                    p={4}
                    cursor={"pointer"}
                    onClick={() => {
                      window.open(word.href, "_blank");
                    }}
                  >
                    <Flex w={"100%"} flexDir={"column"} mb={2}>
                      <Text fontSize={20} fontWeight={"bold"} mb={2}>
                        {word.word}
                      </Text>
                      <Spacer />
                      <Text fontSize={16}>{word.meaning}</Text>
                    </Flex>
                    <Flex
                      w={"100%"}
                      flexDir={"column"}
                      justifyContent={"start"}
                    >
                      {word.images.map((image) => {
                        return (
                          <Box
                            key={`${word.word}${Math.random()
                              .toString(36)
                              .substr(2, 9)}`}
                            dangerouslySetInnerHTML={{
                              __html: image,
                            }}
                          ></Box>
                        );
                      })}
                    </Flex>
                  </Flex>
                </>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

const GorotanSearchPage: NextPage = () => {
  return <GorotanSearchMain></GorotanSearchMain>;
};

export default GorotanSearchPage;
