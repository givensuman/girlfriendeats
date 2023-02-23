import React from "react"

import Error from "../components/Error"

export const _Error = () => {
    return (
        <Error 
            alertTitle="Something broke..."
            alertSubtitle="Something went wrong behind the scenes."
            buttonLabel="Start Over"
        />
    )
}

export default _Error