import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/css_styles/page.css";
import "../../src/css_styles/loginform.css";
import PageHeader from "../components/PageHeader";
import { useFindAccount } from "../utils/hooks/accounts/useAccountExist";
import { useCreateAccount } from "../utils/hooks/accounts/useCreateAccount";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AccountContext } from "../utils/contexts/AccountContext";
import { AccountDetails } from "../../../api/dist/utils/types";

const SignupPage = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const { updateAccount } = useContext(AccountContext);

    let { findAccount } = useFindAccount();

    let { account, loading: createAccountLoading, error: createAccountError, createNewAccount } = useCreateAccount();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const existingAccount = await findAccount(formData.username);
            if (existingAccount) {
                toast.error("Username already exists. Please choose a different username.");
                return;
            }
            let newAccount: AccountDetails = {
                username: formData.username,
                password: formData.password
            };
            await createNewAccount(newAccount);
    
            toast.success("Account created successfully");
            updateAccount(newAccount); // Update the account context with the new account
            navigate("/dashboard"); // Redirect to the homepage after successful signup
        } catch (error) {
            console.error(error);
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
                            Create an account
                        </div>
                    </div>

                    <form className="login-form" onSubmit={handleSignup}>
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

                        <button type="submit">Create Account</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
