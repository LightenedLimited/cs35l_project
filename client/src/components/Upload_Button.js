import { useNavigate } from 'react-router-dom'
import '../styles/Upload_Button.css'

export function Home_Button(){
    const navigate = useNavigate()
    return (
        <div 
            class = 'upload-button' 
            onClick= {() => navigate('/Upload')}>
            Login
        </div>
    )
}