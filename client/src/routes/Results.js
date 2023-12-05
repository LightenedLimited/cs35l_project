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
            console.log(data)
            const documents = data.map(test => (<Document data={test} />))
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


// const arrayDataItems = sampleTests.map(sampleTest =>
//     <h2>
//         <li>
//             {sampleTest.class}-
//             {sampleTest.test_type}-
//             {sampleTest.professor}-
//             {sampleTest["year"]["$numberInt"]}
//         </li>
//     </h2>
// )

// const sampleTests = [
//     { "_id": { "$oid": "656bbe6d791698df65b55265" }, "user_upload_id": { "$oid": "6567cb9ec32a5b72e3d24778" }, "path": "/Users/leroybettertongage/Desktop/cs35l/project/cs35l_project/server/uploads/1701559917776.pdf", "subject": "test-sub-1", "professor": "test-prof-1", "title": "test-title-1", "upload_date": { "$date": { "$numberLong": "1701559917792" } }, "class": "test-class-1", "quarter": "Fall", "year": { "$numberInt": "3005" }, "test_type": "Midterm", "has_solution": true, "users_notes": "test-note-1", "__v": { "$numberInt": "0" } },
//     { "_id": { "$oid": "656bbe71791698df65b55267" }, "user_upload_id": { "$oid": "6567cb9ec32a5b72e3d24778" }, "path": "/Users/leroybettertongage/Desktop/cs35l/project/cs35l_project/server/uploads/1701559921398.pdf", "subject": "test-sub-1", "professor": "test-prof-1", "title": "test-title-1", "upload_date": { "$date": { "$numberLong": "1701559921406" } }, "class": "test-class-1", "quarter": "Fall", "year": { "$numberInt": "3005" }, "test_type": "Midterm", "has_solution": true, "users_notes": "test-note-1", "__v": { "$numberInt": "0" } },
//     { "_id": { "$oid": "656bfd27cb0e01cfedf922b4" }, "user_upload_id": { "$oid": "656beab5cb0e01cfedf91f86" }, "path": "/Users/leroybettertongage/Desktop/cs35l/project/cs35l_project/server/uploads/1701575975096.pdf", "subject": "asd", "professor": "asdasd", "title": "idk what to do abt titles", "upload_date": { "$date": { "$numberLong": "1701575975105" } }, "class": "asdsad", "quarter": "Winter", "year": { "$numberInt": "2023" }, "test_type": "Practice Midterm", "has_solution": false, "users_notes": "", "__v": { "$numberInt": "0" } }
// ];