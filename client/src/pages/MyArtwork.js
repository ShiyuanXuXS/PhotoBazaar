import React from 'react';
import ArtworkListComponent from '../components/ArtworkList';
import { useParams } from 'react-router-dom';


function MyArtwork() {
    let { userId } = useParams();
    console.log("user id is in my artwork page:" + userId);

    return (
        <ArtworkListComponent userId={userId} />

    )
}

export default MyArtwork;