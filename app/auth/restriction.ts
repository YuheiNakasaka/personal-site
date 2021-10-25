export const isValidToken = (secret: string | string[] | undefined): boolean => {
  if (secret) {
    return secret === process.env.AUTH_PAGE_TOKEN
  }
  return false
}
