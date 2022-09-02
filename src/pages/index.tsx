import Head from "next/head";
import {
  Flex,
  Box,
  Center,
  Link,
  UnorderedList,
  ListItem,
  Avatar,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>razokulover</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@razokulover" />
        <meta property="og:url" content={`${process.env.BASE_URL}`} />
        <meta property="og:title" content="razokulover" />
        <meta
          property="og:image"
          content={`${process.env.BASE_URL}/razokulover-icon.png`}
        />
      </Head>
      <Flex
        bg="white"
        w="100vw"
        h="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Box mx="auto">
          <Box>
            <Avatar size="4xl" src={"razokulover-icon.png"}></Avatar>
          </Box>
          <Box mt={10}>
            <Center>
              <UnorderedList styleType="none">
                <ListItem>
                  <Link href="/profiles" fontSize="2xl">
                    Profile
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href="https://yuheinakasaka.github.io/gialog-diary"
                    fontSize="2xl"
                    isExternal
                  >
                    Diary <ExternalLinkIcon mx="0.1rem" />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href="https://scrapbox.io/razokulover-tech-memo/"
                    fontSize="2xl"
                    isExternal
                  >
                    Tech Scraps <ExternalLinkIcon mx="0.1rem" />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href="https://twitter.com/razokulover"
                    fontSize="2xl"
                    isExternal
                  >
                    Twitter <ExternalLinkIcon mx="0.1rem" />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href="https://github.com/YuheiNakasaka"
                    fontSize="2xl"
                    isExternal
                  >
                    GitHub <ExternalLinkIcon mx="0.1rem" />
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    href="https://zenn.dev/razokulover/"
                    fontSize="2xl"
                    isExternal
                  >
                    Zenn <ExternalLinkIcon mx="0.1rem" />
                  </Link>
                </ListItem>
              </UnorderedList>
            </Center>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Home;
