import {
  forwardRef,
  ComponentPropsWithoutRef,
  PropsWithoutRef,
  useContext,
  ChangeEvent,
  useState,
  useEffect,
} from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { Box, Textarea, Input } from "@chakra-ui/react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { FormContext, FormContextType } from "app/diaries/context/FormContext"
import Resizer from "react-image-file-resizer"

export interface LabeledTextAreaProps extends ComponentPropsWithoutRef<typeof Textarea> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

const onBackButtonEvent = (e) => {
  e.preventDefault()
  e.returnValue = "Do you want to go back ?"
  return e.returnValue
}

export const LabeledTextArea = forwardRef<HTMLTextAreaElement, LabeledTextAreaProps>(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const context: FormContextType = useContext(FormContext)
    const [cursorPos, setCursorPos] = useState(context.text.split("\n").length)
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === "number"
          ? (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === "" ? null : v),
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    useEffect(() => {
      window.addEventListener("beforeunload", onBackButtonEvent)
      return () => {
        window.removeEventListener("beforeunload", onBackButtonEvent)
      }
    }, [])

    return (
      <FormControl {...outerProps}>
        <FormLabel {...labelProps}>
          {label}
          <Textarea
            {...input}
            disabled={submitting}
            {...props}
            ref={ref}
            minH="lg"
            value={context.text}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              context.setText(e.target.value)
              setCursorPos(e.target.value.split("\n").length - 1)
            }}
          />
        </FormLabel>

        <div style={{ textAlign: "right" }}>
          <Box display="inline-block" marginRight="2">
            <Input
              type="file"
              onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                const data = new FormData()
                const files = e.target.files
                if (files !== null) {
                  const r = new XMLHttpRequest()
                  const f = files[0]!
                  Resizer.imageFileResizer(
                    f,
                    300,
                    300,
                    "JPEG",
                    100,
                    0,
                    (blob: Blob) => {
                      data.append("type", "file")
                      data.append("image", blob)
                      r.open("POST", "https://api.imgur.com/3/image")
                      r.setRequestHeader("Authorization", `Client-ID 8df2e11f2ef12d6`)
                      r.onreadystatechange = () => {
                        if (r.status === 200 && r.readyState === 4) {
                          let res = JSON.parse(r.responseText)
                          const url = `https://i.imgur.com/${res.data.id}.png`
                          const texts = context.text.split("\n")
                          texts.splice(cursorPos, 0, `![](${url})`)
                          context.setText(texts.join("\n"))
                        }
                      }
                      r.send(data)
                    },
                    "blob"
                  )
                }
              }}
            />
          </Box>
        </div>

        {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}
      </FormControl>
    )
  }
)

export default LabeledTextArea
