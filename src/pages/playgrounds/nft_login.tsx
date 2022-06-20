import Head from "next/head";
import { ChainId, DAppProvider, useEthers, Config } from "@usedapp/core";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useCallNFTLogin } from "../../hooks/useCallNFTLogin";
import { useState } from "react";
import { NextPage } from "next";

const config: Config = {
  readOnlyChainId: ChainId.Hardhat,
  readOnlyUrls: {
    [ChainId.Hardhat]: "http://localhost:8545",
  },
  multicallAddresses: {
    [ChainId.Hardhat]: "http://localhost:8545",
  },
};

const MainContent = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const { activateBrowserWallet, account } = useEthers();
  const hasValidNFT = useCallNFTLogin();
  return (
    <>
      <Flex alignItems="center" justifyContent="center" w="100vw" minH="100vh">
        <Box textAlign="center">
          <Box my="1rem">
            <Text fontSize="lg" fontWeight="600">
              Status
            </Text>
            {account ? <Text>Connected</Text> : <Text>Not connected</Text>}
          </Box>
          {!account && (
            <Button
              onClick={() => {
                activateBrowserWallet();
              }}
            >
              Connect Wallet!(localhost only)
            </Button>
          )}
          {account && (
            <Box>
              <Button
                onClick={async () => {
                  setAuthenticated(await hasValidNFT(account));
                }}
              >
                Show the limited contents? If not, you don&apos;t have NFT.
              </Button>
            </Box>
          )}
          {account && authenticated && (
            <Box mt="1rem">
              <Text fontSize="2xl" fontWeight="600">
                You are a special user!
              </Text>
            </Box>
          )}
        </Box>
      </Flex>
    </>
  );
};

const NFTLoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>NFTLogin</title>
      </Head>
      <DAppProvider config={config}>
        <MainContent />
      </DAppProvider>
    </>
  );
};

export default NFTLoginPage;
