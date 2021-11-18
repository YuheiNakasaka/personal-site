import {
  ReactNode,
  forwardRef,
  ComponentPropsWithoutRef,
  PropsWithoutRef,
  useContext,
  ChangeEvent,
} from "react"
import {
  Form as FinalForm,
  FormProps as FinalFormProps,
  useField,
  UseFieldConfig,
} from "react-final-form"
import { Flex, Button, Input, Select } from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { validateZodSchema } from "blitz"
import { z } from "zod"
import { AssetSearchContext, AssetSearchContextType } from "../context/AssetSearchContext"

const FormSchema = z.object({
  text: z.string(),
})

export interface SearchFormProps extends ComponentPropsWithoutRef<typeof Input> {
  name: string
  label: string
  type?: "text" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  children?: ReactNode
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
}

function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const context: AssetSearchContextType = useContext(AssetSearchContext)
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(FormSchema)}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          <Flex>
            {submitError && (
              <div role="alert" style={{ color: "red" }}>
                {submitError}
              </div>
            )}
            {children}
            <Button type="submit" disabled={submitting} isLoading={context.isLoading}>
              <Search2Icon />
            </Button>
          </Flex>
        </form>
      )}
    />
  )
}

const SearchForm = forwardRef<HTMLInputElement, SearchFormProps>(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const context: AssetSearchContextType = useContext(AssetSearchContext)
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? (Number as any) : (v) => (v === "" ? null : v),
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <FormControl {...outerProps}>
        <FormLabel {...labelProps}>
          {label}
          <Flex>
            <Input
              {...input}
              disabled={submitting}
              {...props}
              ref={ref}
              value={context.text}
              style={{ backgroundColor: "white" }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                context.setText(e.target.value)
              }}
            />
            <Select
              flexBasis="100px"
              ml="12px"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                context.setChain(e.target.value)
              }}
            >
              <option defaultValue="eth">ETH</option>
              <option value="polygon">POLYGON</option>
            </Select>
          </Flex>
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

export function AssetSearchForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props} style={{ width: "100%" }}>
      <SearchForm name="text" label="" placeholder="0xabcdefghijklmnopq12345 or example.eth" />
    </Form>
  )
}

export default AssetSearchForm
