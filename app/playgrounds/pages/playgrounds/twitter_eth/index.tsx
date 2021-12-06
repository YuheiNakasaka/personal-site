import { Head, BlitzPage, Link } from "blitz"
import Layout from "app/core/layouts/Layout"
import { ChainId, DAppProvider, useEthers, Config } from "@usedapp/core"
import { Box, Flex, Text, FormControl, Textarea, Spinner, useToast } from "@chakra-ui/react"
import { Button } from "@chakra-ui/button"
import { ChangeEvent, useEffect, useState } from "react"
import { Tweet } from "app/playgrounds/models/tweet"
import { SideBar, HeaderTabType } from "app/playgrounds/components/twitter_eth/Sidebar"
import { utils, Contract } from "ethers"
import ABI from "app/playgrounds/resources/twitter-abi.json"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { FlatButton } from "app/playgrounds/components/twitter_eth/FlatButton"
dayjs.extend(relativeTime)

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

let timer: NodeJS.Timer
const MainContent = () => {
  const toast = useToast()
  const { activateBrowserWallet, account, library } = useEthers()
  const [tweetInput, setTweetInput] = useState("")
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [fetching, setFetching] = useState(false)
  const [posting, setPosting] = useState(false)

  const getTimelineTweets = async (offset: number, limit: number): Promise<Tweet[]> => {
    if (library !== undefined) {
      const inteface = new utils.Interface(ABI.abi)
      const contract = new Contract(CONTRACT_ADDRESS, inteface, library?.getSigner())
      const tweets = await contract.getTimeline(offset, limit)
      return tweets.map((tweet: any) => {
        return {
          content: tweet.content,
          author: tweet.author,
          timestamp: tweet.timestamp.toNumber() * 1000,
        }
      })
    } else {
      console.log("Library is undefined")
      return []
    }
  }

  const postTweet = async (tweet: string): Promise<boolean> => {
    if (library !== undefined) {
      const inteface = new utils.Interface(ABI.abi)
      const contract = new Contract(CONTRACT_ADDRESS, inteface, library?.getSigner())
      await contract.setTweet(tweet)
      return true
    } else {
      console.log("Library is undefined")
      return false
    }
  }

  const updateTweets = async () => {
    const tweets: Tweet[] = await getTimelineTweets(0, 100)
    console.log(tweets)
    setTweets(tweets)
  }

  useEffect(() => {
    if (library !== undefined) {
      setFetching(true)
      updateTweets().finally(() => {
        setFetching(false)
      })
      clearInterval(timer)
      timer = setInterval(() => {
        updateTweets()
      }, 5000)
    }
  }, [library])

  return (
    <>
      <Box w="100vw" minH="100vh">
        <Flex
          flexWrap="wrap"
          maxW={{
            base: "100vw",
            lg: "60vw",
            xl: "60vw",
          }}
          m="0 auto"
        >
          <SideBar type={HeaderTabType.Home} account={`${account}`} />
          <Flex flexBasis={0} flexGrow={999} flexDir="column" minH="100vh" borderX="1px solid #eee">
            <Box borderBottom="1px solid #eee">
              <Box w="100%" px="1rem" p="1rem" borderBottom="1px solid #eee">
                <Text fontSize="1.4rem" fontWeight="bold">
                  Home
                </Text>
              </Box>
              <Box w="100%" px="1rem">
                <FormControl py="1rem">
                  <Textarea
                    placeholder="What's happening?"
                    minW="80%"
                    h="5rem"
                    fontSize="1.2rem"
                    border="0"
                    resize="none"
                    outline="none"
                    value={tweetInput}
                    focusBorderColor="transparent"
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      setTweetInput(e.target.value)
                    }}
                  ></Textarea>
                  <Flex justifyContent="end">
                    {!account ? (
                      <Button
                        colorScheme="twitter"
                        borderRadius="999px"
                        onClick={() => {
                          activateBrowserWallet()
                        }}
                      >
                        Connect Wallet!
                      </Button>
                    ) : (
                      <Button
                        colorScheme="twitter"
                        borderRadius="999px"
                        isLoading={posting}
                        onClick={async () => {
                          if (!fetching) {
                            setPosting(true)
                            const result = await postTweet(tweetInput)
                            if (result) {
                              toast({
                                title: "Tweet posted! Waiting for confirmation...",
                                status: "success",
                                isClosable: true,
                              })
                              setTweetInput("")
                            }
                            setPosting(false)
                          }
                        }}
                      >
                        Tweet
                      </Button>
                    )}
                  </Flex>
                </FormControl>
              </Box>
            </Box>
            <Box>
              {fetching ? (
                <Box textAlign="center" p="1rem">
                  <Spinner color="#1DA1F2" size="lg" />
                </Box>
              ) : (
                tweets.map((tweet: Tweet) => (
                  <Box
                    key={tweet.timestamp}
                    w={{
                      base: "100vw",
                      sm: "100%",
                      md: "100%",
                      lg: "100%",
                      xl: "100%",
                    }}
                    borderBottom="1px solid #eee"
                  >
                    <Box p="1rem">
                      <Flex mb="0.2rem">
                        <Link href={`/playgrounds/twitter_eth/${tweet.author}`}>
                          <FlatButton>
                            <Text fontSize="0.9rem" fontWeight="bold" isTruncated>
                              {tweet.author}
                            </Text>
                          </FlatButton>
                        </Link>
                        <Text fontSize="0.9rem" ml="0.5rem" color="rgb(83, 100, 113)">
                          {dayjs(tweet.timestamp).fromNow()}
                        </Text>
                      </Flex>
                      <Text fontSize="1rem">{tweet.content}</Text>
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

const config: Config = {
  readOnlyChainId: ChainId.Hardhat,
  readOnlyUrls: {
    [ChainId.Hardhat]: "http://localhost:8545",
  },
  multicallAddresses: {
    [ChainId.Hardhat]: "http://localhost:8545",
  },
}

const TwitterEthPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Twitter ETH</title>
      </Head>
      <DAppProvider config={config}>
        <MainContent />
      </DAppProvider>
    </>
  )
}

TwitterEthPage.authenticate = false
TwitterEthPage.getLayout = (page) => <Layout>{page}</Layout>

export default TwitterEthPage
