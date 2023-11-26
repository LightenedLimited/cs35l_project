import { useState } from 'react'

export function Search() {
    const [subject, setSubject] = useState("");
    const [professor, setProfessor] = useState("")
    const [query, setQuery] = useState("")

    return (
        <>
            <h1>Search</h1>
            <h3>FILTERS: Quarter,...</h3>
            <form>
                <input
                    type='Professor'
                    placeholder='ex. Eggert'
                    value={professor}
                    onChange={(e) => setProfessor(e.target.value)}
                ></input>
                <input
                    type='Subject'
                    placeholder='ex. Math'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                ></input>
                <button type="button" onClick={(e) => setQuery(generateQuery(subject, professor))} value="SEARCH"/>
            </form>
        </>
        )
}

function generateQuery(subject, professor) {
    let temp = "";
    temp += professor;
    temp += ", ";
    temp += subject;
    return temp;
}