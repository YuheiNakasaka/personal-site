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
    const isOwnSite = (href: string) => {
      return href.startsWith("https://razokulover.com/")
    }
    if (href && isTweet(href)) {
      if (children[0] === href) {
        const m = href.match(/status\/(\d+)?/)
        if (m && m[1]) {
          const tweetId = m[1]
          return <Tweet tweetId={tweetId} />
        }
      }
    } else if (href && isOwnSite(href)) {
      return <a href={href}>{children}</a>
    }

    return (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  },
})

export default TweetComponent
