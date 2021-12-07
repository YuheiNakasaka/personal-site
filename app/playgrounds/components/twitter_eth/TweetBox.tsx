import { Link } from "blitz"
import { Flex, Box, Text } from "@chakra-ui/react"
import { FlatButton } from "app/playgrounds/components/twitter_eth/FlatButton"
import { Tweet } from "app/playgrounds/models/twitter_eth/tweet"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

export const HeaderTabType = {
  Home: "home",
  Profile: "profile",
}

interface TweetBoxProps {
  tweet: Tweet
}

export const TweetBox = ({ tweet }: TweetBoxProps) => {
  return (
    <Box
      key={tweet.timestamp}
      w={{
        base: "100vw",
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "100%",
      }}
      borderBottom="1px solid #eee"
    >
      <Box p="1rem">
        <Flex mb="0.2rem">
          <Link href={`/playgrounds/twitter_eth/${tweet.author}`}>
            <FlatButton>
              <Text fontSize="0.9rem" fontWeight="bold" isTruncated>
                {tweet.author}
              </Text>
            </FlatButton>
          </Link>
          <Text fontSize="0.9rem" ml="0.5rem" color="rgb(83, 100, 113)">
            {dayjs(tweet.timestamp).fromNow()}
          </Text>
        </Flex>
        <Text fontSize="1rem">{tweet.content}</Text>
      </Box>
    </Box>
  )
}
