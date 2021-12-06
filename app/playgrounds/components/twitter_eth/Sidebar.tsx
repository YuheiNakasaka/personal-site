import { Link } from "blitz"
import { Flex, Text, Icon } from "@chakra-ui/react"
import { RiHome7Line, RiHome7Fill } from "react-icons/ri"
import { BsPerson, BsPersonFill, BsTwitter } from "react-icons/bs"
import { FlatButton } from "app/playgrounds/components/twitter_eth/FlatButton"

export const HeaderTabType = {
  Home: "home",
  Profile: "profile",
}

interface SideBarProps {
  account: string
  type: string
}

export const SideBar = ({ account, type }: SideBarProps) => {
  return (
    <Flex
      flexBasis={{
        base: "100%",
        xl: "20ch",
      }}
      flexGrow={1}
      flexDir={{
        base: "row",
        xl: "column",
      }}
      borderX={{
        base: "1px solid #eee",
        xl: "0",
      }}
      borderBottom={{
        base: "1px solid #eee",
        xl: "0",
      }}
    >
      <Flex
        p={{
          base: "1.1rem 1rem 1rem 1rem",
          xl: "1rem",
        }}
      >
        <Link href={`/playgrounds/twitter_eth`}>
          <FlatButton>
            <Icon as={BsTwitter} mr="1rem" fontSize="2rem" fontWeight="bold" color="#1DA1F2" />
          </FlatButton>
        </Link>
      </Flex>
      <Link href={`/playgrounds/twitter_eth`}>
        <Flex
          p={{
            base: "1rem",
            xl: "1rem",
          }}
        >
          <Icon
            as={type == HeaderTabType.Home ? RiHome7Fill : RiHome7Line}
            mr="1rem"
            fontSize="2rem"
          />
          <FlatButton>
            <Text
              fontSize="1.4rem"
              fontWeight={type == HeaderTabType.Home ? "bold" : "normal"}
              display={{
                base: "none",
                xl: "block",
              }}
            >
              Home
            </Text>
          </FlatButton>
        </Flex>
      </Link>
      <Link href={`/playgrounds/twitter_eth/${account}`}>
        <Flex
          p={{
            base: "1rem",
            xl: "0 1rem 1rem 1rem",
          }}
        >
          <Icon
            as={type == HeaderTabType.Profile ? BsPersonFill : BsPerson}
            mr="1rem"
            fontSize="2rem"
          />
          <FlatButton>
            <Text
              fontSize="1.4rem"
              fontWeight={type == HeaderTabType.Profile ? "bold" : "normal"}
              display={{
                base: "none",
                xl: "block",
              }}
            >
              Profile
            </Text>
          </FlatButton>
        </Flex>
      </Link>
    </Flex>
  )
}
