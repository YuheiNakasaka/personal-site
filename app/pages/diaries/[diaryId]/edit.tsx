import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import { Flex, Box, IconButton } from "@chakra-ui/react"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import Layout from "app/core/layouts/Layout"
import getDiary from "app/diaries/queries/getDiary"
import updateDiary from "app/diaries/mutations/updateDiary"
import { DiaryForm, FORM_ERROR } from "app/diaries/components/DiaryForm"

export const EditDiary = () => {
  const router = useRouter()
  const diaryId = useParam("diaryId", "number")
  const [diary, { setQueryData }] = useQuery(
    getDiary,
    { id: diaryId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateDiaryMutation] = useMutation(updateDiary)

  return (
    <>
      <Head>
        <title>Edit Diary {diary.id}</title>
      </Head>

      <div>
        <DiaryForm
          submitText="更新する"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateDiary}
          initialValues={diary}
          onSubmit={async (values) => {
            try {
              const updated = await updateDiaryMutation({
                id: diary.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowDiaryPage({ diaryId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditDiaryPage: BlitzPage = () => {
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
          <Suspense fallback={<div>Loading...</div>}>
            <EditDiary />
          </Suspense>
        </Box>
      </Box>
    </Flex>
  )
}

EditDiaryPage.authenticate = true
EditDiaryPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditDiaryPage
