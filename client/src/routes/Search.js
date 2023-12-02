import { useState } from 'react'
import '../styles/Search.css'
import { Dropdown } from '../components/Dropdown.js'

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
                <label for='subject'>Subject</label>
                <Dropdown name='subject' loadOptions={() => getAndFormat(getSubjectList)} onChange={(e) => setSubject(e.value)} />
                <label for='class'>Class</label>
                <Dropdown name='class' loadOptions={() => getAndFormat(getClassList)} onChange={(e) => setCourse(e.value)} />
                <label for='professor'>Professor</label>
                <Dropdown name='professor' loadOptions={() => getAndFormat(getProffessorList)} onChange={(e) => setProfessor(e.value)} />
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
                <button type="button" label="SEARCH" onClick={(e) => console.log(generateQuery(subject, professor, course))}/>
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
function generateQuery(subject, professor, course) {
    let temp = "";
    temp += subject;
    temp += ", ";
    temp += professor;
    temp += ", ";
    temp += course;
    return temp;
}

//testing functions to eventually be replaced with data we pull from server
async function getAndFormat(getter /*, formatter */) {
    let options = await getter()
    return formatOptionsArr(options) // if we want to reuse this function, we have to pass the formatting function as an arg instead of this
}

async function getClassList() {
    await delay(1000)
    return ['CS 35L', 'MATH 61', 'MATH 33A', 'MATH 32B', 'CS 33']
}

async function getProffessorList() {
    await delay(1000) // delete
    return ['Eggert', 'Smallberg', 'Gleizer', 'Mutlu', 'Professor guy'].sort()
}

async function getYearList() {
    await delay(1000) // delete
    return [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023].sort()
}

async function getSubjectList() {
    await delay(1000) // delete
    return ['LINGUISTICS', 'COMPUTER SCIENCE', 'POLITICAL SCIENCE', 'MATH', 'ART HISTORY', 'GEOGRAPHY'].sort()
}

function formatOptionsArr(options) {
    let formatted = []
    for (const i of options) {
        formatted.push({ label: i, value: i.toLowerCase() })
    }
    return formatted
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

//end of testing functions