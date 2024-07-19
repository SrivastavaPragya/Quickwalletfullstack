import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ServicePage from "./Pages/ServicePage";
import ContactPage from "./Pages/ContactPage";
import Logged from "./components/login/Logged";

import FooterPage from "./Pages/FooterPage";

import ProfilePage from "./Pages/ProfilePage";
import TransferPage from "./Pages/TransferPage";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Logged />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/transfer" element={<TransferPage />} />


      </Routes>
 <FooterPage/>
    </Router>
  );
};

export default App;
