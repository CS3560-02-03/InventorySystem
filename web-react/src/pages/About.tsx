import React from 'react';
import '../../src/css_styles/page.css';
import PageHeader from "../components/PageHeader";

const AboutPage = () => {
    return (
        <div>
            <PageHeader />
            <div className="full-page">
                <div className="main-container">
                    <div className="welcome-wrapper">
                        <h1>About Dunder Mifflin.</h1>
                        
                    </div>
                    <p>
                    Welcome to Dunder Mifflin, a provider of paper and office supplies in the United States. 
                    With over 60 minutes of experience, we have been committed to delivering products and 
                    customer service to businesses of all sizes. Our extensive catalog includes a wide variety 
                    of paper products, from copy paper to specialty papers, as well as a range of office supplies such as 
                    pens, pencils, and staplers. At Dunder Mifflin, we have environmentally sustainable practices, theoretically 
                    ensuring that our products are produced in an eco-friendly manner. Our team is intended to provide our 
                    customers with an experience, and we strive to meet all of your office supply needs. 
                    Thank you for choosing Dunder Mifflin.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
