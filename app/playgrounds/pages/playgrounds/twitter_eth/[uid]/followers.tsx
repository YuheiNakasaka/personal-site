import { Head, BlitzPage, useRouter, Link } from "blitz"
import Layout from "app/playgrounds/layouts/twitter_eth/Layout"
import { useEthers } from "@usedapp/core"
import { Box, Flex, Text, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { User } from "app/playgrounds/models/twitter_eth/user"
import { utils, Contract } from "ethers"
import ABI from "app/playgrounds/resources/twitter-abi.json"
import { SideBar, HeaderTabType } from "app/playgrounds/components/twitter_eth/Sidebar"
import { FlatButton } from "app/playgrounds/components/twitter_eth/FlatButton"

const MainContent = () => {
  const router = useRouter()
  const uid = router.params.uid?.toString() || ""
  const { account, library } = useEthers()
  const [followers, setFollowers] = useState<User[]>([])
  const [fetching, setFetching] = useState(false)

  const getFollowers = async (address: string): Promise<User[]> => {
    if (library !== undefined) {
      const inteface = new utils.Interface(ABI.abi)
      const contract = new Contract(
        `${process.env.TWITTER_ETH_CONTRACT_ID}`,
        inteface,
        library?.getSigner()
      )
      const followings = await contract.getFollowers(address)
      return followings
    } else {
      console.log("Library is undefined")
      return []
    }
  }

  useEffect(() => {
    if (library !== undefined && uid !== "") {
      setFetching(true)
      getFollowers(uid)
        .then((followings) => {
          setFollowers(followings)
        })
        .finally(() => {
          setFetching(false)
        })
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
          <SideBar type={HeaderTabType.Profile} account={account} />
          <Flex flexBasis={0} flexGrow={999} flexDir="column" minH="100vh" borderX="1px solid #eee">
            <Box borderBottom="1px solid #eee">
              <Box w="100%" px="1rem" p="1rem">
                <Text fontSize="1.4rem" fontWeight="bold">
                  Followers
                </Text>
                <Text fontSize="0.5rem" isTruncated>
                  {uid}
                </Text>
              </Box>
            </Box>
            <Box>
              {fetching ? (
                <Box textAlign="center" p="1rem">
                  <Spinner color="#1DA1F2" size="lg" />
                </Box>
              ) : (
                followers.map((user: User) => (
                  <Box
                    key={user.id}
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
                        <Link href={`/playgrounds/twitter_eth/${user.id}`}>
                          <FlatButton>
                            <Text fontSize="0.9rem" fontWeight="bold" isTruncated>
                              {user.id}
                            </Text>
                          </FlatButton>
                        </Link>
                      </Flex>
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

const TwitterEthFollowersPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Twitter ETH</title>
      </Head>
      <MainContent />
    </>
  )
}

TwitterEthFollowersPage.authenticate = false
TwitterEthFollowersPage.getLayout = (page) => <Layout>{page}</Layout>

export default TwitterEthFollowersPage
