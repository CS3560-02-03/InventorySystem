import React from 'react';
import '../../src/css_styles/page.css';
import PageHeader from "../components/PageHeader";

const HomePage = () => {
    return (
        <div>
            <PageHeader />
            <div className="full-page">
                <div className="main-container">
                    <div className="welcome-wrapper">
                        <h1>Hello and Welcome!</h1>
                        
                    </div>
                    <p>
                        Dunder Mifflin offers a variety of products and services to help you accomplish your goals. 
                        Feel free to explore and make use of the resources available to you.
                    </p>
                    <p>
                        If you have any questions or concerns, please do not hesitate to contact our support team.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
