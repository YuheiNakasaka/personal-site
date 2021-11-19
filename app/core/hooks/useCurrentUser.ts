import { useQuery } from "blitz"
import getCurrentUser from "app/core/queries/getCurrentUser"

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null)
  return user
}
