import React from "react";
import HeaderComponent from "../components/Header";
import FooterComponent from "../components/Footer";
import ArtworkList from "../components/ArtworkList";


function MyAssets() {
    return (
        <div>
            <HeaderComponent />
            <ArtworkList page={"myAssets"} />
            <FooterComponent fixBottom={true} />
        </div>
    );
}

export default MyAssets;