import React from 'react';
import ArtworkListComponent from '../components/ArtworkList';
import { useParams } from 'react-router-dom';


function MyArtwork() {
    let { userId } = useParams();

    return (
        <ArtworkListComponent userId={userId} />

    )
}

export default MyArtwork;