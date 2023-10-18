import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
function Home() {
  return <div>
    <Header />
    <div className="search p-3 m-5">
      <img className="w-full" src="./homepagebg.png" alt="photobazaar" ></img>
    </div>
    <div className="tags p-3 m-5">
    </div>
    <div className="artworks p-3 m-5"></div>
    <Footer fixBottom={true} />
  </div>;
}

export default Home;
