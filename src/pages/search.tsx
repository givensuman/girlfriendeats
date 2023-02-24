import { useEffect, useMemo, useRef, useState } from "react"

import { type NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"

import { api } from "../utils/api"

import { Box, CircularProgress } from "@mui/material"

import RestaurantCard, { SkeletonRestaurantCard } from "../components/RestaurantCard"
import Error from "../components/Error"

const useIsInViewport = (ref: any) => {
    const observerRef = useRef<IntersectionObserver | null>(null)

    const [ isIntersecting, setIsIntersecting ] = useState(false)

    useEffect(() => {
        observerRef.current = new IntersectionObserver(([ entry ]) => {
            if (entry) {
                setIsIntersecting(entry?.isIntersecting)
            }
        })
    }, [])

    useEffect(() => {
        if (ref.current) {
            observerRef.current && observerRef.current.observe(ref.current)
        }

        return () => {
            observerRef.current && observerRef.current.disconnect()
        }
    }, [ref.current, observerRef.current])

    return isIntersecting
}

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
        data, fetchNextPage, isFetching, isLoading, isError
    } = api.yelp.search.useInfiniteQuery({
        term: for_,
        radius: within,
        price: costing,
        ...location
    }, {
        enabled: paramsAreValid,
        getNextPageParam: (lastPage) => lastPage.nextCursor
    })

    const lastItemRef = useRef<any>()
    const isIntersecting = useIsInViewport(lastItemRef)

    useEffect(() => {
        if (isIntersecting && !isFetching) {
            fetchNextPage()
        }
    }, [isIntersecting])

    useEffect(() => {
        console.log(data)
    }, [data])


    if (isLoading) {
        return (
            <Box
                width="100vw"
                display="flex"
                justifyContent="center"
                pt={"30vh"}
            >
                <CircularProgress />
            </Box>
        )
    }

    if (isError || (data && data.pages[0]?.data.businesses.length === 0)) {
        return (
            <Error 
                alertTitle="You're too picky!"
                alertSubtitle="I couldn't find anything meeting those criteria. Try again with a different request."
                buttonLabel="Start Over"
                pageTitle="girlfriendeats"
            />
        )
    }

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
            flexGrow={1}
            px={4}
            sx={{
                scrollSnapPointsY: "repeat(345px)",
                scrollSnapType: "y mandatory"
            }}
        >
            {data && data.pages.flatMap((page, pageIndex) => (
                page.data.businesses.map(item => (
                    <RestaurantCard
                        key={`${item.id}.${pageIndex}`}
                        data={item}
                        sx={{
                            scrollSnapAlign: "start"
                        }}
                    />
                ))      
            ))}
            <div 
                style={{
                    height: 345
                }}
                ref={lastItemRef}
            >
                {isFetching && <SkeletonRestaurantCard />}
            </div>
        </Box>
    </>)
}

export default Search