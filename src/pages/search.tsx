import { type NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"

import { api } from "../utils/api"
import { Box } from "@mui/material"

const Search: NextPage = () => {
    
    const {
        for: for_, near, costing, within
    } = useRouter().query as {
        for: string,
        near: string,
        costing: string,
        within: string
    }

    const { 
        data, fetchNextPage
    } = api.yelp.search.useInfiniteQuery({
        term: for_,
        radius: within,
        price: costing,
        location: near,
        useCoords: false
    }, {
        enabled: !!(for_ && within && costing && near),
        getNextPageParam: (lastPage) => lastPage.nextCursor
    })

    console.log(data?.pages.flatMap(page => page))

    return (<>
        <Head>
            <title>{for_} in {near}</title>
        </Head>
        <Box>
            {data && data.pages.flatMap(page => (
                page.data.businesses.map(item => (
                    <h1 key={item.id}>{item.name}</h1>
                ))
            ))}
        </Box>
    </>)
}

export default Search