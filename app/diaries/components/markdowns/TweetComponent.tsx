import { Link } from "@chakra-ui/react"
import { Components } from "react-markdown/src/ast-to-react"
import { Tweet } from "react-twitter-widgets"

export const TweetComponent = (): Components => ({
  a: ({ children, href }) => {
    const getTweetStatus = (href: string) => {
      const { pathname } = new URL(href)
      const [, , , status] = pathname.split("/")
      return status
    }
    const isTweet = (href: string) => {
      return href.startsWith("https://twitter.com/") && getTweetStatus(href)
    }
    if (href && isTweet(href)) {
      if (children[0] === href) {
        const m = href.match(/status\/(\d+)?/)
        if (m && m[1]) {
          const tweetId = m[1]
          return <Tweet tweetId={tweetId} />
        }
      }
    }

    return <Link href={href}>{children}</Link>
  },
})

export default TweetComponent
