import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ArtworkDetailsComponent({ artworkId }) {
    const [artworkToUpdate, setArtworkToUpdate] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/artworks/${artworkId}`)
            .then((response) => {
                console.log(response.data);
                setArtworkToUpdate(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [artworkId]);

    console.log("ArtworkDetailsComponent");
    console.log(artworkId);

    return (
        <>
            artwork photo details
        </>

    )
}

export default ArtworkDetailsComponent;