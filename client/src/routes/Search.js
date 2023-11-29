import { useState } from 'react'
import '../styles/Search.css'

export function Search() {
    //input boxes
    const [subject, setSubject] = useState("");
    const [professor, setProfessor] = useState("")
    const [course, setCourse] = useState("")
    //quarters
    const [fall, setFall] = useState(false)
    const [winter, setWinter] = useState(false)
    const [spring, setSpring] = useState(false)
    const [summer, setSummer] = useState(false)
    //has solution
    const [hasSolution, setSolution] = useState(false)
    //test types
    const [midterm, setMidterm] = useState(false)
    const [quiz, setQuiz] = useState(false)
    const [final, setFinal] = useState(false)
    const [practiceFinal, setPracticeFinal] = useState(false)
    const [practiceMidterm, setPracticeMidterm] = useState(false)
    const [practiceQuiz, setPracticeQuiz] = useState(false)

    const [query, setQuery] = useState("")


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
                <CheckBox state={fall} setState={setFall} label='Fall'></CheckBox>
                <CheckBox state={winter} setState={setWinter} label='Winter'></CheckBox>
                <CheckBox state={spring} setState={setSpring} label='Spring'></CheckBox>
                <CheckBox state={summer} setState={setSummer} label='Summer'></CheckBox>
            </form>
            <form>
                <CheckBox state={hasSolution} setState={setSolution} label='Only Tests with Solutions?'></CheckBox>
            </form>
            <form>
                <CheckBox state={practiceMidterm} setState={setPracticeMidterm} label='Practice Midterm'></CheckBox>
                <CheckBox state={practiceFinal} setState={setPracticeFinal} label='Practice Final'></CheckBox>
                <CheckBox state={final} setState={setFinal} label='Final'></CheckBox>
                <CheckBox state={quiz} setState={setQuiz} label='Quiz'></CheckBox>
                <CheckBox state={midterm} setState={setMidterm} label='Midterm'></CheckBox>
                <CheckBox state={practiceQuiz} setState={setPracticeQuiz} label='Practice Quiz'></CheckBox>
            </form>
            <form>
                <button type="button" label="SEARCH" onClick={(e) => console.log(generateQuery(subject, professor, course, fall))}/>
            </form>
        </>
        )
}

function CheckBox({ state, setState, label }) {
    return (
        <>
            <label>
                <input
                    type='checkbox'
                    checked={state}
                    onChange={(e) => setState(e.target.checked)}
                ></input>
                {label}
            </label>
        </>
    )
}

// for testing console output, eventually can be used to pass query to results
function generateQuery(subject, professor, course, fall) {
    let temp = "";
    temp += subject;
    temp += ", ";
    temp += professor;
    temp += ", ";
    temp += course;
    if (fall)
        temp += ", Fall"
    return temp;
}