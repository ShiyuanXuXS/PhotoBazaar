import React from "react";

import ForgotpasswordComponent from "../components/forgotpassword";
import Header from "../components/Header";
import Footer from "../components/Footer";
function ForgotPassword() {
  return (
    <div>
      <Header />
      <ForgotpasswordComponent />
      <Footer fixBottom={true} />
    </div>
  );
}

export default ForgotPassword;
