import Head from "next/head"

const HeadSEO = ({title, description, }) => {
  return (
    <Head>
        <title>{title ? title : 'Gonje'}</title>
        <meta name="description" content={description ? description : "Food products ecommerce."} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
  </Head>
  )
}

export default HeadSEO