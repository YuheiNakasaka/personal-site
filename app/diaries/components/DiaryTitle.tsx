import { Text } from "@chakra-ui/react"

interface DiaryTitleProps {
  date: Date
  fontSize?: string
}

export const DiaryTitle = ({ date, fontSize = "2xl" }: DiaryTitleProps) => {
  return <Text fontSize={fontSize}>■ {date.toDateString()}</Text>
}

export default DiaryTitle
