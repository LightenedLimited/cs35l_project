import { Link } from 'react-router-dom'

export function NavBar(){
    return ( // need to make logo an actual logo img
        <nav>
            <ul>
                <li><Link to='/'>(LOGO) BRUIN TEST BANK</Link></li>
                <li><Link to='/upload'>Upload</Link></li>
                <li><Link to='mailto:leroylightning@g.ucla.edu'>Contact Us</Link></li>
                <li><Link to='/login'>Log In</Link></li>
            </ul>
        </nav>
    )
}