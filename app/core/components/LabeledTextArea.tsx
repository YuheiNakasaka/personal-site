import {
  forwardRef,
  ComponentPropsWithoutRef,
  PropsWithoutRef,
  useContext,
  ChangeEvent,
} from "react"
import { useField, UseFieldConfig } from "react-final-form"

import { Textarea } from "@chakra-ui/react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { FormContext, FormContextType } from "app/diaries/context/FormContext"

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

export const LabeledTextArea = forwardRef<HTMLTextAreaElement, LabeledTextAreaProps>(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const context: FormContextType = useContext(FormContext)
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
            }}
          />
        </FormLabel>
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
