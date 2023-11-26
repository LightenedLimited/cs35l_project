import { useState } from 'react'

export function Search() {
    const [subject, setSubject] = useState("");
    const [professor, setProfessor] = useState("")
    const [course, setCourse] = useState("")
    const [query, setQuery] = useState("")
    const [fall, setFall] = useState(false)
    const [winter, setWinter] = useState(false)
    const [spring, setSpring] = useState(false)
    const [summer, setSummer] = useState(false)
    const [hasSolution, setSolution] = useState(false)


    return (
        <>
            <h1>Search</h1>
            <h3>FILTERS: Subject, Professor, Course...</h3>
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
            </form>
            <form>
                <label>
                    <input
                        type='checkbox'
                        checked={fall}
                        onChange={(e) => setFall(e.target.checked)}
                    ></input>
                    Fall
                </label>
                <label>
                    <input
                        type='checkbox'
                        checked={winter}
                        onChange={(e) => setWinter(e.target.checked)}
                    ></input>
                    Winter
                </label>
                <label>
                    <input
                        type='checkbox'
                        checked={spring}
                        onChange={(e) => setSpring(e.target.checked)}
                    ></input>
                    Spring
                </label>
                <label>
                    <input
                        type='checkbox'
                        checked={summer}
                        onChange={(e) => setSummer(e.target.checked)}
                    ></input>
                    Summer
                </label>
            </form>
            <form>
                <label>
                    <input
                        type='checkbox'
                        checked={hasSolution}
                        onChange={(e) => setSolution(e.target.checked)}
                    ></input>
                    Only Tests with Solutions?
                </label>
            </form>
            <form>
                <button type="button" label="SEARCH" onClick={(e) => console.log(generateQuery(subject, professor, course, hasSolution))}/>
            </form>
        </>
        )
}

// for testing console output, eventually can be used to pass query to results
function generateQuery(subject, professor, course, hasSolution) {
    let temp = "";
    temp += subject;
    temp += ", ";
    temp += professor;
    temp += ", ";
    temp += course;
    if (hasSolution)
        temp += ", has solution"
    return temp;
}