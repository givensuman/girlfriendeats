import React, { useState } from 'react'
import { 
    Card, 
    CardMedia, 
    CardContent, 
    Typography ,
    Chip,
    Box,
    Stack,
    Button
} from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import StarIcon from '@mui/icons-material/Star'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { useNavigate } from 'react-router-dom'
import LazyLoad from 'react-lazyload'

import lazyload from '../assets/lazyload.png'

const _Card = ({ data, animate }) => {

    const [buttonSelect, setButtonSelect] = useState(false)
    const navigate = useNavigate()

    return (
        <>
        <Card sx={{ position: 'relative' }}>
            <LazyLoad
            placeholder={<img src={lazyload} alt='Loading...' />}
            height={200}
            >
                <CardMedia 
                component='img'
                height='200'
                image={data.image_url}
                alt={data.name}
                sx={{
                    userDrag: 'none',
                    userSelect: 'none'
                }}
                />
            </LazyLoad>
            <CardContent sx={{ minHeight: 'fit-content' }}>
                <Typography variant='h5'>
                    {data.name}
                </Typography>
                <Box direction='row' sx={{ marginBottom: '0.5em' }}>
                    {data.categories.map((item, index) => 
                            <Chip
                            size='small'
                            variant='outlined'
                            label={item.title}
                            key={index}
                            sx={{
                                margin: '0.2em 0.2em 0.2em 0'
                            }}
                            />
                        )}
                </Box>
                <Stack>
                    <Stack spacing={1}>
                        <Box alignItems='center' justifyContent='center' >
                            <PhoneIcon fontSize='small' sx={{ marginRight: '0.2em'}} />
                            {data.display_phone}
                        </Box>
                        <Box alignItems='center' justifyContent='center'>
                            <LocationOnIcon fontSize='small' sx={{ marginRight: '0.2em'}} />
                            {data.location.display_address.join(', ')}
                        </Box>
                        <Stack
                        alignItems='center'
                        direction='row'
                        >
                        {Array.from({ length: data.rating }, (_, i) => <StarIcon key={i} />)}
                        {`(${data.review_count})`}
                        </Stack>
                    </Stack>
                </Stack>
                <Button 
                sx={{ width: '100%', marginTop: '1em' }}
                onClick={() => {
                    animate()
                    setButtonSelect(true)
                    setTimeout(() => {
                        window.open(data.url, '_blank')
                        setButtonSelect(false)
                    }, 1500)
                }}
                >
                    {!buttonSelect ? 
                    <>
                        Pick this one 
                        <ExitToAppIcon sx={{ marginLeft: '0.2em' }}/>
                    </> : 
                    'Yay! Redirecting you...'}
                </Button>
            </CardContent>
        </Card>
        {/* This button needs to be re-rendered with each card, as cards that are abnormal in height overflow from the carousel in a way I can't change and break the page */}
        <Button 
        variant='contained' 
        sx={{ 
            marginTop: '3em',
            width: '100%',
            maxWidth: '300px'
         }}
        onClick={() => navigate('/')}
        >
            Start Over
        </Button>
        </>
    )
}

export default _Card