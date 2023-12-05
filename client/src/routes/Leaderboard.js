import '../styles/Leaderboard.css'
import { globals } from '../globals'
import { useState, useEffect } from 'react'


export function Leaderboard() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`${globals.server_url}/users/listUsers`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
        }).then(res => res.json())
            .then(data => {
                const arrayed = Array.from(data)
                const sorted = arrayed.sort(function (a, b) { return b["uploads"] - a["uploads"] })
                //only showing top 10 entries (arbitrary, can be raised or lowered)
                const top10 = sorted.slice(0, 10)
                const entries = top10.map((entry, index) =>
                (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{entry["username"]}</td>
                        <td>{entry["uploads"]}</td>
                    </tr>
                ))
                setData(entries)
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
            <table>
                <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Uploads</th>
                </tr>
                {data}
            </table>
        </>
    )
}


