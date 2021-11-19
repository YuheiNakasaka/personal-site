import { Suspense, useContext, useEffect, useState } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import { Flex, Box, IconButton, Spacer, Button } from "@chakra-ui/react"
import { ChevronLeftIcon, EditIcon, ViewIcon } from "@chakra-ui/icons"
import Layout from "app/core/layouts/Layout"
import getDiary from "app/diaries/queries/getDiary"
import updateDiary from "app/diaries/mutations/updateDiary"
import { DiaryForm, FORM_ERROR } from "app/diaries/components/DiaryForm"
import { FormContext, FormContextProvider, FormContextType } from "app/diaries/context/FormContext"
import { DiaryContent } from "app/diaries/components/DiaryContent"
import { UpdateDiarySchema } from "app/diaries/validations/diaryForm"

const DiaryMain = () => {
  const router = useRouter()
  const { text, setText }: FormContextType = useContext(FormContext)
  const [isPreview, setPreview] = useState(false)
  const diaryId = useParam("diaryId", "number")
  const [updateDiaryMutation] = useMutation(updateDiary)
  const [diary, { setQueryData }] = useQuery(
    getDiary,
    { id: diaryId },
    {
      staleTime: Infinity,
    }
  )

  const showPreview = async () => {
    setPreview(!isPreview)
  }

  useEffect(() => {
    setText(diary.text)
  }, [setText, diary])

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
              submitText="更新する"
              initialValues={{ id: diaryId, text: text }}
              schema={UpdateDiarySchema}
              onSubmit={async (values) => {
                try {
                  const updated = await updateDiaryMutation({
                    ...values,
                    id: diary.id,
                    text: text,
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
          )}
          {isPreview && text != "" && <DiaryContent text={text} />}
        </Box>
      </Box>
    </Flex>
  )
}

const EditDiaryPage: BlitzPage = () => {
  return (
    <FormContextProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <DiaryMain />
      </Suspense>
    </FormContextProvider>
  )
}

EditDiaryPage.authenticate = { redirectTo: "/" }
EditDiaryPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditDiaryPage
