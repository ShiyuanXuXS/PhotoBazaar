import React from 'react';
import ArtworkListComponent from '../components/ArtworkList';
import HeaderComponent from "../components/Header";
import FooterComponent from "../components/Footer";
import { useParams } from 'react-router-dom';


function ArtworkList() {
    let { option, searchKey } = useParams();

    return (
        <>
            <HeaderComponent />
            <ArtworkListComponent page="search" option={option} searchKey={searchKey} />
            <FooterComponent fixBottom={true} />
        </>

    )
}

export default ArtworkList;