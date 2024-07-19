import React from 'react';
import '../../styles/Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal, faApplePay, faGooglePay } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
   
    const navigate = useNavigate();
  return (
   
   <div className="profile-container">
      <div className="profile-header">
        <div className="user-info">
          <FontAwesomeIcon icon="fa-solid fa-user" size="3x" className="user-avatar" />
          <div>
            <h1 className="user-name">John Doe</h1>
            <p className="user-id">User ID: 123456</p>
          </div>
        </div>
        <div className="user-balance">
          <p>Current Balance</p>
          <h2>$69,420</h2>
        </div>
      </div>
      <div className="payment-options">
        <button  onClick={()=>navigate('/transfer')}
        className="payment-button paypal">
          <FontAwesomeIcon icon={faPaypal} size="2x" />
          PayPal
        </button>
        <button  onClick={()=>navigate('/transfer')}
          className="payment-button apple-pay">
          <FontAwesomeIcon icon={faApplePay} size="2x" />
          Apple Pay
        </button>
        <button  onClick={()=>navigate('/transfer')}
         className="payment-button google-pay">
          <FontAwesomeIcon icon={faGooglePay} size="2x" />
          Google Pay
        </button>
      </div>
      <div className="tranferButton">
        <button  onClick={()=>navigate('/transfer')}
        >Tranfer Money</button>
      </div>
   
    </div>
 
  );
}

export default Profile;
