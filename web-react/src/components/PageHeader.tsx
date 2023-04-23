import { useNavigate, } from "react-router-dom";
import "../../src/css_styles/navbar.css";
import "../../src/css_styles/page.css";
import { useContext } from "react";
import { AccountContext } from "../utils/contexts/AccountContext";

const Branding = () => (
    <div className="navbar-branding">
        <h4 className="navbar-brandname" />Dunder Mifflin Paper<h1 />
    </div>
)

const NavigationLinks = () => {
    const navigate = useNavigate();
    return (
        <ul className="nav-links">
            <li className="navbar-item" onClick={() => navigate("/")}>
                Home
            </li>
    
            <li className="navbar-item" onClick={() => navigate("/dashboard")}>
                Dashboard
            </li>
    
            <li className="navbar-item" onClick={() => navigate("/about")}>
                About
            </li>
    
            <li className="navbar-item" onClick={() => navigate("/contact")}>
                Contact
            </li>
            <div className="navbar-item nav-button is-light">Support Server</div>
            <LogoutButton />
        </ul>
    );
};

const AuthLinks = () => {
    const navigate = useNavigate();
  
    return (
        <ul className="nav-links">
            <li className="navbar-item">
                <div className="navbar-item nav-button is-light" onClick={() => navigate('/login')}>
                    Login
                </div>
            </li>
            <li className="navbar-item">
                <div className="navbar-item nav-button is-light" onClick={() => navigate('/signup')}>
                    Sign Up
                </div>
            </li>
            <li className="navbar-item">
                <div className="navbar-item nav-button is-light" onClick={() => navigate('/home')}>
                    Support Server
                </div>
            </li>
        </ul>
    );
};

const LogoutButton = () => {
    const navigate = useNavigate();
    const { updateAccount } = useContext(AccountContext);

    const handleLogout = () => {
        updateAccount(undefined); // Clear the account context
        navigate("/"); // Redirect to the homepage
    };

    return (
        <li className="navbar-item">
            <div className="navbar-item nav-button is-light" onClick={handleLogout}>
                Logout
            </div>
        </li>
    );
};
   

const PageHeader = () => {  
    const { account } = useContext(AccountContext);
    return (
        <nav className="navbar-mount">
            <Branding />
            <div className="navbar-menu">
                {account ? <NavigationLinks /> : <AuthLinks />}
            </div>
        </nav>
    );
};
  
export default PageHeader;      