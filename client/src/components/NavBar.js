import { NavLink } from 'react-router-dom';
import '../styles/Landing.css';

export function NavBar(){
    return ( 
        <nav class='nav-bar'>
            <ul>
                <div class='nav-logo'>
                    <img alt = 'logo-nav-bar' class='nav-img' src={require("../styles/images/logo.png")}></img>
                    <li><NavLink to='/' className='nav-link'>BRUIN TEST BANK</NavLink></li>
                </div>
                <li><NavLink to='/search'className='nav-link'>Search</NavLink></li>
                <li><NavLink to='/upload' className='nav-link'>Upload</NavLink></li>
                <li><NavLink to='mailto:leroylightning@g.ucla.edu' className='nav-link'>Contact Us</NavLink></li>
                <li><NavLink to='/login' className='nav-link'>Log In</NavLink></li>
                <li><NavLink to='/leaderboard' className='nav-link'>Leaderboard</NavLink></li>
            </ul>
        </nav>
    )
}