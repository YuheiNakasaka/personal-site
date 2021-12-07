import {
  AppProps,
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  useRouter,
} from "blitz"

import { ChakraProvider } from "@chakra-ui/react"
import Home from "."
import * as gtag from "app/core/utils/gtag"
import { useEffect } from "react"
import nprogress from "nprogress"
import "nprogress/nprogress.css"

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.25 })

export default function App({ Component, pageProps }: AppProps) {
  if (process.browser) {
    nprogress.start()
  }

  const getLayout = Component.getLayout || ((page) => page)

  const router = useRouter()
  useEffect(() => {
    router.events.on("routeChangeComplete", (url) => {
      console.log(url)
      nprogress.done()
      gtag.pageView(url)
    })
    nprogress.done()

    return () => {
      router.events.off("routeChangeComplete", (url) => {
        gtag.pageView(url)
      })
    }
  }, [router.events])

  return (
    <ChakraProvider>
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        onReset={useQueryErrorResetBoundary().reset}
      >
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
    </ChakraProvider>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <Home />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
