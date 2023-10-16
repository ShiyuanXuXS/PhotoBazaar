import React from "react";

import ForgotpasswordComponent from "../components/forgotpassword";
import Header from "../components/Header";
import Footer from "../components/Footer";
function ForgotPassword() {
  return (
    <div>
      <Header />
      <ForgotpasswordComponent />
      <Footer />
    </div>
  );
  // return <div>forgot password</div>;
}
//fix me:can not have multiple default module
export default ForgotPassword;
