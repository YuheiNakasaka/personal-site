import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import { Flex, Box, IconButton, Text } from "@chakra-ui/react"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Layout from "app/core/layouts/Layout"
import getDiary from "app/diaries/queries/getDiary"
import deleteDiary from "app/diaries/mutations/deleteDiary"
import { DiaryContent } from "app/diaries/components/DiaryContent"

export const Diary = () => {
  const router = useRouter()
  const user = useCurrentUser()
  const diaryId = useParam("diaryId", "number")
  const [diary] = useQuery(getDiary, { id: diaryId })
  const [deleteDiaryMutation] = useMutation(deleteDiary)

  return (
    <>
      <Head>
        <title>Diary {diary.id}</title>
      </Head>

      <Box>
        <Text fontSize="2xl">{diary.createdAt.toDateString()}</Text>
        <Box mt="2rem" mb="2rem">
          <DiaryContent text={diary.text}></DiaryContent>
        </Box>

        {user != null && (
          <Box>
            <Link href={Routes.EditDiaryPage({ diaryId: diary.id })}>
              <a>Edit</a>
            </Link>

            <button
              type="button"
              onClick={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteDiaryMutation({ id: diary.id })
                  router.push(Routes.DiariesPage())
                }
              }}
              style={{ marginLeft: "0.5rem" }}
            >
              Delete
            </button>
          </Box>
        )}
      </Box>
    </>
  )
}

const ShowDiaryPage: BlitzPage = () => {
  return (
    <Flex bg="white" w="100vw">
      <Flex as="header" position="fixed" top={0} width="full" py={4} px={8}>
        <Box>
          <Link href="/diaries">
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
          <Suspense fallback={<div>Loading...</div>}>
            <Diary />
          </Suspense>
        </Box>
      </Box>
    </Flex>
  )
}

ShowDiaryPage.authenticate = false
ShowDiaryPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowDiaryPage
