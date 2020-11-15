import Error from 'next/error'

function Custom404() {
  return <Error statusCode={404} />
}

export default Custom404
