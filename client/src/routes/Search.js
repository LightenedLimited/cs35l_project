import { useState } from 'react'
import '../styles/Search.css'
import { Dropdown } from '../components/Dropdown.js'

export function Search() {
    //input boxes
    const [documentType, setDocumentType] = useState("")
    const [subject, setSubject] = useState("")
    const [professor, setProfessor] = useState("")
    const [course, setCourse] = useState("")
    const [year, setYear] = useState("")

    const [query, setQuery] = useState("")


    return (
        <>
            <h1>Search</h1>
            <h3>What are you looking for today?</h3>
            <form>
                <label for='documentType'>I WANT TO FIND</label>
                <Dropdown name='documentType' loadOptions={() => getAndFormat(getDocumentTypeList)} onChange={(e) => setDocumentType(e.value)} />
                <label for='subject'>FOR SUBJECT</label>
                <Dropdown name='subject' loadOptions={() => getAndFormat(getSubjectList)} onChange={(e) => setSubject(e.value)} />
                <label for='class'>BY COURSE</label>
                <Dropdown name='class' loadOptions={() => getAndFormat(getClassList)} onChange={(e) => setCourse(e.value)} />
                <label for='professor'>BY PROFESSOR</label>
                <Dropdown name='professor' loadOptions={() => getAndFormat(getProffessorList)} onChange={(e) => setProfessor(e.value)} />
                <label for='year'>FROM YEAR</label>
                <Dropdown name='year' loadOptions={() => getAndFormat(getYearList)} onChange={(e) => setYear(e.value)} />
            </form>
            <form>
                <label for='search'>SEARCH</label>
                <button type="button" label="SEARCH" onClick={(e) => console.log(generateQuery(subject, professor, course))}/>
            </form>
        </>
        )
}

/* THIS FUNCTION MAY BE NEEDED IF WE WANT TO USE CHECKS INSTEAD OF DROP DOWNS
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
*/

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

async function getDocumentTypeList() {
    await delay(1000)
    return ['Practice Midterm', 'Practice Final', 'Final', 'Quiz', 'Midterm', 'Practice Quiz']
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