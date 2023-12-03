import { useNavigate } from 'react-router-dom'
import '../styles/HomeButton.css'

export function HomeButton(){
    const navigate = useNavigate()
    return (
        <div 
            class = 'home-button' 
            onClick= {() => navigate('/Landing')}>
            Login
        </div>
    )
}