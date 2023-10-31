import { type NextPage } from "next"


import RestaurantCard from "../components/RestaurantCard"

const Home: NextPage = () => {
  return (
    <>
      {/* <Head>
        <title>girlfriendeats</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Form />
      </Box> */}
      <RestaurantCard data={{} as any} />
    </>
  )
}

export default Home
