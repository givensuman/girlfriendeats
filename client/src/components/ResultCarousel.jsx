import React from 'react'
import MUICarousel from 'react-material-ui-carousel'
import styled from '@emotion/styled'

const Carousel = styled(MUICarousel)`
    padding: 0 4em;
    min-height: fit-content;
`

const _Carousel = ({children}) => {
    return (
        <div style={{ position: 'relative' }}>
            <Carousel
            autoPlay={false}
            navButtonsAlwaysVisible={true}
            indicatorIconButtonProps={{
                style: {
                    opacity: '0',
                    userSelect: 'none'
                }
            }}    
            navButtonsProps={{
                style: {
                    border: 'solid 2px #9c27b0',
                    color: '#9c27b0',
                    backgroundColor: 'white'
                }
            }}
            >
                {children}
            </Carousel>
        </div>
    )
}

export default _Carousel