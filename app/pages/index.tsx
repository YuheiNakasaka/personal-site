import { Suspense } from "react"
import { Image, BlitzPage, useMutation, Routes } from "blitz"
import { Flex, Link, Box, Center, UnorderedList, ListItem, Avatar } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"

import Layout from "app/core/layouts/Layout"

const Home: BlitzPage = () => {
  return (
    <Flex bg="white" w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Box mx="auto">
        <Box>
          <Avatar size="2xl" src={"razokulover-icon.png"}></Avatar>
        </Box>
        <Box mt={10}>
          <Center>
            <UnorderedList styleType="none">
              <ListItem>
                <Link href="/profile" fontSize="xl">
                  Profile
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/dialy" fontSize="xl">
                  Dialy
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://twitter.com/razokulover" fontSize="xl" isExternal>
                  Twitter <ExternalLinkIcon mx="2px" />
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://github.com/YuheiNakasaka" fontSize="xl" isExternal>
                  GitHub <ExternalLinkIcon mx="2px" />
                </Link>
              </ListItem>
            </UnorderedList>
          </Center>
        </Box>
      </Box>
    </Flex>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
