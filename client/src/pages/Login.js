import React from "react";
import LoginComponent from "../components/login";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "../components/Header";
import FooterComponent from "../components/Footer";

function Login() {
  return (
    <div>
      <HeaderComponent />
      <LoginComponent />
      <FooterComponent />
    </div>
  );
}
//fix me:can not have multiple default module
export default Login;
