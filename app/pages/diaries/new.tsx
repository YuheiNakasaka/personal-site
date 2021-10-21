import { useRouter, useMutation, BlitzPage, Routes } from "blitz"
import { Flex, Link, Box, IconButton } from "@chakra-ui/react"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import Layout from "app/core/layouts/Layout"
import createDiary from "app/diaries/mutations/createDiary"
import { CreateDiarySchema } from "app/pages/diaries/validations"
import { DiaryForm, FORM_ERROR } from "app/diaries/components/DiaryForm"

const NewDiaryPage: BlitzPage = () => {
  const router = useRouter()
  const [createDiaryMutation] = useMutation(createDiary)

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
          <DiaryForm
            submitText="作成"
            schema={CreateDiarySchema}
            initialValues={{ text: "" }}
            onSubmit={async (values) => {
              try {
                const diary = await createDiaryMutation(values)
                router.push(Routes.ShowDiaryPage({ diaryId: diary.id }))
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Box>
      </Box>
    </Flex>
  )
}

NewDiaryPage.authenticate = true
NewDiaryPage.getLayout = (page) => <Layout title={"Create New Diary"}>{page}</Layout>

export default NewDiaryPage
