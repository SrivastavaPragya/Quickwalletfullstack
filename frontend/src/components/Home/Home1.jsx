import React from 'react'
import "../../styles/Home.css"

const Home1 = () => {
  return (
    <>
   
   <div className="HomeConatiner">

    <div className="topImg">
<img src="./homebanner.png" alt="" />
    </div>
    <div className="MidContent">
        <div className="HomeLeft">
<h3>SIMPLE. TRANSPARENT. SECURE</h3>
<h1>The Smart Way for<span className='orange'>  Online Payment</span> Solution.</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisc ing elit sed do eiusmod tempor.</p>
<button>Open a free Account</button>
        </div>
        <div className="HomeRight">
        <img src="./img1.png" alt="Background Circle" className="img1"/>
        <img src="./img2.png" alt="Overlay Image" className="img2"/>

        </div>
    </div>
   </div>
    </>
  )
}

export default Home1
