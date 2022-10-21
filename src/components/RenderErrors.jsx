import React from 'react'


const RenderErrors = ({errors}) => {
    const fields = errors.response.data
    let arrErrors = []
    for (let key in fields) {
        let message = ''
        fields[key].map(error => message += ' ' + error)
        arrErrors.push(`${key} - ${message}`)
    }
    return (
        <>{arrErrors.map((error, index) => 
            <p key={index}>{error}</p>    
        )}</>
    )
}


export default RenderErrors