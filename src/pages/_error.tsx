import { NextPageContext } from 'next'
import NextError, { ErrorProps } from 'next/error'
import * as Sentry from '@sentry/node'

const CustomError = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err)
  }

  return <NextError statusCode={statusCode} />
}

type ExtErrorProps = ErrorProps & {
  hasGetInitialPropsRun: boolean
}

CustomError.getInitialProps = async (ctx: NextPageContext) => {
  const errorInitialProps = (await NextError.getInitialProps(
    ctx,
  )) as ExtErrorProps

  errorInitialProps.hasGetInitialPropsRun = true

  if (ctx.err) {
    Sentry.captureException(ctx.err)

    await Sentry.flush(2000)

    return errorInitialProps
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${ctx.asPath}`),
  )
  await Sentry.flush(2000)

  return errorInitialProps
}

export default CustomError
