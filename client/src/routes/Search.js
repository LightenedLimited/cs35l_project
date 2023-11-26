import { useState } from 'react'

export function Search() {
    const [subject, setSubject] = useState("");
    const [professor, setProfessor] = useState("")
    const [course, setCourse] = useState("")
    const [query, setQuery] = useState("")

    return (
        <>
            <h1>Search</h1>
            <h3>FILTERS: Quarter,...</h3>
            <form>
                <input
                    type='Subject'
                    placeholder='ex. Math'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                ></input>
                <input
                    type='Professor'
                    placeholder='ex. Eggert'
                    value={professor}
                    onChange={(e) => setProfessor(e.target.value)}
                ></input>
                <input
                    type='Course'
                    placeholder='ex. CS35L'
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                ></input>
                <button type="button" value="SEARCH" onClick={(e) => console.log(generateQuery(subject, professor, course))}/>
            </form>
        </>
        )
}

function generateQuery(subject, professor, course) {
    let temp = "";
    temp += subject;
    temp += ", ";
    temp += professor;
    temp += ", ";
    temp += course;
    return temp;
}