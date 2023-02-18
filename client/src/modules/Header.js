import { Link } from "react-router-dom";
import './Header.css';

const Header = () => {
    return (
        <header className='header'>

            <div className='nav-part'>
                <Link className="home-nav" to="/">Home</Link>
                <Link className="home-nav" to="/all">All</Link>
            </div>

            <div className='title-part'>Travelopia</div>
        </header>
    )
}

export default Header 