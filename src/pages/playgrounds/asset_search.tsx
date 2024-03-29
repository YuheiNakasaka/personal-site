import Head from "next/head";
import { Flex, Box, Text, Image, Button, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import AssetSearchForm from "../../components/AssetSearchForm";
import {
  AssetSearchContextProvider,
  AssetSearchContextType,
  AssetSearchContext,
} from "../../context/AssetSearchContext";
import { useContext, useState } from "react";
import { useGetNFTs } from "../../hooks/useGetNFTs";
import { useGetBalance } from "../../hooks/useGetBalance";
import { NFTMetaData } from "../../models/nft";
import { useResolveENS } from "../../hooks/useResolveENS";
import { NextPage } from "next";

const AddressArea = () => {
  const context: AssetSearchContextType = useContext(AssetSearchContext);
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
  );
};

const BalanceArea = () => {
  const context: AssetSearchContextType = useContext(AssetSearchContext);
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
  );
};

const NoNFTItems = () => {
  return (
    <>
      <Box textAlign="center">
        <Text>No Items</Text>
      </Box>
    </>
  );
};

const NFTItems = () => {
  const limit = 10;
  const context: AssetSearchContextType = useContext(AssetSearchContext);
  const [itemOffset, setItemOffset] = useState(0);
  return (
    <>
      <Box id="nft-items" width="93%" margin="1rem auto 50px auto">
        {context.nftItems.slice(itemOffset, itemOffset + limit).map((item) => {
          const metadata = item.metadata as NFTMetaData;
          return (
            <Box
              key={item.token_id}
              marginBottom="1em"
              style={{ display: "inline-block" }}
            >
              <Link
                color="blue.500"
                href={
                  context.chain === "polygon"
                    ? `https://polygonscan.com/token/${item.token_address}?a=${item.token_id}`
                    : `https://etherscan.io/token/${item.token_address}?a=${item.token_id}`
                }
                target="_blank"
              >
                <Image
                  alt={metadata.name}
                  src={metadata.image}
                  w="100%"
                  maxW="334px"
                />
              </Link>
              <Text fontSize="1em">{metadata.name}</Text>
              <Text fontSize="0.5em">{metadata.description}</Text>
            </Box>
          );
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
              setItemOffset(itemOffset - limit);
            }}
          >
            Prev
          </Button>
        )}
        {itemOffset + limit < context.nftItems.length && (
          <Button
            onClick={() => {
              setItemOffset(itemOffset + limit);
            }}
          >
            Next
          </Button>
        )}
      </Flex>
    </>
  );
};

const AssetSearchMain = () => {
  const context: AssetSearchContextType = useContext(AssetSearchContext);
  const searchNft = useGetNFTs();
  const resolveENS = useResolveENS();
  const getBalance = useGetBalance();
  return (
    <>
      <Head>
        <title>Crypto Asset Search</title>
        <meta
          name="description"
          content="Crypto Asset Search allows you to search balances and nfts."
        ></meta>
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:url"
          content="https://razokulover.com/playgrounds/asset_search"
        />
        <meta property="og:title" content="Crypto Asset Search" />
        <meta
          property="og:description"
          content="Crypto Asset Search allows you to search balances and nfts."
        />
        <meta
          property="og:image"
          content={`${process.env.BASE_URL}/razokulover-icon.png`}
        />
      </Head>
      <Flex bg="white" w="100vw" minH="100vh">
        <Box mx="auto" pt={"1rem"} pb={"2.5rem"}>
          <Flex as="header" width="full" py={4} px={8}>
            <AssetSearchForm
              initialValues={{ text: "" }}
              onSubmit={async (_) => {
                context.setLoading(true);

                const { address } = await resolveENS(context.text);
                if (`${address}`.startsWith("0x")) {
                  context.setAddress(address);

                  const account = await getBalance(address, context.chain);
                  context.setBalance(account.balance);

                  const nfts = await searchNft(address, context.chain);
                  context.setTotalNFT(nfts.total);
                  context.setNFTItems(nfts.result.slice());
                } else {
                  console.error(`The address is not found.`);
                }

                context.setLoading(false);
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

      <Box textAlign="center">
        <Text fontSize="sm">
          Crypto Asset Search © 2021 |{" "}
          <Link
            href="https://etherscan.io/address/0xfB9AaE55f46F03a2FF53882b432Fbf52Fc6B668F"
            target="_blank"
            color="#FF5252"
            outline="none"
          >
            Donate❤︎
          </Link>
        </Text>
      </Box>
    </>
  );
};

const AssetSearchPage: NextPage = () => {
  return (
    <AssetSearchContextProvider>
      <AssetSearchMain></AssetSearchMain>
    </AssetSearchContextProvider>
  );
};

export default AssetSearchPage;
