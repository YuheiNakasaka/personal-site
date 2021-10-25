import { useRouter, BlitzPage, Routes, GetServerSideProps } from "blitz"
import { Flex, Link, Box, IconButton } from "@chakra-ui/react"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { isValidToken } from "../restriction"

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!isValidToken(query.secret)) {
    return {
      props: {},
      notFound: true,
    }
  }
  return {
    props: {},
  }
}

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Flex bg="white" w="100vw">
      <Flex as="header" position="fixed" top={0} width="full" py={4} px={8}>
        <Box>
          <Link href="/">
            <IconButton aria-label="back" color="black" rounded="full" icon={<ChevronLeftIcon />} />
          </Link>
        </Box>
      </Flex>
      <Box
        mx="auto"
        pt={"6rem"}
        pb={"2.5rem"}
        pl={{
          base: "2rem",
          sm: "2rem",
          md: "2rem",
          lg: "0rem",
        }}
      >
        <Box
          w={{
            base: "100%",
            sm: "100%",
            md: "50rem",
            lg: "50rem",
          }}
        >
          <SignupForm onSuccess={() => router.push(Routes.Home())} />
        </Box>
      </Box>
    </Flex>
  )
}

SignupPage.authenticate = { redirectTo: "/" }
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
