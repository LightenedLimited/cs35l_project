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
                        <td className={index < 3 ? 'top3Cell' && 'rankImage' : 'regularCell'}>{index + 1}</td>
                        <td className={index < 3 ? 'top3Cell' : 'regularCell'}>{entry["username"]}</td>
                        <td className={index < 3 ? 'top3Cell' : 'regularCell'}>{entry["uploads"]}</td>
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
            <h3>See our top contributors!</h3>
            <p className='status-box'>{loading ? 'Loading...' : ''}</p>
            <table class='boardTable'>
                <tr>
                    <th class='boardth'>Rank</th>
                    <th class='boardth'>Username</th>
                    <th class='boardth'>Uploads</th>
                </tr>
                {data}
            </table>
        </>
    )
}


