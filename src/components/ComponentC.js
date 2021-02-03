import React from 'react'
import { useEffect } from 'react'

const ComponentC = (props) => {

    useEffect(() => {
        console.log(props);
    }, [])

    return (
        <div>
            COMPONENT C
        </div>
    )
}

export default ComponentC
