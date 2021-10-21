import { useContext, useState } from "react"
import { useRouter, useMutation, BlitzPage, Routes } from "blitz"
import { Flex, Link, Box, IconButton, Spacer, Button } from "@chakra-ui/react"
import { ChevronLeftIcon, ViewIcon, EditIcon } from "@chakra-ui/icons"
import Layout from "app/core/layouts/Layout"
import createDiary from "app/diaries/mutations/createDiary"
import { CreateDiarySchema } from "app/pages/diaries/validations"
import { DiaryForm, FORM_ERROR } from "app/diaries/components/DiaryForm"
import { FormContextProvider, FormContext, FormContextType } from "app/diaries/context/FormContext"
import { DiaryContent } from "app/diaries/components/DiaryContent"

const DiaryMain = () => {
  const router = useRouter()
  const context: FormContextType = useContext(FormContext)
  const [createDiaryMutation] = useMutation(createDiary)
  const [isPreview, setPreview] = useState(false)

  const showPreview = async () => {
    setPreview(!isPreview)
  }

  return (
    <Flex bg="white" w="100vw">
      <Flex as="header" position="fixed" top={0} width="full" py={4} px={8}>
        <Box>
          <Link href="/diaries">
            <IconButton aria-label="back" color="black" rounded="full" icon={<ChevronLeftIcon />} />
          </Link>
        </Box>
        <Spacer />
        <Box>
          {!isPreview && (
            <Button variant="ghost" onClick={showPreview}>
              <ViewIcon mr="0.5rem" /> プレビュー
            </Button>
          )}
          {isPreview && (
            <Button variant="ghost" onClick={showPreview}>
              <EditIcon mr="0.5rem" /> 編集画面
            </Button>
          )}
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
          {!isPreview && (
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
          )}
          {isPreview && context.text != "" && <DiaryContent text={context.text} />}
        </Box>
      </Box>
    </Flex>
  )
}

const NewDiaryPage: BlitzPage = () => {
  return (
    <FormContextProvider>
      <DiaryMain />
    </FormContextProvider>
  )
}

NewDiaryPage.authenticate = true
NewDiaryPage.getLayout = (page) => <Layout title={"Create New Diary"}>{page}</Layout>

export default NewDiaryPage
