import React from 'react';
import { useEffect } from 'react'

const ComponentA = (props) => {
    const { history } = props;
    useEffect(() => {
        console.log(props);
    })

    const user = {name: 'Solid Snake', occupation: 'Soldier'}

    return (
        <div>
            {user && user.name? 'Snake Here' : 'Shadow Moses!!!'}
        </div>
    )
}

export default ComponentA
