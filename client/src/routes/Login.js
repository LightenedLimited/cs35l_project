// idea here: the login/sign up page initially just has username and password forms, but if user enters
// an email not found in the existing records, then the ui switches to a 'sign up' vibe

// the two main ways i imagine this happening would be, when a user enters their email and clicks 
// out of that inpt box, we either:
// * immediately query db for email matching this one
// * wait until the user preses 'login/sign up' to check

// while the first might seem cleaner, it also might be slower, but I'm down to test out either
// FOR NOW, I'm gonna have the email checked when the user presses submit button -- easiest to impleent
import { useState } from 'react'
import { globals } from '../globals'


export function Login(){
    let [emailInput, setEmailInput] = useState('')
    let [pwInput, setPwInput] = useState('')

    return (
        <>
            <h1>Login/Signup</h1>
            <form>
                <input type='email' placeholder='email' onChange={e => setEmailInput(e.target.value)}></input>
                <input type='password' placeholder='password' onChange={e => setPwInput(e.target.value)}></input>
                <SubmitBtn email_input={emailInput}/>
            </form>
        </>
    )
}

function SubmitBtn(email_input){
    let [loginState, setLoginState] = useState(true) // true initially, false if email not found

    async function checkEmail(e){
        e.preventDefault()
        console.log(e)
        console.log(email_input)
        const url = globals.sever_url

        // TODO: check that exists is actually bool when this route is implemented
        const exists = await fetch(`${url}/users/validate`, {
            method: 'PUT',
            body: {
                email: email_input,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
        setLoginState(exists)
    }

    return (
        <button onClick={checkEmail}>{loginState ? 'LOGIN' : 'SIGN UP'}</button>
    )
}