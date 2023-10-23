import React from "react";
import ChangepasswordComponent from "../components/changepassword";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ChangePassword() {
  return (
    <div>
      <Header />
      <ChangepasswordComponent />
      <Footer fixBottom={true} />
    </div>
  );
}
//fix me:can not have multiple default module
export default ChangePassword;
