import React from "react"

import Error from "../components/Error"

export const _Error = () => {
    return (
        <Error 
            alertTitle="You're too picky!"
            alertSubtitle="I couldn't find anything meeting those criteria. Try again with a different request."
            buttonLabel="Start Over"
        />
    )
}

export default _Error