// root page with short desciption of project and links to access test bank and stuff
import '../styles/Landing.css'

function Body(){
    return (<>
        <h1>Bruin Test Bank</h1>
        <h3>what's up?</h3>
        <p>Short description, maybe a counter of how many pdfs we have currently?</p>
    </>)
}

export function Landing(){
    return (
        <>
            <Body />
        </>
    )
}