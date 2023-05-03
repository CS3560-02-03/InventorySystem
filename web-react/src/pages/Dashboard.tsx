import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../utils/contexts/AccountContext";
import PageHeader from "../components/PageHeader";
import '../../src/css_styles/page.css';
import '../../src/css_styles/dashboard.css';
import { FaBox, FaClipboardList } from "react-icons/fa";

const DashboardModule = ({
    icon,
    moduleName,
    description,
    navigateTo
}: {
    icon: any;
    moduleName: string;
    description: string;
    navigateTo: string;
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/modules/${navigateTo}`);
    };

    return (
        <div className="dashboard-module" onClick={handleClick}>
            <div className="module-icon">
                {icon}
            </div>
            <h3 className="module-name">{moduleName}</h3>
            <p className="module-description">{description}</p>
        </div>
    );
};

const DashboardPage = () => {
    const { account } = useContext(AccountContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!account) {
            navigate("/login");
        }
    }, [account]);

    return (
        <div>
            <PageHeader />
            <div className="dashboard-container">
                <DashboardModule
                    icon={<FaBox />}
                    moduleName="Categories"
                    description="Manage product categories."
                    navigateTo="categories"
                />
                <DashboardModule
                    icon={<FaClipboardList />}
                    moduleName="Products"
                    description="View and manage products"
                    navigateTo="products"
                />
                <DashboardModule
                    icon={<FaClipboardList />}
                    moduleName="Orders"
                    description="View and manage orders from customers."
                    navigateTo="orders"
                />
                                
                {/* Add more modules as needed */}
            </div>
        </div>
    );
};

export default DashboardPage;
