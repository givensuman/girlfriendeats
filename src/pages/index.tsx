import { type NextPage } from "next"
import Head from "next/head"

import { Box } from "@mui/material"

import Form from "../components/Form"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>girlfriend eats</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Form />
      </Box>
    </>
  )
}

export default Home
