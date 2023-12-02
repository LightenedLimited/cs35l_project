import { useNavigate } from 'react-router-dom'
import '../styles/Home_Button.css'

export function Home_Button(){
    const navigate = useNavigate()
    return (
        <div 
            class = 'home-button' 
            onClick= {() => navigate('/Landing')}>
            Login
        </div>
    )
}