import { Suspense } from "react"
import { Head, BlitzPage, GetStaticProps, InferGetStaticPropsType, invoke } from "blitz"
import { Flex, Box, IconButton, UnorderedList, ListItem, Link } from "@chakra-ui/react"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import Layout from "app/core/layouts/Layout"
import getDiaries from "app/diaries/queries/getDiaries"
import { DiaryTitle } from "app/diaries/components/DiaryTitle"

const ITEMS_PER_PAGE = 100

export const getStaticProps: GetStaticProps = async (context) => {
  const page = Number(context.params?.page) || 0
  const { diaries, hasMore, count } = await invoke(getDiaries, {
    orderBy: { id: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  return {
    props: {
      diaries,
      hasMore,
      count,
      page,
    },
  }
}

const DiariesPage: BlitzPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { diaries, count } = props
  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i)
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
              <Box>
                <Box>
                  {diaries !== undefined && diaries.length !== 0 && (
                    <Box>
                      <UnorderedList listStyleType="none" ml="0" pl="0">
                        {diaries.map((diary) => (
                          <ListItem key={diary.id} mb="1rem">
                            <Link href={`/diaries/${diary.id}`} display="inline-block">
                              <DiaryTitle date={diary.createdAt}></DiaryTitle>
                            </Link>
                          </ListItem>
                        ))}
                      </UnorderedList>
                    </Box>
                  )}
                </Box>
                {count > ITEMS_PER_PAGE && (
                  <Flex alignItems="center" justifyContent="center">
                    <Box mt="5rem">
                      <Flex>
                        {range(1, Math.ceil(count / ITEMS_PER_PAGE)).map((number, index) => (
                          <Box key={index} mr="1rem">
                            <Link href={`/diaries/paging/${index}`}>{number}</Link>
                          </Box>
                        ))}
                      </Flex>
                    </Box>
                  </Flex>
                )}
              </Box>
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
