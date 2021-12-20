import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ConfettiGenerator from 'confetti-js'

import Loading from '../components/Loading'
import Carousel from '../components/ResultCarousel'
import Card from '../components/ResultCard'
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
            let data = await axios.post('/api', params)
            setData(data.data)
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
            {!data.businesses.length > 0 ? <Loading /> :
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