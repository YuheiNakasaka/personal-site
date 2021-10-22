import { Suspense } from "react"
import { Head, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import { Flex, Box, IconButton, UnorderedList, ListItem, Link } from "@chakra-ui/react"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import Layout from "app/core/layouts/Layout"
import getDiaries from "app/diaries/queries/getDiaries"
import { DiaryTitle } from "app/diaries/components/DiaryTitle"
import { DiaryContent } from "app/diaries/components/DiaryContent"

const ITEMS_PER_PAGE = 100

export const DiariesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ diaries, hasMore }] = usePaginatedQuery(getDiaries, {
    orderBy: { id: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <Box>
      <Box>
        {diaries.length !== 0 && (
          <Box>
            <UnorderedList listStyleType="none" ml="0" pl="0">
              {diaries.map((diary) => (
                <ListItem key={diary.id} mb="5rem">
                  <Link href={`/diaries/${diary.id}`} display="inline-block">
                    <DiaryTitle date={diary.createdAt}></DiaryTitle>
                  </Link>
                  <Box mt="1rem">
                    <DiaryContent text={diary.text}></DiaryContent>
                  </Box>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        )}
      </Box>
      {diaries.length !== 0 && (
        <Flex alignItems="center" justifyContent="center">
          <Box mt="5rem">
            <Flex>
              <Box mr="1rem">
                <button disabled={page === 0} onClick={goToPreviousPage}>
                  Previous
                </button>
              </Box>
              <Box>
                <button disabled={!hasMore} onClick={goToNextPage}>
                  Next
                </button>
              </Box>
            </Flex>
          </Box>
        </Flex>
      )}
    </Box>
  )
}

const DiariesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Diaries</title>
      </Head>
      <Flex bg="white" w="100vw">
        <Flex as="header" position="fixed" top={0} width="full" py={4} px={8}>
          <Box>
            <Link href="/">
              <IconButton
                aria-label="back"
                color="black"
                rounded="full"
                icon={<ChevronLeftIcon />}
              />
            </Link>
          </Box>
        </Flex>
        <Box mx="auto" pt={"6rem"} pb={"2.5rem"}>
          <Box
            w={{
              base: "90vw",
              sm: "90vw",
              md: "45rem",
              lg: "50rem",
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Suspense fallback={<div>Loading...</div>}>
                <DiariesList />
              </Suspense>
            </Suspense>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

DiariesPage.authenticate = false
DiariesPage.getLayout = (page) => <Layout>{page}</Layout>

export default DiariesPage
