import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ConfettiGenerator from 'confetti-js'

import Loading from '../components/Loading'
import Carousel from '../components/ResultCarousel'
import Card from '../components/ResultCard'
import Error from '../components/Error'
import Wrapper from '../components/Wrapper'

const Results = () => {

    const [params, setParams] = useState({
        zip: '',
        cat: '',
        dist: '',
        price: ''
    })
    const [data, setData] = useState({
        businesses: []
    })
    const [loading, setLoading] = useState(false)

    const animate = () => {
        const confettiSettings = { 
            target: 'confetti',
            size: 3,
            clock: 50
        }
        const confetti = new ConfettiGenerator(confettiSettings)
        confetti.render()
        setTimeout(() => confetti.clear(), 1500)
    }

    useEffect(() => {
        const getQuery = () => new URLSearchParams(window.location.search)
        Object.keys(params).map(item => {
            let shallow = params
            shallow[item] = String(getQuery().get(item))
            setParams(shallow)
            return null
        })

        const getData = async () => {
            setLoading(true)
            let res = await axios.post('/api', params)
            res.status === 200 ? setData(res.data) : setData('error')
            console.log(res)
            setLoading(false)
        }
        getData()
    }, [params])

    return (
        <Wrapper>
            <canvas 
            id='confetti'
            style={{
                position: 'absolute',
                top: '0',
                maxWidth: '100%'
            }}
            ></canvas>
            {/* Brace yourself for ternaries, different use-cases provided... really weird display errors when unaccounted for */}
            {loading ? <Loading /> :
            data === 'error' ? 
            <Error 
            heading={"Something went wrong with the app!"}
            subheading={"Try again later!"}
            /> :
            !data.businesses.length > 0 ? 
            <Error 
            heading={"I couldn't find anything matching that!"}
            subheading={"Try making your search less specific."}
            /> :
            data.businesses.length === 1 ?
            <Card
            data={data.businesses[0]}
            animate={animate}
            /> :
            <Carousel>
                {data.businesses.map(item =>
                        <Card
                        data={item} 
                        key={item.id} 
                        animate={animate}
                        />
                    )}
            </Carousel>
            }
        </Wrapper>
    )
}

export default Results