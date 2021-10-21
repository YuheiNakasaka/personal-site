import * as React from "react"

export interface FormContextType {
  text: string
  setText: (t: string) => void
}

export const FormContext = React.createContext<FormContextType>({
  text: "",
  setText: (text: string) => {},
})

export const FormContextProvider: React.FC = ({ children }) => {
  const context: FormContextType = React.useContext(FormContext)
  const [text, setText] = React.useState(context.text)
  const newContext: FormContextType = {
    text,
    setText,
  }
  return <FormContext.Provider value={newContext}>{children}</FormContext.Provider>
}
