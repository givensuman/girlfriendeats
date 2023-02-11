import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import React, { useEffect, useState, useCallback } from 'react'
import { 
    Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Stack, Chip, Divider, Button
} from '@mui/material'
import { Star, StarHalf, StarOutline, Phone, Business, MonetizationOnOutlined } from '@mui/icons-material'
import Carousel from '../components/Carousel'
import Error from '../components/Error'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import elena from '../assets/elena.png'

interface YelpData {
    businesses?: [{
        id: string,
        categories: [{ alias: string, title: string }],
        display_phone: string,
        image_url: string,
        is_closed: boolean,
        location: { zip_code: string, display_address: string[] },
        name: string,
        price: string,
        rating: number,
        review_count: number,
        transactions: string[],
        url: string
    }] | [],
    region?: Object,
    error?: Object
}

const Info = styled(Typography)`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`

const Wrapper = styled.div`
    margin: auto auto;
    z-index: 2;
`

const spin = keyframes`
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
`

const Loading = styled.img`
    animation: ${spin} 1s ease infinite;
`

const Search = () => {
    const [ data, setData ] = useState<YelpData>({
        businesses: []
    })
    const [ loading, setLoading ] = useState(false)
    const [ ready, setReady ] = useState(false)

    const { query, isReady } = useRouter()

    const getData = useCallback(async () => {
        if (isReady) {
            const { location, category, range, price } = query
            setLoading(true)
            await fetch(`/api/yelp?location=${location}&category=${category}&range=${range}&price=${price}`)
                .then(res => res.json())
                .then((data: YelpData) => {
                    if (!data.error) {
                        setData(data)
                        setReady(true)
                    }
                    setLoading(false)
                })
        }
    }, [query])

    useEffect(() => { getData() }, [isReady])
    useEffect(() => console.log(data), [data])

    return (
    <Wrapper>
        <Head>
            <title>girlfriendpicks</title>
        </Head>

        {
            loading && <Loading src={elena.src} alt='elena' />
        }

        {
        (data.error || !data.businesses) ? 
            <Error message="Something went wrong" buttonMessage="Try starting over" /> :
        (ready && data.businesses && data.businesses.length < 1) &&
            <Error message="I couldn't find anything like that" buttonMessage="Try starting over"  />
        }

        {(data.businesses && data.businesses.length > 0) && 
        <Carousel>
        {data.businesses.map(item => 
                <Card key={item.id}>
                    <CardHeader 
                        title={item.name}
                        subheader={
                            <Stack 
                                direction="row"
                                alignItems="center"
                            >
                                {Array.from({ length: Math.floor(item.rating) }, (_, i) => <Star key={i} />)}
                                {Math.floor(item.rating) < item.rating && 
                                <StarHalf />}
                                {Array.from({ length: Math.floor(5 - item.rating) }, (_, i) => <StarOutline key={i} />)}
                                <Typography sx={{
                                    marginLeft: '0.5em'
                                }}>
                                    {`(${item.review_count})`}
                                </Typography>
                            </Stack>
                        }
                    />
                    <CardMedia
                        component="img"
                        image={item.image_url}
                        alt={item.name}
                        draggable={false}
                        sx={{
                            maxHeight: '30vh'
                        }}
                    />
                    <CardContent>
                        <Stack
                            direction="row"
                            flexWrap="wrap"
                        >
                            {item.categories && item.categories.map(category => 
                                <Chip
                                    key={category.alias}
                                    label={category.title}
                                    variant="outlined"
                                    sx={{
                                        margin: '0.125em'
                                    }}
                                />
                            )}
                        </Stack>

                        <Divider sx={{ margin: '1em 0' }} />

                        <Stack spacing={1} sx={{ marginTop: '1em' }}>
                            <Info>
                                <MonetizationOnOutlined sx={{
                                    marginRight: '0.25em',
                                }} /> {item.price}
                            </Info>
                            {item.display_phone.length > 0 && <Info>
                                <Phone sx={{
                                    marginRight: '0.25em',
                                }} /> {item.display_phone}
                            </Info>}
                            <Info>
                                <span>
                                    <Business sx={{
                                    marginRight: '0.25em',
                                    position: 'relative',
                                    top: '5px'
                                }} /> {item.location.display_address.join(', ')}
                                </span>
                            </Info>

                            <Stack
                                direction="row"
                                flexWrap="wrap"
                            >
                            <Chip 
                                label={item.is_closed ? 'Closed' : 'Open'}
                                color={item.is_closed ? 'warning' : 'primary'}
                                sx={{
                                    margin: '0.125em'
                                }}
                            />
                            {item.transactions.map((transaction, i) => 
                                <Chip
                                    key={i}
                                    label={(transaction[0].toUpperCase() + transaction.substring(1)).replace('_', ' ')}
                                    sx={{
                                        margin: '0.125em'
                                    }}
                                />
                            )}
                            </Stack>
                        </Stack>
                    </CardContent>
                    <CardActions sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1em'
                    }}>
                        <Link href='/'>
                            <Button variant="outlined">
                                Start over
                            </Button>
                        </Link>
                        <Button 
                            variant="contained"
                            onClick={() => {
                                window.open(item.url)
                            }}
                        >
                            This sounds good
                        </Button>
                    </CardActions>
                </Card>
        )}
        </Carousel>
        }
    </Wrapper>
    )
}

export default Search