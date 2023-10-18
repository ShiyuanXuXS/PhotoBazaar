import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
function Home() {
  return <div>
    <Header />
    This is homepage!
    <Footer fixBottom={true} />
  </div>;
}

export default Home;
