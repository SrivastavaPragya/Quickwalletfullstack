import React from 'react'
import "../styles/Header.css"
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="headerblue">
                <h1>📧 support@repay.com</h1>
            </div>
            <div className="headerContainer">
                <div className="logo">
                    <img src="./banner-logo.png" alt="" />
                </div>
                <div className="HeaderContent">
                    <nav>
                        <ul className="nav-menu">
                            <li><a onClick={() => navigate('/')}>Home</a></li>
                            <li><a onClick={() => navigate('/services')}>Services</a></li>
                            <li><a onClick={() => navigate('/contact')}>Contact Us</a></li>
                            <li><a onClick={() => navigate('/transfer')}>Transfer Money</a></li>
                            <li><a onClick={() => navigate('/profile')}>Profile</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="HeaderButtons">
                    <button onClick={()=>navigate('/login')} className="LogIn">Log In</button>
                    <button onClick={()=>navigate('/login')}  className="SignUp">Sign Up</button>
                </div>
            </div>
        </>
    )
}

export default Header;
