import { Link } from 'react-router-dom'
import '../styles/Landing.css';

export function NavBar(){
    return ( // need to make logo an actual logo img
        <nav class='nav-bar'>
            <img alt = 'logo-nav-bar' class='nav-logo' src={require("../styles/images/logo.png")}></img>
            <ul>
                <li><Link to='/'>BRUIN TEST BANK</Link></li>
            </ul>
            <div class = 'nav-bar-right'>
                <ul>
                    <li><Link to='/search'>Search</Link></li>
                    <li><Link to='/upload'>Upload</Link></li>
                    <li><Link to='mailto:leroylightning@g.ucla.edu'>Contact Us</Link></li>
                    <li><Link to='/login'>Log In</Link></li>
                    <li><Link to='/leaderboard'>Leaderboard</Link></li>
                </ul>
            </div>
        </nav>
    )
}