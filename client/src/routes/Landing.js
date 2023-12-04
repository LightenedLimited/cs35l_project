// root page with short desciption of project and links to access test bank and stuff
import '../styles/Landing.css'
import { useNavigate } from 'react-router-dom'

function Body(){
    const navigate = useNavigate()
    return (<>
    <div>
        <img 
        alt = 'logo for landing page'
        class='img-logo center-block'
        src={require("../styles/images/logo.png")}
        />
        <h1 class='landing-page-h1'>Bruin Test Bank</h1>
        <h2 class='landing-page-heading'>200 Practice Exams, 100 classes, 20 Subjects</h2>
        <h3 class='landing-page-heading'>Created by students. For students</h3>
        <div class='center-content'> 
            <div 
                class = 'landing-button' 
                onClick= {() => navigate('/login')}>
                LOGIN
            </div>
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