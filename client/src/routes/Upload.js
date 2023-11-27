import '../styles/Upload.css'

import { Dropdown } from '../components/Dropdown';


export function Upload() {
    return (
        <>
        <h1>Upload a Test</h1>
        <form>
        <Dropdown loadOptions={() => getAndFormat(getSubjectList)} />
        <Dropdown loadOptions={() => getAndFormat(getClassList)} />
        <Dropdown loadOptions={() => getAndFormat(getProffessorList)} />
        <Dropdown loadOptions={() => getAndFormat(getYearList)} />
        <input type='file'></input>
        <button type='submit'>UPLOAD</button>
        </form>
        </>
    )
}

async function getAndFormat(getter /*, formatter */){
    let options = await getter()
    return formatOptionsArr(options) // if we want to reuse this function, we have to pass the formatting function as an arg instead of this
}

async function getClassList(){
    await delay(1000)
    return ['CS 35L', 'MATH 61', 'MATH 33A', 'MATH 32B', 'CS 33']
}

async function getProffessorList(){
    await delay(1000) // delete
    return ['Eggert', 'Smallberg', 'Gleizer', 'Mutlu', 'Professor guy'].sort()
}

async function getYearList(){
    await delay(1000) // delete
    return [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023].sort()
}

async function getSubjectList(){
    await delay(1000) // delete
    return ['LINGUISTICS', 'COMPUTER SCIENCE', 'POLITICAL SCIENCE', 'MATH', 'ART HISTORY', 'GEOGRAPHY'].sort()
}

function formatOptionsArr(options){
    let formatted = []
    for (const i of options){
        formatted.push({label: i, value: i.toLowerCase})
    }
    return formatted
}

// delete! for testing
function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}