import React from "react";
import LoginComponent from "../components/login";
import Header from "../components/Header";
import Footer from "../components/Footer";
function Login() {
  return (
    <div>
      <Header />
      <LoginComponent />
      <Footer fixBottom={true} />
    </div>
  );
}
export default Login;
