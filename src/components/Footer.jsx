import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer p-10 bg-neutral text-neutral-content">
            <aside>
                {/* You can place your logo SVG here */}
                <p className="text-xl font-bold">LocalFoodLovers</p>
                <p>Celebrating great food, honest opinions, and local flavor.<br />Copyright © 2025 - All right reserved</p>
            </aside>
            <nav>
                <header className="footer-title">Navigation</header>
                <Link to="/" className="link link-hover">Home</Link>
                <Link to="/all-reviews" className="link link-hover">All Reviews</Link>
                <Link to="/login" className="link link-hover">Login</Link>
            </nav>
            <nav>
                <header className="footer-title">Social</header>
                <div className="grid grid-flow-col gap-4">
                    <a>
                        {/* New X Logo SVG [cite: 36] */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.295Z"></path></svg>
                    </a>
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 7.816.029 5.195.488 7.55 4.385 7.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-7.816-.029-5.195-.488-7.55-4.385-7.816ZM9.75 15.025V8.975l5.207 3.025-5.207 3.025Z"></path></svg>
                    </a>
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.149-4.771-1.664-4.919-4.919-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.07 4.85-.07Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-7.03 2.872-7.229 7.229-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.2 4.358 2.872 7.03 7.229 7.229 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c4.358-.2 7.03-2.872 7.229-7.229.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.2-4.358-2.872-7.03-7.229-7.229-1.28-.058-1.688-.072-4.947-.072ZM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88Z"></path></svg>
                    </a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;