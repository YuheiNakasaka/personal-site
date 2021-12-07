import { Head, BlitzPage } from "blitz"
import Layout from "app/playgrounds/layouts/twitter_eth/Layout"
import { useEthers } from "@usedapp/core"
import { Box, Flex, Text, FormControl, Textarea, Spinner, useToast } from "@chakra-ui/react"
import { Button } from "@chakra-ui/button"
import { ChangeEvent, useEffect, useState } from "react"
import { Tweet } from "app/playgrounds/models/twitter_eth/tweet"
import { SideBar, HeaderTabType } from "app/playgrounds/components/twitter_eth/Sidebar"
import { utils, Contract } from "ethers"
import ABI from "app/playgrounds/resources/twitter-abi.json"
import { TweetBox } from "app/playgrounds/components/twitter_eth/TweetBox"

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
      const contract = new Contract(
        `${process.env.TWITTER_ETH_CONTRACT_ID}`,
        inteface,
        library?.getSigner()
      )
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
      const contract = new Contract(
        `${process.env.TWITTER_ETH_CONTRACT_ID}`,
        inteface,
        library?.getSigner()
      )
      await contract.setTweet(tweet)
      return true
    } else {
      console.log("Library is undefined")
      return false
    }
  }

  const updateTweets = async () => {
    const tweets: Tweet[] = await getTimelineTweets(0, 100)
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
                tweets.map((tweet: Tweet) => <TweetBox tweet={tweet} key={tweet.timestamp} />)
              )}
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

const TwitterEthPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Twitter ETH</title>
      </Head>
      <MainContent />
    </>
  )
}

TwitterEthPage.authenticate = false
TwitterEthPage.getLayout = (page) => <Layout>{page}</Layout>

export default TwitterEthPage
