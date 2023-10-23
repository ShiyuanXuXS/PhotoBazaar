import React from "react";
import SignupComponent from "../components/register";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Signup() {
  return (
    <div>
      <Header />
      <SignupComponent />
      <Footer />
    </div>
  );
}

export default Signup;
