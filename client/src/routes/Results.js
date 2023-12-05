import { useParams } from 'react-router-dom';

import { useState, useEffect } from 'react' 

import '../styles/Results.css'
import { globals } from '../globals'
import { DummyFetch } from '../functions/DummyFetch';
import { Document } from '../components/Documents';

export function Results() {
    const [data, setData] = useState(null) 
    const [loading, setLoading] = useState(false)
    let { query } = useParams()
    const decoded = decodeURI(query) // might need to put all this in useEffect
    let filter_body = parseUrl(decoded)
    // const encoded = encodeURI(JSON.stringify(body))

    console.log(filter_body); 

    DummyFetch()
    
    useEffect(() => {
        setLoading(true)
        fetch(`${globals.server_url}/pdfs/search`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                filter: {
                    filter_body
                }})
        }).then(res => res.json())
        .then(data =>{
            // sort by relevance feature
            const sorted = sortByDownloads(data)
            const documents = sorted.map(test => (<Document data={test} />))
            console.log(documents)
            setData(documents)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
        })

    }, [])

    return (
        <>
            <h1>Results</h1>
            <p className='status-box'>{loading ? 'Loading...' : ''}</p>
            <div className = 'doc-result'>{data}</div>
        </>
    )
}



function parseUrl(urlString){
    let formatted = urlString.slice(1)
    let args = formatted.split(':')
    // FORMAT FOR QUERIES:
    /* :[subject]:[class]:[professor]:[year]:[has solutions]:[test type]:[quarter] */
    const body = {
        subject: args[0],
        class: args[1],
        professor: args[2],
        year: args[3],
        has_solution: (args[4] === 'true') ? true : '',
        test_type: args[5],
        quarter: args[6],
    }
    for (const prop in body){
        if (body[prop] === '' || body[prop] === undefined){
            delete body[prop]
        }
    }
    return body
}

// sort tests by number of downloads in descending order
function sortByDownloads(data){
    return data.toSorted((a, b) => (b?.download_count ?? 0) - (a?.download_count ?? 0)) // weird question marks are for backwards compatibility. tests that dont have a download count are treated as having 0
    // order of a and b reversed because toSorted usually sorts ascending, but we want descending
}