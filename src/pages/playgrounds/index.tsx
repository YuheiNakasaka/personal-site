import Head from "next/head";
import {
  Flex,
  Box,
  Heading,
  Text,
  Link as ExternalLink,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { ChangeEvent, useState } from "react";
import { CursorPointer } from "../../components/CursorPointer";
import Link from "next/link";
import { NextPage } from "next";

interface ListBoxProps {
  url: string;
  title: string;
  description: string;
  external?: boolean;
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
  );
};

const PlaygroundsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Playgrounds</title>
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:url"
          content={`${process.env.BASE_URL}/playgrounds`}
        />
        <meta property="og:title" content="Playgrounds" />
        <meta
          property="og:image"
          content={`${process.env.BASE_URL}/razokulover-icon.png`}
        />
      </Head>
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        w="100vw"
        minH="100vh"
      >
        <Heading mb="2rem">Playgrounds</Heading>
        <Box>
          <ListBox
            title="Crypto Asset Search"
            description="Crypto Asset Search allows you to search balances and nfts."
            url="/playgrounds/asset_search"
          />
          <ListBox
            title="NFT Login"
            description="If you have a specific NFT, you can access a page. (localhost only)"
            url="/playgrounds/nft_login"
          />
          <ListBox
            title="Personal Sign"
            description="Wallet??????????????????????????????????????????????????????"
            url="/playgrounds/personal_sign"
          />
          <ListBox
            title="NFT Owner Checker"
            description="ERC721???ERC1155??????????????????????????????????????????"
            url="/playgrounds/nft_owner_checker"
          />
          <ListBox
            title="Twitter ETH"
            description="The implementation of dApp like Twitter for Ethereum(ropsten)"
            url="https://twitter-eth.vercel.app/"
            external={true}
          />
          <ListBox
            title="?????????????????????????????????"
            description="??????????????????????????????????????????????????????"
            url="https://haropuro-shuffle.pages.dev/"
            external={true}
          />
          <ListBox
            title="??????????????????"
            description="????????????????????????????????????"
            url="/playgrounds/gorotan_search"
            external={true}
          />
        </Box>
      </Flex>
    </>
  );
};

export default PlaygroundsPage;
