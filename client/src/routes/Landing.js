// root page with short desciption of project and links to access test bank and stuff
import '../styles/Landing.css'
import { useNavigate } from 'react-router-dom'

function Body(){
    const navigate = useNavigate()
    return (<>
    <div class = 'landing-container'>
        <img 
        alt = 'logo for landing page'
        class="img-logo" 
        src={require("../styles/images/logo.png")}
        />
        <h1>Bruin Test Bank</h1>
        <h2>200 Practice Exams, 100 classes, 20 Subjects</h2>
        <h3>Created by students. For students</h3>
        <div 
            class = 'login-button' 
            onClick= {() => navigate('/login')}>
            Login
        </div>
    </div>
  
    </>)
}


export function Landing(){
    return (
        <>
            <Body />
        </>
    )
}