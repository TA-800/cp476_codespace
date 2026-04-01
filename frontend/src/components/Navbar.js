import { Link } from "react-router-dom";
import "./Navbar.css";

/*navbar links to homepage*/
function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/">Home</Link>
        </nav>
    );
}

export default Navbar;
