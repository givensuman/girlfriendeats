import { type NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"

import { api } from "../utils/api"

import { Box } from "@mui/material"

import RestaurantCard from "../components/RestaurantCard"

const Search: NextPage = () => {
    
    const {
        for: for_, near, coords, costing, within
    } = useRouter().query as {
        for: string,
        near?: string,
        coords?: string,
        costing: string,
        within: string
    }

    const location = coords 
        ? {
            latitude: coords?.split(",")[0],
            longitude: coords?.split(",")[1],
            useCoords: true
        }
        : {
            location: near,
            useCoords: false
        } as const

    const paramsAreValid = !!(for_ && within && costing && (near || coords))

    const { 
        data, fetchNextPage
    } = api.yelp.search.useInfiniteQuery({
        term: for_,
        radius: within,
        price: costing,
        ...location
    }, {
        enabled: paramsAreValid,
        getNextPageParam: (lastPage) => lastPage.nextCursor
    })

    return (<>
        <Head>
            <title>
                {paramsAreValid && (coords 
                    ? `${for_} near you` 
                    : `${for_} near ${near}`
                )}
            </title>
        </Head>
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            px={4}
            sx={{
                scrollSnapPointsY: "repeat(345px)",
                scrollSnapType: "y mandatory"
            }}
        >
            {data && data.pages.flatMap(page => (
                page.data.businesses.map(item => (
                    <RestaurantCard
                        key={item.id}
                        data={item}
                        sx={{
                            scrollSnapAlign: "start"
                        }}
                    />
                ))
            ))}
        </Box>
    </>)
}

export default Search