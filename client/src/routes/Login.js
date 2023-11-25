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
// login stores state of all forms
// when you click submit, it checks the value of the email form to see whether that email is in use

export function Login(){
    let [loginState, setLoginState] = useState(true) // true initially, false if email not found

    let [emailInput, setEmailInput] = useState('')
    let [pwInput, setPwInput] = useState('')
    let [confPwInput, setConfPwInput] = useState('')

    /* async */ function checkEmail(e){
        e.preventDefault()
        console.log(emailInput)
        const url = globals.sever_url

        // TODO: check that exists is actually bool when this route is implemented
        const res = /* await */ fetch(`${url}/users/validate`, {
            method: 'PUT',
            body: {
                email: emailInput,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
        loginState = false // change when routing gets set up
        setLoginState(loginState)
        return false // change
    }

    return (
        <>
            <h1>Login/Signup</h1>
            <form>
                <input type='email' placeholder='email' onChange={e => setEmailInput(e.target.value)}></input>
                <input type='password' placeholder='password' onChange={e => setPwInput(e.target.value)}></input>
                <ConfPassword loginSt={loginState} setConfInp={setConfPwInput} />
                <SubmitBtn valid={checkEmail} loginSt={loginState} setLoginSt={setLoginState}/>
                <p>If the specified account doesnt exist, you will be prompted to make one</p>
            </form>
        </>
    )
}

function SubmitBtn({valid, loginSt, setLoginSt} /* function */){
    return ( // doesnt change button value!
        <button onClick= { (e) => setLoginSt( valid(e) ) } > {loginSt ? 'LOGIN' : 'SIGN UP'} </button>
    )
}

function ConfPassword({loginSt, setConfInp}){
    if (!loginSt){
        return (
            <input type='password' placeholder='Confirm password' onChange={e => setConfInp(e.target.value)}></input>
        )
    }
}