import { useNavigate } from "react-router-dom"
import { globals } from '../globals'

// returns true if user logged in, false otherwise
export async function DummyFetch(){
    const navigate = useNavigate()
    try {
        const res = await modifiedGetUniqueList('class')
        console.log(res.status)
        if (res.status === 401){
            console.log('res not good')
            navigate('/login')
            return
        }
    } catch(err){
        return false
    }

}

/* takes a string, e.g. class, professor, year, and returns the unique entries across all tests corresponding to that filter */
async function modifiedGetUniqueList(filter){
    console.log(`trying to get ${filter} list`)
    let res
    try{
        res = await fetch(`${globals.server_url}/pdfs/unique/${filter}`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify({
                filer: {},
            })
        })
        return res
    } catch (err){
        return [`Error fetching ${filter}(s)`]
    }
}