import { Suspense } from "react"
import {
  Head,
  Link,
  BlitzPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
  invoke,
} from "blitz"
import { Flex, Box, IconButton, Text } from "@chakra-ui/react"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import Layout from "app/core/layouts/Layout"
import getDiary from "app/diaries/queries/getDiary"
import { DiaryContent } from "app/diaries/components/DiaryContent"
import getDiaries from "app/diaries/queries/getDiaries"
import DiaryTitle from "app/diaries/components/DiaryTitle"

const ITEMS_PER_PAGE = 100

type StaticPathParamsPath = {
  diaryId: string
}

type StaticPathParams = {
  params: StaticPathParamsPath
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = Number(context.params?.diaryId) || 0
  const diary = await invoke(getDiary, {
    id: id,
  })
  return {
    props: {
      diary,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let skip = 0
  const paths: StaticPathParams[] = []
  while (true) {
    const { diaries } = await invoke(getDiaries, {
      orderBy: { id: "desc" },
      skip: ITEMS_PER_PAGE * skip,
      take: ITEMS_PER_PAGE,
    })
    if (diaries == undefined || diaries.length === 0) {
      break
    }
    if (diaries !== undefined) {
      diaries.map((diary) => {
        paths.push({
          params: {
            diaryId: `${diary.id}`,
          },
        })
      })
    }
    skip += 1
  }
  return {
    paths,
    fallback: false,
  }
}

const ShowDiaryPage: BlitzPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { diary } = props
  return (
    <Flex bg="white" w="100vw">
      <Flex as="header" position="fixed" top={0} width="full" py={4} px={8}>
        <Box>
          <Link href="/diaries">
            <IconButton aria-label="back" color="black" rounded="full" icon={<ChevronLeftIcon />} />
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
            {diary != undefined && (
              <>
                <Head>
                  <title>{diary.createdAt.toDateString()}</title>
                  <meta name="description" content={diary.text}></meta>
                  <meta name="twitter:card" content="summary" />
                  <meta name="twitter:creator" content="@razokulover" />
                  <meta property="og:url" content={`${process.env.BASE_URL}/diaries/${diary.id}`} />
                  <meta property="og:title" content={diary.createdAt.toDateString()} />
                  <meta property="og:description" content={diary.text} />
                  <meta
                    property="og:image"
                    content={`${process.env.BASE_URL}/razokulover-icon.png`}
                  />
                </Head>
                <Box>
                  <DiaryTitle date={diary.createdAt}></DiaryTitle>
                  <Box mt="2rem" mb="2rem">
                    <DiaryContent text={diary.text}></DiaryContent>
                  </Box>
                </Box>
              </>
            )}
          </Suspense>
        </Box>
      </Box>
    </Flex>
  )
}

ShowDiaryPage.authenticate = false
ShowDiaryPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowDiaryPage
