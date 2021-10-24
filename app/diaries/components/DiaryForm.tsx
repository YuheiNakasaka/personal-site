import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextArea } from "app/core/components/LabeledTextArea"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function DiaryForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextArea name="text" label="" placeholder="今日は何があった？" />
    </Form>
  )
}

export default DiaryForm
