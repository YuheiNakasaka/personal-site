import { Head, BlitzPage } from "blitz"
import Layout from "app/playgrounds/layouts/twitter_eth/Layout"
import { useEthers } from "@usedapp/core"
import {
  Box,
  Flex,
  Text,
  FormControl,
  Textarea,
  Spinner,
  useToast,
  Icon,
  Spacer,
  Image,
  Tooltip,
} from "@chakra-ui/react"
import { Button } from "@chakra-ui/button"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { Tweet } from "app/playgrounds/models/twitter_eth/tweet"
import { SideBar, HeaderTabType } from "app/playgrounds/components/twitter_eth/Sidebar"
import { utils, Contract, ethers } from "ethers"
import ABI from "app/playgrounds/resources/twitter-abi.json"
import { TweetBox } from "app/playgrounds/components/twitter_eth/TweetBox"
import { FlatButton } from "app/playgrounds/components/twitter_eth/FlatButton"
import { FiImage } from "react-icons/fi"
import { AiFillCloseCircle } from "react-icons/ai"

const MainContent = () => {
  const toast = useToast()
  const { activateBrowserWallet, account, library } = useEthers()
  const [tweetInput, setTweetInput] = useState("")
  const [tweetInputImage, setTweetInputImage] = useState("")
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [fetching, setFetching] = useState(false)
  const [posting, setPosting] = useState(false)
  const inputFileRef = useRef<HTMLInputElement>(null)

  const getTimelineTweets = async (offset: number, limit: number): Promise<Tweet[]> => {
    if (library !== undefined && account) {
      const inteface = new utils.Interface(ABI.abi)
      const contract = new Contract(
        `${process.env.TWITTER_ETH_CONTRACT_ID}`,
        inteface,
        library?.getSigner()
      )
      const tweets = await contract.getTimeline(offset, limit)
      return tweets.map((tweet: any) => {
        return {
          tokenId: tweet.tokenId,
          content: tweet.content,
          author: tweet.author,
          timestamp: tweet.timestamp.toNumber() * 1000,
          attachment: tweet.attachment || "",
        }
      })
    } else {
      console.log("Library is undefined")
      return []
    }
  }

  const postTweet = async (tweet: string, tweetInputImage: string): Promise<boolean> => {
    if (library !== undefined && account) {
      const inteface = new utils.Interface(ABI.abi)
      const contract = new Contract(
        `${process.env.TWITTER_ETH_CONTRACT_ID}`,
        inteface,
        library?.getSigner()
      )
      return await contract
        .setTweet(tweet, tweetInputImage)
        .then(() => true)
        .catch((e) => {
          toast({
            title: "Error",
            description: `Error: ${e.message}`,
            status: "error",
            duration: 9000,
            isClosable: true,
          })
          return false
        })
    } else {
      console.log("Library is undefined")
      return false
    }
  }

  const updateTweets = async () => {
    const tweets: Tweet[] = await getTimelineTweets(0, 100)
    setTweets(tweets)
  }

  const subscribeTweeted = async () => {
    if (library !== undefined && account) {
      const inteface = new utils.Interface(ABI.abi)
      const contract = new Contract(
        `${process.env.TWITTER_ETH_CONTRACT_ID}`,
        inteface,
        library?.getSigner()
      )
      const provider = new ethers.providers.Web3Provider(library.provider)
      const filters = contract.filters["Tweeted"]
      if (filters !== undefined) {
        provider.once("block", () => {
          contract.on(filters(), (author: string, _: string) => {
            updateTweets()
            if (author === account) {
              toast.closeAll()
              toast({
                title: "Tweet confirmed successfully!",
                position: "top",
                status: "success",
                isClosable: true,
              })
            }
          })
        })
      }
      return true
    } else {
      console.log("Library is undefined")
      return false
    }
  }

  useEffect(() => {
    if (library !== undefined && account) {
      setFetching(true)
      updateTweets().finally(() => {
        setFetching(false)
      })
      subscribeTweeted()
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
          <SideBar type={HeaderTabType.Home} account={account} />
          <Flex flexBasis={0} flexGrow={999} flexDir="column" minH="100vh" borderX="1px solid #eee">
            <Box borderBottom="1px solid #eee">
              <Box w="100%" px="1rem" p="1rem" borderBottom="1px solid #eee">
                <Text fontSize="1.4rem" fontWeight="bold">
                  Home
                </Text>
              </Box>
              <Box w="100%" px="1rem">
                <FormControl py="1rem">
                  {account ? (
                    <>
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
                      {tweetInputImage !== "" && (
                        <Flex justifyContent="center" my="1rem">
                          <Box>
                            <Image src={tweetInputImage} alt="expected image" maxHeight="200px" />
                            <Box textAlign="center">
                              <FlatButton
                                onClick={() => {
                                  setTweetInputImage("")
                                  if (inputFileRef.current) {
                                    inputFileRef.current.value = ""
                                  }
                                }}
                              >
                                <Icon as={AiFillCloseCircle} fontSize="2rem" color="#000000" />
                              </FlatButton>
                            </Box>
                          </Box>
                        </Flex>
                      )}
                      <Flex justifyContent="end">
                        <input
                          type="file"
                          accept="image/*"
                          ref={inputFileRef}
                          hidden
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onload = () => {
                                const dataUri = `${reader.result}`
                                setTweetInputImage(`${dataUri}`)
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                        />
                        <FlatButton
                          onClick={() => {
                            if (inputFileRef.current) {
                              inputFileRef.current.click()
                            }
                          }}
                        >
                          <Icon as={FiImage} fontSize="1.6rem" color="#1DA1F2" />
                        </FlatButton>
                        <FlatButton>
                          <Text fontSize="0.8rem" color="gray.400">
                            tiny image only
                          </Text>
                        </FlatButton>
                        <Spacer />
                        <Button
                          colorScheme="twitter"
                          borderRadius="999px"
                          isLoading={posting}
                          onClick={async () => {
                            if (!fetching) {
                              setPosting(true)
                              const result = await postTweet(tweetInput, tweetInputImage)
                              if (result) {
                                toast({
                                  title: "Tweet posted! Waiting for confirmation...",
                                  position: "top",
                                  status: "success",
                                  duration: null,
                                })
                                setTweetInput("")
                                setTweetInputImage("")
                              }
                              setPosting(false)
                            }
                          }}
                        >
                          Tweet
                        </Button>
                      </Flex>
                    </>
                  ) : (
                    <>
                      <Flex justifyContent="center">
                        <Button
                          colorScheme="twitter"
                          borderRadius="999px"
                          onClick={() => {
                            activateBrowserWallet()
                          }}
                        >
                          Connect Wallet!
                        </Button>
                      </Flex>
                    </>
                  )}
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
