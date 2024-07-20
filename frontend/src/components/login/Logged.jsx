import React, { useState } from 'react';
import '../../styles/Logged.css';

const Logged = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const [signupData, setSignupData] = useState({
    Firstname: '',
    Lastname: '',
    email: '',
    password: '',
    phone: '',
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });


  const handleSignIn = () => {
    setIsRightPanelActive(false);
  };

  const handleSignUp = () => {
    setIsRightPanelActive(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleInputChange = (event, type) => {
    const { name, value } = event.target;
    if (type === 'signup') {
      setSignupData(prev => ({ ...prev, [name]: value }));
    } else {
      setLoginData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('authToken', data.token); // Save token to local storage
        console.log(data);
    } else {
        throw new Error(data.message || "An error occurred");
    }
    } catch (error) {
      console.error('Signup Error:', error);
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('authToken', data.token); // Save token to local storage
        console.log(data);
    } else {
        throw new Error(data.message || "An error occurred");
    }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="loggedIn">
      <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        {/* Sign Up */}
        <div className="container__form container--signup">
          <form action="#" className="form" id="form1" onSubmit={handleSignUpSubmit}>
            <h2 className="form__title">Sign Up</h2>
            <input type="text" name="Firstname" placeholder="Firstname" className="input" onChange={e => handleInputChange(e, 'signup')} />
            <input type="text" name="Lastname" placeholder="LastName" className="input" onChange={e => handleInputChange(e, 'signup')} />
            <input type="email" name="email" placeholder="Email" className="input" onChange={e => handleInputChange(e, 'signup')} />
            <input type="password" name="password" placeholder="Password" className="input" onChange={e => handleInputChange(e, 'signup')} />
            <input type="phone" name="phone" placeholder="phone No" className="input" onChange={e => handleInputChange(e, 'signup')} />
            <button className="btn">Sign Up</button>
          </form>
        </div>

        {/* Sign In */}
        <div className="container__form container--signin">
          <form action="#" className="form" id="form2" onSubmit={handleSignInSubmit}>
            <h2 className="form__title">Sign In</h2>
            <input type="email" name="email" placeholder="Email" className="input" onChange={e => handleInputChange(e, 'signin')} />
            <input type="password" name="password" placeholder="Password" className="input" onChange={e => handleInputChange(e, 'signin')} />
            <a href="#" className="link">Forgot your password?</a>
            <button className="btn">Sign In</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="container__overlay">
          <div className="overlay">
            <div className="overlay__panel overlay--left">
              <button className="btn" onClick={handleSignIn}>Sign In</button>
            </div>
            <div className="overlay__panel overlay--right">
              <button className="btn" onClick={handleSignUp}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logged;
