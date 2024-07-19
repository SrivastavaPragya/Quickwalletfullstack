import React from 'react';
import '../../styles/Transfer.css';

const Transfer = () => {
  return (
    <div className="Transfer">
<div className="Transfercontainer">
      <div className="Transferform">
        <form action="#" className='form1'>
          <div className="flex-row">
            <label htmlFor="user-id">User-id</label>
            <input name=" user-id" className="card-number" type="text" value="" />
          </div>
          <div className="flex-row">
            <label htmlFor="card-name">Holder Name</label>
            <input name="card-name" className="card-name" type="text" value="" />
          </div>
          <div className="flex-row">
            <table>
              <tbody>
                <tr>
                  <td className="table-column">
                    <label htmlFor="month">Transfer Date</label>
                    <select name="month" id="month-select">
                      <option value="Month" disabled>Month</option>
                      <option value="January">January</option>
                      <option value="January">February</option>
                      <option value="January">March</option>
                      <option value="January">April</option>
                      <option value="January">May</option>
                      <option value="January">June</option>
                      <option value="January">July</option>
                      <option value="January">August</option>
                      
                      <option value="January">September</option>
                      <option value="January">October</option>
                      <option value="January">November</option>
                      <option value="December">December</option>
                    </select>
                    <select name="year" id="year-select">
                      <option value="Year" disabled>Year</option>
                      <option value="2022">2022</option>
                      {/* Additional years */}
                      <option value="2030">2030</option>
                    </select>
                  </td>
                 
                </tr>
              </tbody>
            </table>
          </div>
         <button>Transfer Money</button>
        </form>
        <img className="card-image" src="https://pngimg.com/uploads/credit_card/credit_card_PNG99.png" alt="Card image" />
        <div className="card-image-shadow"></div>
      </div>
    </div>
    </div>
    
  );
}

export default Transfer;
