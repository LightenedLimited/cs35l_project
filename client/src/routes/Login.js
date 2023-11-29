import '../styles/Login.css'

// TODO: Store tokens in localstorage on successful login

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
// if it's in use, it sends your entry to the server and attemps to login
// if it's not in use, converts the page to a sign up page
    // then when the user fills out email, password, conf password, we can use that info to log in

// main logic:
// login state:
// user presses submit. if their email isnt in use, switch to a sign in state and do nothing
// else, check their email and password and attempt a login
// sign in state
// if email matches one already existing, switch to login state and do nothing
// else, attempt a sign up


export function Login({authenticated, setAuthenticated}){
    let [loginState, setLoginState] = useState(true) // true initially, false if email not found

    let [emailInput, setEmailInput] = useState('')
    let [pwInput, setPwInput] = useState('')
    let [confPwInput, setConfPwInput] = useState('')

    async function checkEmail(e){
        e.preventDefault()
        console.log(emailInput)

        // TODO: check that exists is actually bool when this route is implemented
        let res, data
        try {
            console.log('trying fetch')
            res = await fetch(`${globals.server_url}/users/validate/${encodeURI(emailInput)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            data = await res.json()
        } catch(err){ // handle if server refuses to connect
            console.log('fetch failed')
            console.log(err)
            setLoginState(loginState) // completely subjective, but loginState should be unaffected if server refuses to connect
            return loginState// the above also causes a re render which looks dumb, but also when the fuck is the server not gonna respond so whatever
            
        }
        console.log('fetch succeded')
        console.log(data)
        loginState = data?.emailInUse ?? false // if request times out bc db offline
        console.log(loginState)
        setLoginState(loginState)
        return loginState // change
    }

    async function handleSubmit(e){ // TODO: Make result.message visible to user
        console.log('trying to handle submit for event:' , e)
        let priorState = loginState
        await checkEmail(e)
        if (priorState != loginState){ // if we changed states
            return
        }
        if (loginState){
            let result = await attemptLogin(emailInput, pwInput)
            if (result.successful){
                authenticated = true
                setAuthenticated(authenticated)
                console.log(result.message)
                return loginState// should like redirect them to a dashboard or search or something?
            }
            // on failure
            console.log(result.message)
            return loginState
        }
        console.log('attempting sign up with:', pwInput, confPwInput)
        let result = await attempSignUp(emailInput, pwInput, confPwInput)
        if (result.successful){
            authenticated = true
            setAuthenticated(authenticated)
            console.log(result.message)
            return loginState
        }
        // failure
        console.log(result.message)
        return loginState
    }

    return (
        <>
            <h1>{loginState ? '*Login* / Sign Up' : 'Login / *Sign Up*'}</h1>
            <h3>DEBUG: {authenticated ? 'authenticated' : 'not authenticated'}</h3>
            <form>
                <input class="center-block" type='email' placeholder='email' onChange={e => setEmailInput(e.target.value)}></input>
                <input class="center-block" type='password' placeholder='password' onChange={e => setPwInput(e.target.value)}></input>
                <ConfPassword loginSt={loginState} confInp={confPwInput} setConfInp={setConfPwInput} />
                <SubmitBtn valid={handleSubmit} loginSt={loginState} setLoginSt={setLoginState}/>
                <p>If the specified account doesnt exist, you will be prompted to make one</p>
            </form>
        </>
    )
}

function SubmitBtn({valid, loginSt, setLoginSt} /* function */){
    return ( // doesnt change button value!
        <button class="center-block" onClick= { (e) => setLoginSt( valid(e) ) } > {loginSt ? 'LOGIN' : 'SIGN UP'} </button>
    )
}

function ConfPassword({loginSt, setConfInp, confInp}){
    if (!loginSt){
        return (
            <input type='password' placeholder='Confirm password' value={confInp} onChange={e => setConfInp(e.target.value)}></input>
        )
    }
}

// returns { sucessful: bool, message: string, }
async function attemptLogin(usernameInp, passwordInp){
    if (usernameInp.length == 0 || passwordInp.length == 0){
        return { successful: false, message: 'Please enter both username and password.'}
    }

    let resJson
    let response
    try {
        console.log('sending a request to server to check login creds')
        response = await fetch(`${globals.server_url}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: usernameInp,
                password: passwordInp,
            }),
        })
        console.log(response)
    } catch(err){
        console.log(err.message) /* i ~think~ this would catch errors caused when findOne fails, aka we can't find a email
        that matches the specfied one, so it should never be triggered because you can only attempt login with an existing email */
        return { successful: false, message: 'Email not found'}
    }
    console.log('response', response) // for testing
    if (response.ok){
        return { successful: true, message: 'Login successful'}
    }
    return { successful: false, message: 'Incorrect password'}
}

// returns { successful: bool, message: string }
async function attempSignUp(usernameInp, passwordInp, confPasswordInp){
    // validate proper email formatting?
    console.log(passwordInp, confPasswordInp)
    if (passwordInp !== confPasswordInp){
        return { successful: false, message: `Passwords don't match`}
    }
    let response, resJson
    try {
        console.log('outgoing creation request body:', {'username': usernameInp, 'password': passwordInp,})
        response = await fetch(`${globals.server_url}/users/create`, {
            method: 'POST',
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                'username': usernameInp,
                'password': passwordInp,
            })
        })
        console.log('creation response: ', response)
    } catch(err){
        console.log(err.message)
        return { successful: false, message: err.message}
    }
    if (response.ok){
        return { successful: true, message: 'User created'}
    }
    return { successful: false, message: 'User creation failed'}
}