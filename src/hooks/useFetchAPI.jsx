import { useEffect, useState } from "react"

function useFetchAPI(url, method, header){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [result, setResult] = useState(null)

    useEffect(() => {
        async function requestFetch(){
            try{
                setLoading(true)
                setError(false)
                const response = await fetch(url, {
                    method: method || "GET",
                    headers: header,
                })
                const data = await response.json()
                setResult(data)
                setLoading(false)
            }catch(err){
                console.log(err);
                setLoading(false)
                setError(true)
            }
        }

        requestFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        loading,
        error,
        result
    }
}

export default useFetchAPI