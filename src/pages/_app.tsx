import 'styles/globals.css'
import { init } from 'lib/sentry'

init()

function App({ Component, pageProps, err }) {
  return <Component {...pageProps} err={err} />
}

export default App
