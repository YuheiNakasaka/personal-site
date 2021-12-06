import { Head, BlitzPage, useRouter, Link } from "blitz"
import Layout from "app/core/layouts/Layout"
import { ChainId, DAppProvider, useEthers, Config } from "@usedapp/core"
import { Box, Flex, Text, Spinner, chakra } from "@chakra-ui/react"
import { Button } from "@chakra-ui/button"
import { useEffect, useState } from "react"
import { Tweet } from "app/playgrounds/models/tweet"
import { utils, Contract } from "ethers"
import ABI from "app/playgrounds/resources/twitter-abi.json"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { SideBar, HeaderTabType } from "app/playgrounds/components/twitter_eth/Sidebar"
import { FlatButton } from "app/playgrounds/components/twitter_eth/FlatButton"
dayjs.extend(relativeTime)

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

let timer: NodeJS.Timer
const MainContent = () => {
  const router = useRouter()
  const uid = router.params.uid?.toString() || ""
  const { account, library } = useEthers()
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [followings, setFollowings] = useState(0)
  const [followers, setFollowers] = useState(0)
  const [isFollowing, setIsFollowing] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [isOwner, setIsOnwer] = useState(false)

  const getUserTweets = async (address: string): Promise<Tweet[]> => {
    if (library !== undefined) {
      const inteface = new utils.Interface(ABI.abi)
      const contract = new Contract(CONTRACT_ADDRESS, inteface, library?.getSigner())
      const tweets = await contract.getUserTweets(address)
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

  const getFollowers = async (address: string): Promise<number> => {
    if (library !== undefined) {
      const inteface = new utils.Interface(ABI.abi)
      const contract = new Contract(CONTRACT_ADDRESS, inteface, library?.getSigner())
      const followers = await contract.getFollowers(address)
      return followers?.length || 0
    } else {
      console.log("Library is undefined")
      return 0
    }
  }

  const getFollowings = async (address: string): Promise<number> => {
    if (library !== undefined) {
      const inteface = new utils.Interface(ABI.abi)
      const contract = new Contract(CONTRACT_ADDRESS, inteface, library?.getSigner())
      const followings = await contract.getFollowings(address)
      return followings?.length || 0
    } else {
      console.log("Library is undefined")
      return 0
    }
  }

  const follow = async (address: string): Promise<boolean> => {
    if (library !== undefined) {
      const inteface = new utils.Interface(ABI.abi)
      const contract = new Contract(CONTRACT_ADDRESS, inteface, library?.getSigner())
      await contract.follow(address)
      return true
    } else {
      console.log("Library is undefined")
      return false
    }
  }

  const unfollow = async (address: string): Promise<boolean> => {
    if (library !== undefined) {
      const inteface = new utils.Interface(ABI.abi)
      const contract = new Contract(CONTRACT_ADDRESS, inteface, library?.getSigner())
      await contract.unfollow(address)
      return true
    } else {
      console.log("Library is undefined")
      return false
    }
  }

  const following = async (address: string): Promise<boolean> => {
    if (library !== undefined) {
      const inteface = new utils.Interface(ABI.abi)
      const contract = new Contract(CONTRACT_ADDRESS, inteface, library?.getSigner())
      return await contract.isFollowing(address)
    } else {
      console.log("Library is undefined")
      return false
    }
  }

  const loadUserTweets = async (address: string) => {
    clearInterval(timer)
    const tweets: Tweet[] = await getUserTweets(address)
    console.log(tweets)
    setTweets(tweets)
  }

  useEffect(() => {
    if (library !== undefined && uid !== "") {
      setFetching(true)
      following(uid).then((status) => {
        console.log(status)
        setIsFollowing(status)
      })
      getFollowers(uid).then((count) => {
        setFollowers(count)
      })
      getFollowings(uid).then((count) => {
        setFollowings(count)
      })
      loadUserTweets(uid).finally(() => {
        setFetching(false)
      })
      setIsOnwer(account?.toLowerCase() === uid.toLowerCase())
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
          <SideBar type={HeaderTabType.Profile} account={`${account}`} />
          <Flex flexBasis={0} flexGrow={999} flexDir="column" minH="100vh" borderX="1px solid #eee">
            <Box borderBottom="1px solid #eee">
              <Box w="100%" px="1rem" p="1rem">
                <Text fontSize="1.4rem" fontWeight="bold">
                  Profile
                  <Text fontSize="0.5rem" isTruncated>
                    {uid}
                  </Text>
                </Text>
              </Box>
              <Box w="100%" px="1rem" p="1rem">
                <Flex mb="1rem">
                  <Box>
                    <Link href={`/playgrounds/twitter_eth/${uid}/followings`}>
                      <FlatButton>
                        <Text>
                          {followings}{" "}
                          <chakra.span color="rgb(83, 100, 113)">followings</chakra.span>
                        </Text>
                      </FlatButton>
                    </Link>
                  </Box>
                  <Box ml="1rem">
                    <Link href={`/playgrounds/twitter_eth/${uid}/followers`}>
                      <FlatButton onClick={() => {}}>
                        <Text>
                          {followers} <chakra.span color="rgb(83, 100, 113)">followers</chakra.span>
                        </Text>
                      </FlatButton>
                    </Link>
                  </Box>
                </Flex>
                {!isOwner && !fetching && (
                  <Box textAlign="center">
                    {isFollowing ? (
                      <Button
                        borderRadius="999px"
                        onClick={() => {
                          unfollow(uid).then((_) => {
                            setIsFollowing(false)
                          })
                        }}
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        color="white"
                        bg="rgb(15, 20, 25)"
                        borderRadius="999px"
                        _hover={{ bg: "rgb(45, 50, 55)" }}
                        onClick={() => {
                          follow(uid).then((_) => {
                            setIsFollowing(true)
                          })
                        }}
                      >
                        Follow
                      </Button>
                    )}
                  </Box>
                )}
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

const TwitterEthProfilePage: BlitzPage = () => {
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

TwitterEthProfilePage.authenticate = false
TwitterEthProfilePage.getLayout = (page) => <Layout>{page}</Layout>

export default TwitterEthProfilePage
