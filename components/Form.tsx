import Link from 'next/link'

import React, { useState, useEffect } from 'react'
import { 
    Stack, Box, Button, TextField, Slider, Typography
} from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'

const ButtonStack: 
    React.FC<{ children: React.ReactNode}> = ({ children }) => {
    return (
        <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
        >
            {children}
        </Stack>
    )
}

const Form: React.FC = () => {

    const [ index, setIndex ] = useState(0)
    const [ data, setData ] = useState({
        location: '',
        category: '',
        range: '5',
        price: '2'
    })
    const [ url, setUrl ] = useState('/search?')
 
    const handleInput = (category: string, e: any) => {
        // @ts-ignore
        setData(state => 
            ({...state, [category]: String(e.target.value)}))
    }
    
    useEffect(() => {
        setUrl(`/search?location=${data.location}&category=${data.category}&range=${data.range}&price=${data.price}`)
    }, [data])

    return (
        <Box minWidth="100%">

        <AnimatePresence>
        
        {index === 0 && 
        <motion.div
            key="location"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ display: 'none' }}
        >
        <Stack spacing={2}>
            <TextField
                value={data.location}
                variant="outlined"
                label="Where you at girl?"
                helperText="A zip code, city, or address will work"
                onChange={e => handleInput('location', e)}
            />
            <Button
                variant="contained"
                disabled={data.location === ''}
                onClick={() => setIndex(state => state + 1)}
            >
                {data.location === '' ? '. . .' : 'Sweet area code, babe'}
            </Button>
        </Stack>
        </motion.div>}

        {index === 1 && 
        <motion.div
            key="category"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ display: 'none' }}
        >
        <Stack spacing={2}>
            <TextField
                value={data.category}
                variant="outlined"
                label="What are you in the mood for?"
                helperText="Pho, boba, french fries, etc."
                onChange={e => handleInput('category', e)}
            />
            <ButtonStack>
                <Button
                    variant="outlined"
                    onClick={() => setIndex(state => state - 1)}
                >
                    Go back
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setIndex(state => state + 1)}
                >
                    {data.category === '' ? "I don't know" : 'Ooh, good choice!'}
                </Button>
            </ButtonStack>
        </Stack>
        </motion.div>}

        {index === 2 &&
        <Stack spacing={2}>
        <motion.div 
            key="range"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ display: 'none' }}
        >
            <Typography>How many miles are you willing to go?</Typography>
            <Slider
                defaultValue={5}
                valueLabelDisplay="auto"
                min={1}
                max={20}
                onChange={e => handleInput('range', e)}
            />
        </motion.div>
        <motion.div 
            key="price"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ display: 'none' }}
        >
            <Typography>{`What's the most you want to spend?`}</Typography>
            <Slider
                defaultValue={2}
                valueLabelDisplay="auto"
                valueLabelFormat={value => '$'.repeat(value)}
                step={1}
                min={1}
                max={4}
                marks
                onChange={e => handleInput('price', e)}
            />
        </motion.div>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ display: 'none' }}
        >
        <ButtonStack>
            <Button
                variant="outlined"
                onClick={() => setIndex(state => state - 1)}
            >
                Go back
            </Button>
            <Link href={url}>
                <Button variant="contained">
                    {Number(data.price) < 3 ? 'View results' : 'Damn okay she bougie'}
                </Button>
            </Link>
        </ButtonStack>
        </motion.div>
        </Stack>
        }

        </AnimatePresence>
        </Box>
    )
}

export default Form