import React from 'react'

import Error from '../components/Error'

const NotFound = () => {
    return (
        <Error 
        heading={"I'm getting mixed messages!"}
        subheading={"That, or the page you've requested doesn't exist..."}
        />
    )
}

export default NotFound