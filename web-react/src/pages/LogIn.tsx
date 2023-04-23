import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../src/css_styles/page.css";
import "../../src/css_styles/loginform.css";
import PageHeader from "../components/PageHeader";
import { useFindAccount } from "../utils/hooks/accounts/useAccountExist";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AccountContext } from "../utils/contexts/AccountContext";

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const { updateAccount } = useContext(AccountContext);
    
    let { account, loading: accountExistLoading, error: accountExistError, findAccount } = useFindAccount();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const account = await findAccount(formData.username);
            // await checkAccountExist(formData.username);
            if (account) {
                // Account exists, check for password and redirect to dashboard
                if (account.password === formData.password) {
                    updateAccount(account); // Update the account context
                    navigate("/dashboard");
                } else {
                    // alert("Wrong password");
                    toast.error("Wrong password");
                }
    
            } else {
                // Account does not exist, show error message
                // alert("No account with username " + formData.username);
                toast.error(`No account with username ${formData.username}`);
            }
        } catch (error) {
            // console.error(error);
            // alert("An error occurred. Please try again later.\n\n" + error);
            toast.error(`An error occurred. Please try again later.\n\n${error}`);
        }
    };

    return (
        <div>
            <PageHeader />
            <div className="full-page">
                <div className="main-container">
                    <div className="welcome-wrapper">
                        <div style={{ fontWeight: "700", color: "whitesmoke" }}>
                            Welcome to Dunder Mifflin!
                        </div>
                    </div>

                    <form className="login-form" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button type="submit">Login</button>

                        <div className="signup-wrapper">
                            <div style={{ fontWeight: "700", color: "black" }}>
                                Don't have an account?
                            </div>
                            <div>
                                <Link to="/signup" className="signup-link">Create Account</Link>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;
