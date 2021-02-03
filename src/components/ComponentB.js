import React from 'react'
import { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const ComponentB = () => {
    useEffect(() => {
        console.log('ComponentB');
    }, [])

    const redirect = true;

    return (
        <div>
            {redirect ? <Redirect to="/A" /> : ComponentB}
        </div>
    )
}

export default ComponentB
