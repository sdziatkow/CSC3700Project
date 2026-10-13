import {useState, useEffect} from 'react';

/**
 * @param url The url in which the data can be accessed.
 * @return An object consisting of: The data, pending flag, and error (null if none occurred).
 */
function useFetch(url) {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(resp => {
                if (!resp.ok) {
                    let msg = `HTTP Error: ${resp.statusText}`
                    console.log(msg);
                    throw new Error(msg);
                }
                return resp.json();
            })
            .then(dat => {
                setData(dat);
                setIsPending(false);
                setError(null);
            })
            .catch(e => {
                console.log(e.message);
                setError(e);
                setIsPending(false);
            })
    }, [url])
    return {data, isPending, error};
}
export default useFetch;