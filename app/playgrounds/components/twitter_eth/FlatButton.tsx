import { Button } from "@chakra-ui/button"
import { ReactNode } from "react"

interface FlatButtonProps {
  children: ReactNode
  onClick?: () => void
}

export const FlatButton = ({ children, onClick }: FlatButtonProps) => (
  <Button
    border="0"
    backgroundColor="transparent"
    p="0"
    m="0"
    h="auto"
    display="inline"
    _hover={{ bg: "transparent" }}
    _focus={{ bg: "transparent" }}
    onClick={onClick}
  >
    {children}
  </Button>
)
