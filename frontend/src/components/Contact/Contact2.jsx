import React from 'react'

const Contact2 = () => {
  return (

    <div className="Contact2Container">
        <div className="Contact2Content">
        <h3>LET'S CONTACT US</h3>
        <h1>Get in Touch with Us</h1>
        </div>
        
 <div className="form-container">
    
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Your Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email Address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter Your Phone Number"
          />
        </div>


        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <input
            type="tel"
            id="message"
            name="Message"
            placeholder="Type Your Messsage"
          />
        </div>
        <div className="contatct2button">
        <button type="submit">Submit</button>
        </div>
        
      </form>
    </div>
    </div>
   
  )
}

export default Contact2
