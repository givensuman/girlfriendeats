import React from 'react'
import Error from '../components/Error'

const NotFound = () => {
    return (
        <Error 
            message={'Page not found!'}
            buttonMessage={`Let's go back home`}
        />
    )
}

export default NotFound