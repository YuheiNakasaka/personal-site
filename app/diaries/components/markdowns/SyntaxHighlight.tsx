import { CodeComponent, ReactMarkdownNames } from "react-markdown/src/ast-to-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism"

export const SyntaxHighlightComponent: CodeComponent | ReactMarkdownNames = ({
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || "")
  return !inline && match ? (
    /* @ts-ignore */
    <SyntaxHighlighter
      style={dark}
      language={match[1]}
      {...props}
      // eslint-disable-next-line react/no-children-prop
      children={String(children).replace(/\n$/, "")}
      customStyle={{ background: "#292a33", border: "0", "box-shadow": "none" }}
    />
  ) : (
    <pre className="not_language_specified">
      <code {...props}>{children}</code>
    </pre>
  )
}

export default SyntaxHighlightComponent
