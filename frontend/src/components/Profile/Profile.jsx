// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaypal, faApplePay, faGooglePay } from '@fortawesome/free-brands-svg-icons';
// import '../../styles/Profile.css';

// const Profile = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);
//   const [userBalance, setUserBalance] = useState(null);
//   const [error, setError] = useState('');

//     useEffect(() => {
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//           navigate('/login'); 
//           return;
//       }

//       const fetchProfile = async () => {
//           try {
//               const response = await fetch('http://localhost:8000/user/profile', {
//                   headers: {
//                       'Authorization': `Bearer ${token}` 
//                   }
//               });
//               const data = await response.json();
//               if (response.ok) {
//                   setUserData(data);
//                   fetchBalance(); 
//               } else {
//                   throw new Error(data.message || "Unable to fetch profile");
//               }
//           } catch (error) {
//               console.error('Profile Fetch Error:', error.message);
//               setError(error.message);
//               navigate('/login');
//           }
//       };

//       const fetchBalance = async () => {
//           try {
//               const response = await fetch('http://localhost:8000/account/balance', { 
//                   headers: {
//                       'Authorization': `Bearer ${token}`
//                   }
//               });
//               const data = await response.json();
//               if (response.ok) {
//                 setUserBalance(Number(data.balance).toFixed(2));
//               } else {
//                   throw new Error(data.message || "Unable to fetch balance");
//               }
//           } catch (error) {
//               console.error('Balance Fetch Error:', error.message);
//               setError(error.message); 
//           }
//       };

//       fetchProfile();
//   }, [navigate]);

//     if (!userData) return <p>Loading...</p>; // Show loading or any placeholder

    // return (
    //     <div className="profile-container">
    //         <div className="profile-header">
    //             <div className="user-info">
    //                 <FontAwesomeIcon icon="fa-solid fa-user" size="3x" className="user-avatar" />
    //                 <div>
    //                     <h1 className="user-name">{`${userData.Firstname} ${userData.Lastname}`}</h1>
    //                     <p className="user-id">User ID: {userData._id}</p>
    //                 </div>
    //             </div>
    //             <div className="user-balance">
    //                 <p>Current Balance</p>
    //                 <h2>${userBalance ? userBalance : 'Loading...'}</h2>
    //             </div>
    //         </div>
    //         <div className="payment-options">
    //             <button onClick={() => navigate('/transfer')} className="payment-button paypal">
    //                 <FontAwesomeIcon icon={faPaypal} size="2x" />
    //                 PayPal
    //             </button>
    //             <button onClick={() => navigate('/transfer')} className="payment-button apple-pay">
    //                 <FontAwesomeIcon icon={faApplePay} size="2x" />
    //                 Apple Pay
    //             </button>
    //             <button onClick={() => navigate('/transfer')} className="payment-button google-pay">
    //                 <FontAwesomeIcon icon={faGooglePay} size="2x" />
    //                 Google Pay
    //             </button>
    //         </div>
    //         <div className="tranferButton">
    //             <button onClick={() => navigate('/transfer')}>
    //                 Transfer Money
    //             </button>
    //         </div>
          
    //     </div>
    // );
// };

// export default Profile;


// src/components/Profile.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal, faApplePay, faGooglePay } from '@fortawesome/free-brands-svg-icons';
import { setUserData, setBalance, setError } from '../../redux/slice';
import '../../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, balance, error } = useSelector(state => state.profile);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8000/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(setUserData(data));
          fetchBalance(token); // Call fetchBalance after setting user data
        } else {
          throw new Error(data.message || "Unable to fetch profile");
        }
      } catch (error) {
        dispatch(setError(error.toString()));
      }
    };

    const fetchBalance = async (token) => {
      try {
        const response = await fetch('http://localhost:8000/account/balance', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(setBalance(Number(data.balance).toFixed(2)));
        } else {
          throw new Error(data.message || "Unable to fetch balance");
        }
      } catch (error) {
        dispatch(setError(error.toString()));
      }
    };

    fetchProfile();
  }, [navigate, dispatch]);

  if (!userData) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error: {error}</p>;
  }

  return (
    <div className="profile-container">
    <div className="profile-header">
        <div className="user-info">
            <FontAwesomeIcon icon="fa-solid fa-user" size="3x" className="user-avatar" />
            <div>
                <h1 className="user-name">{`${userData.Firstname} ${userData.Lastname}`}</h1>
                <p className="user-id">User ID: {userData._id}</p>
            </div>
        </div>
        <div className="user-balance">
            <p>Current Balance</p>
            <h2>${balance ? balance : 'Loading...'}</h2>
        </div>
    </div>
    <div className="payment-options">
        <button onClick={() => navigate('/transfer')} className="payment-button paypal">
            <FontAwesomeIcon icon={faPaypal} size="2x" />
            PayPal
        </button>
        <button onClick={() => navigate('/transfer')} className="payment-button apple-pay">
            <FontAwesomeIcon icon={faApplePay} size="2x" />
            Apple Pay
        </button>
        <button onClick={() => navigate('/transfer')} className="payment-button google-pay">
            <FontAwesomeIcon icon={faGooglePay} size="2x" />
            Google Pay
        </button>
    </div>
    <div className="tranferButton">
        <button onClick={() => navigate('/transfer')}>
            Transfer Money
        </button>
    </div>
  
</div>
  );
};

export default Profile;
