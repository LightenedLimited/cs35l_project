import '../styles/Upload.css'
// we should limit the file size
import { globals } from '../globals'

import { useState } from 'react'
import Select from 'react-select';

import { Dropdown } from '../components/Dropdown';


export function Upload() {
    const [file, setFile] = useState(null)
    function handleFileChange(event) {
        setFile(event.target.files[0])
    }
    return (
        <>
        <h1>Upload a Test</h1>
        <form onSubmit={(e) => {handleSubmit(e, file)}}>
            {/* subjects */}
            <label for='subject'>Subject</label>
            <Dropdown name='subject' loadOptions={() => getAndFormat(getSubjectList)} />
            {/* class */}
            <label for='class'>Class</label>
            <Dropdown loadOptions={() => getAndFormat(getClassList)} />
            {/* professors */}
            <label for='professor'>Professor</label>
            <Dropdown name='professor' loadOptions={() => getAndFormat(getProffessorList)} />
            {/* years */}
            <label for='year'>Year</label>
            <Dropdown name='year' loadOptions={() => getAndFormat(getYearList)} />
            {/* test types */}
            <label for='test-type'>Test type</label>
            <Select name='test-type' options={formatOptionsArr(testTypeList)} />
            {/* quarters */}
            <label for='quarter'>Quarter</label>
            <Select name='quarter' options={formatOptionsArr(quartersList)} />
            {/* solutions */}
            <label for='has-solutions'>Test contains solutions</label>
            <input name='has-solutions' type='checkbox' />
            {/* add file */}
            <input type='file' onChange={handleFileChange}/>
            <button type='submit'>Upload</button>
        </form>
        </>
    )
}

async function handleSubmit(event, file){
    event.preventDefault()
    if (false){ // gonna leave the fetching out until i figure out how tf this works
        const formData = new FormData()
        formData.append('file', file)
        formData.append('filename', file.name)
        console.log('file', file)
        console.log('filename', file.name)
        console.log(formData)

        let res
        try {
            res = fetch(`${globals.server_url}/pdfs/upload`, {
                credentials: 'include',
                headers: {'content-type': 'multipart/form-data'},
                method: 'POST',
                body: formData,
            }
            )
            console.log(res.data)
        } catch(err){
            console.log(err)
        }
    }
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

const testTypeList = ['Midterm', 'Final', 'Practice Midterm', 'Practice Final', 'Quiz', 'Other']
const quartersList = ['Fall', 'Winter', 'Spring', 'Summer Sessions']

// const solutionsList = ['Solutions']
// solutions should be a checkbox

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