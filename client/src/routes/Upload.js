import '../styles/Upload.css'
// we should limit the file size
import { globals } from '../globals'

import { useState } from 'react'
import Select from 'react-select';

import { Dropdown } from '../components/Dropdown';
import { DummyFetch } from '../functions/DummyFetch';


export function Upload() {
    const [file, setFile] = useState(null)
    const [subject, setSubject] = useState('')
    const [className, setClassName] = useState('')
    const [professor, setProfessor] = useState('')
    const [year, setYear] = useState('')
    const [testType, setTestType] = useState('')
    const [quarter, setQuarter] = useState('')
    const [solutions, setSolutions] = useState(false)
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')

    DummyFetch()
    
    function handleFileChange(event) {
        setFile(event.target.files[0])
    }

    async function handleSubmit(event){
        event.preventDefault()
        // format options

        // checking if strings contain non alphanumeric charactesr
        if (!isAlphaNumeric(subject.label)) {
            setError('Please do not use special characters in the subject')
            return
        }
        if (!isAlphaNumeric(className.label)) {
            setError('Please do not use special characters in the class name')
            return
        }
        if (!isAlphaNumeric(professor.label)) {
            setError('Please do not use special characters in the professor\'s name')
            return
        }
        
        

        const states = {
            file: file,
            subject: subject,
            className: className,
            professor: professor,
            year: year,
            testType: testType,
            quarter: quarter,
            solutions: solutions,
            description: description,
        }

        for (const prop in states){
            if (prop === 'solutions'){
                continue
            }
            if (!states[prop]){
                console.log('1+ thingies not set')
                setError('Please fill out all forms before submitting')
                return
            }
        }
        setError('')

        console.assert(typeof(solutions) == Boolean)
        const formData = new FormData()
        // gonna follow order of postman here
        console.log(subject)
        console.log(quarter)
        console.log(testType)
        formData.append('subject', subject?.value ?? 'NONE SPECIFIED')
        formData.append('title', 'idk what to do abt titles')
        formData.append('class', className?.value ?? 'NONE SPECIFIED')
        formData.append('quarter', quarter?.label ?? 'Spring')
        formData.append('test_type', testType?.label ?? 'NONE SPECIFIED')
        formData.append('has_solution', solutions)
        formData.append('users_notes', description)
        formData.append('professor', professor?.value ?? 'NONE SPECIFIED')
        formData.append('year', year?.value ?? '2023')
        formData.append('pdf', file)
        console.log('file: ', file)
        let res
        try {
            res = fetch(`${globals.server_url}/pdfs/upload`, {
                mode: 'cors',
                credentials: 'include',
                // headers: {'content-type': 'multipart/form-data'}, header is auto generated, DO NOT INCLUDE THIS!!
                method: 'POST',
                body: formData,
            }
            )
        } catch(err){
            console.log(err)
        }
    }

    return (
        <>
        <h1>Upload a Test</h1>
        <form className = 'upload-form' onSubmit={(e) => {handleSubmit(e)} }>
            {/* subjects */}
            <label className='upload-label' for='subject'>Subject</label>
            <Dropdown name='subject' loadOptions={() => getAndFormat(() => getUniqueList('subject'))} onChange={(newValue) => {setSubject(newValue)}} />
            {/* class */}
            <label className='upload-label' for='class'>Class</label>
            <Dropdown loadOptions={() => getAndFormat(() => getUniqueList('class'))} onChange={(newValue) => setClassName(newValue)} />
            {/* professors */}
            <label className='upload-label' for='professor'>Professor</label>
            <Dropdown name='professor' loadOptions={() => getAndFormat(() => getUniqueList('professor'))} onChange={(newValue) => setProfessor(newValue)} />
            {/* years */}
            <label className='upload-label' for='year'>Year</label>
            <Dropdown name='year' loadOptions={() => getAndFormat(() => getUniqueList('year'))} onChange={(newValue) => setYear(newValue)} />
            {/* test types */}
            <label className='upload-label' for='test-type'>Test type</label>
            <Select name='test-type' value={testType}  options={formatOptionsArr(testTypeList)} onChange={(newValue) => setTestType(newValue)}/>
            {/* quarters */}
            <label className='upload-label' for='quarter'>Quarter</label>
            <Select name='quarter' value={quarter} options={formatOptionsArr(quartersList)} onChange={(newValue) => {setQuarter(newValue)}}/>
            {/* solutions */}
            <div className = 'solutions-checkbox'>
                <input className='has-solutions' type='checkbox' onChange={(event)=> {setSolutions(event.target.checked)}} />
                <label className='upload-label' for='has-solutions'>Test contains solutions</label>
            </div>
            {/* add file */}
            <div className='file-input'>
                <label className='upload-label' for='user-description'>Description/notes (optional) (max 300 chars)</label>
                <input className= 'upload-input' type='text' maxLength={300} onChange={(newValue) => setDescription(newValue)} />
            </div>
            <input type='file' onChange={handleFileChange}/>
            <p className='error-board'>{error}</p>
            <button className = 'submit-button' type='submit'>Upload</button>
        </form>
        </>
    )
}

function isLetterOrDigit(c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c === ' '
}

function isAlphaNumeric(s) {
    console.log(s)
    for (var i = 0; i < s.length; i++) {
        if (!isLetterOrDigit(s.charAt(i)))
            return false
    }
    return true
}

async function getAndFormat(getter /*, formatter */){
    try{
        let options = await getter()
        console.log(options)
        return formatOptionsArr(options) // if we want to reuse this function, we have to pass the formatting function as an arg instead of this
    }
    catch (err){
        console.log(err)
    }
}

/* takes a string, e.g. class, professor, year, and returns the unique entries across all tests corresponding to that filter */
async function getUniqueList(filter){
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
        let data = await res.json()
        console.log(data)
        return data
    } catch (err){
        console.log(err)
        return [`Error fetching ${filter}(s)`]
    }
}

const testTypeList = ["Quiz", "Midterm", "Final", "Practice Quiz", "Practice Midterm", "Practice Final"]
const quartersList = ["Fall", "Winter", "Spring", "Summer"]

// const solutionsList = ['Solutions']
// solutions should be a checkbox

function formatOptionsArr(options){
    let formatted = []
    for (const i of options) {
        if (typeof(i) == String)
            formatted.push({ label: i, value: i.toLowerCase() })
        else
            formatted.push({ label: i, value: i })
    }
    return formatted
}

/* takes a string and makes it into an option */
function handleCreate(label){

    /* TODO: add validatation to option string */
    return {label, value: label.toLowerCase().replace(/\W/g, '')}
}