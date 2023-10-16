import React from 'react';
import ArtworkListComponent from '../components/ArtworkList';
import { useParams } from 'react-router-dom';
<<<<<<< Updated upstream
import HeaderComponent from "../components/Header";
import FooterComponent from "../components/Footer";
=======
>>>>>>> Stashed changes


function MyArtwork() {
    let { userId } = useParams();
<<<<<<< Updated upstream

    return (
        <>
            <HeaderComponent />
            <ArtworkListComponent userId={userId} />
            <FooterComponent />
        </>
=======
    console.log("user id is in my artwork page:" + userId);

    return (
        <ArtworkListComponent userId={userId} />
>>>>>>> Stashed changes

    )
}

export default MyArtwork;