import React, { useState } from 'react';


export const useFetch = (callback) => {
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState(false)

    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (e) {
            console.log(e)
            setErrors(e)
        } finally {
            setIsLoading(false)
        }
    }

    // const fetching = async () => {
    //     try {
    //         setIsLoading(true)
    //         setTimeout(async () => {
    //             await callback()
    //             setIsLoading(false)
    //         }, 500)
    //     } catch (e) {
    //         setErrors(e.response.data)
    //     }
    // }

    return [fetching, isLoading, errors]
}