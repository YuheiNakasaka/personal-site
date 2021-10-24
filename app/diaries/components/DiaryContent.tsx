import { Box } from "@chakra-ui/react"
import ReactMarkdown from "react-markdown"
import SyntaxHighlightComponent from "./markdowns/SyntaxHighlight"
import TweetComponent from "./markdowns/TweetComponent"

type DiaryContentProps = {
  text: string
}

export const DiaryContent = (props: DiaryContentProps) => {
  return (
    <Box>
      <ReactMarkdown
        // eslint-disable-next-line react/no-children-prop
        children={props.text}
        components={{ ...TweetComponent(), code: SyntaxHighlightComponent }}
      />
      <style>{`
                h1 {
                  font-size: 2em;
                  font-weight: 700;
                  border-bottom: 1px solid #5c93bb2b;
                }
                h2 {
                  font-size: 1.75em;
                  font-weight: 700;
                }
                h3 {
                  font-size: 1.5em;
                  font-weight: 700;
                }
                h4 {
                  font-size: 1.25em;
                  font-weight: 700;
                }
                h5 {
                  font-size: 1em;
                  font-weight: 700;
                }
                p {
                  font-size: 1em;
                  margin-top: .3em;
                }
                a {
                  color: #0f83fd;
                }
                ul {
                  margin: .2em 0;
                  padding-left: 1.8rem
                }
                ul > li {
                  margin: .2rem 0;
                }
                div {
                  line-height: 1.7;
                }
                pre.not_language_specified {
                  color: white;
                  background: rgb(41, 42, 51);
                  text-shadow: black 0px -0.1em 0.2em;
                  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
                  font-size: 1em;
                  text-align: left;
                  white-space: pre;
                  word-spacing: normal;
                  word-break: normal;
                  overflow-wrap: normal;
                  line-height: 1.5;
                  tab-size: 4;
                  hyphens: none;
                  padding: 1em;
                  margin: 0.5em 0px;
                  overflow: auto;
                  border: 0px;
                  border-radius: 0.5em;
                  box-shadow: none;
                }
                .not_language_specified code {
                  color: white;
                  background: none;
                  text-shadow: black 0px -0.1em 0.2em;
                  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
                  font-size: 1em;
                  text-align: left;
                  white-space: pre;
                  word-spacing: normal;
                  word-break: normal;
                  overflow-wrap: normal;
                  line-height: 1.5;
                  tab-size: 4;
                  hyphens: none;
                }
              `}</style>
    </Box>
  )
}

export default DiaryContent
