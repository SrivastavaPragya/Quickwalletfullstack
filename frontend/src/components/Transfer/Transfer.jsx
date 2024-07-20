import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Transfer.css';

const Transfer = () => {
  const [formData, setFormData] = useState({
    userId: '',
    holderName: '',
    amount: ''
  });
  const navigate = useNavigate();

  useEffect(()=>{
 // Check if user is logged in
 const token = localStorage.getItem('authToken');
 if (!token) {
   navigate('/login');
 }
  },[])

 

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/account/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          to: formData.userId,
          amount: parseFloat(formData.amount)
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Transfer Successful');
       
      } else {
        throw new Error(data.message || 'Failed to transfer money');
      }
    } catch (error) {
      alert(error.message);
      console.error('Transfer Error:', error);
    }
  };

  return (
    <div className="Transfer">
      <div className="Transfercontainer">
        <div className="Transferform">
          <form action="#" className="form1" onSubmit={handleTransfer}>
            <div className="flex-row">
              <label htmlFor="userId">User ID to Transfer</label>
              <input name="userId" className="card-number" type="text" value={formData.userId} onChange={handleChange} />
            </div>
            <div className="flex-row">
              <label htmlFor="amount">Amount</label>
              <input name="amount" className="card-name" type="number" value={formData.amount} onChange={handleChange} />
            </div>
            <button type="submit">Transfer Money</button>
          </form>
          <img className="card-image" src="https://pngimg.com/uploads/credit_card/credit_card_PNG99.png" alt="Card image" />
          <div className="card-image-shadow"></div>
        </div>
      </div>
    </div>
  );
}

export default Transfer;
