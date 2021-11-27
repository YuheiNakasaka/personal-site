import { Suspense } from "react"
import { Head, BlitzPage, GetStaticProps, InferGetStaticPropsType, invoke } from "blitz"
import { Flex, Box, IconButton, UnorderedList, ListItem, Link, Center } from "@chakra-ui/react"
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
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@razokulover" />
        <meta property="og:url" content={`${process.env.BASE_URL}/diaries`} />
        <meta property="og:title" content="Diaries" />
        <meta property="og:image" content={`${process.env.BASE_URL}/razokulover-icon.png`} />
      </Head>
      <Flex as="header" position="fixed" top={0} width="full" py="1rem" px="1.5rem">
        <Box>
          <Link href="/">
            <IconButton aria-label="back" color="black" rounded="full" icon={<ChevronLeftIcon />} />
          </Link>
        </Box>
      </Flex>
      <Flex bg="white" w="100vw" justifyContent="center" my="4rem">
        <Suspense fallback={<div>Loading...</div>}>
          {diaries !== undefined && diaries.length !== 0 && (
            <UnorderedList>
              {diaries.map((diary) => (
                <ListItem key={diary.id} mb="1rem">
                  <Link href={`/diaries/${diary.id}`} display="inline-block">
                    <DiaryTitle date={diary.createdAt}></DiaryTitle>
                  </Link>
                </ListItem>
              ))}
            </UnorderedList>
          )}
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
        </Suspense>
      </Flex>
    </>
  )
}

DiariesPage.authenticate = false
DiariesPage.getLayout = (page) => <Layout>{page}</Layout>

export default DiariesPage
