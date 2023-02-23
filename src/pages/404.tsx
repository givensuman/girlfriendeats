import React from "react"

import Error from "../components/Error"

export const PageNotFound = () => {
    return (
        <Error 
            alertTitle="I'm getting mixed messages!"
            alertSubtitle="I'm not sure what page you're looking for."
            buttonLabel="Go Home"
        />
    )
}

export default PageNotFound