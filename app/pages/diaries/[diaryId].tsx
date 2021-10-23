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
  const { diaries } = await invoke(getDiaries, {
    orderBy: { id: "desc" },
    skip: 0,
    take: 1,
  })
  const paths: StaticPathParams[] = []
  if (diaries !== undefined && diaries.length == 1) {
    const diary = diaries[0]
    const lastId = diary?.id
    if (lastId != undefined) {
      for (let i = 0; i < lastId; i++) {
        await invoke(getDiary, { id: i })
          .then((_) => {
            paths.push({
              params: {
                diaryId: `${i}`,
              },
            })
          })
          .catch((_) => {
            console.log(`Not found record: ${i}`)
          })
      }
    }
  }
  return {
    paths,
    fallback: true,
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
                </Head>
                <Box>
                  <Text fontSize="2xl">{diary.createdAt.toDateString()}</Text>
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
