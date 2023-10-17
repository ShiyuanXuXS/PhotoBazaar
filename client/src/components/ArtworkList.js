import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ArtworkListComponent({ userId }) {
    const [artworkList, setArtworkList] = useState([]);
    const [tagList, setTagList] = useState([]);
    const navigate = useNavigate();
    const [arworkIds, setArtworkIds] = useState([]);

    useEffect(() => {
        if (userId !== null && userId !== undefined) {
            // If userId is not null, fetch data for a specific user
            // get artwork_id from user_id
            Axios.get(`http://localhost:3001/api/artworks/author/${userId}`)
                .then((response) => {
                    console.log(userId);
                    console.log(response.data);
                    setArtworkList(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            // If userId is null, fetch data for all users
            Axios.get("http://localhost:3001/api/artworks")
                .then((response) => {
                    setArtworkList(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        // Fetch the tag data
        Axios.get("http://localhost:3001/api/tags")
            .then((response) => {
                setTagList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);

    return (
        <>
            <div className="card flex flex-wrap justify-center">
                <button className="border-4 w-60 h-60 m-auto flex flex-col justify-center items-center rounded-full" onClick={() => navigate('/addArtwork')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                    <div className="text-2xl font-bold subpixel-antialiased capitalize">New Artwork</div>
                </button>
                {artworkList.length > 0 ? (<>{artworkList.map((artwork, index) => (
                    <div key={index} className="border-4 w-96 h-100 m-5 flex flex-col justify-between rounded-lg w-1/4">
                        <img src={artwork.cover_url} className="mx-auto my-auto w-90 h-60" alt="Artwork" />
                        <div className="ml-4">
                            <div className="text-lg subpixel-antialiased font-bold uppercase">{artwork.title}</div>
                            <div className="flex justify-between mt-3">
                                <div className="flex items-center mr-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                        />
                                    </svg>
                                    <span className='ml-2'>{artwork.photos.length}</span>
                                </div>
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span className='ml-2 mr-4'>{artwork.price}</span>
                                </div>
                                <div className="button-group flex border-2 mr-4 p-1 rounded-full">
                                    <button className="items-center px-1 border-r-2"
                                        onClick={() => {
                                            navigate(`/details/${artwork._id}`);
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                        </svg>
                                    </button>
                                    <button className="border-r-2 items-center ml-1"
                                        onClick={() => {
                                            navigate(`/updateArtworkMainInfo/${artwork._id}`);
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </button>
                                    <button className="border-r-2 items-center px-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>

                                    </button>
                                    <button className="items-center px-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>

                                    </button>

                                </div>
                            </div>
                            <div className="text-base capitalize mt-2">{artwork.description}</div>
                            <div className="mb-2 flex justify-center mt-1">
                                {artwork.tags.map((tag, tagIndex) => {
                                    // Find the corresponding tag object in tagList
                                    const tagData = tagList.find(t => t._id === tag.tag_id);
                                    return (
                                        <div key={tagIndex} className="font-serif capitalize p-1 text-sm inline ml-2 bg-sky-500/50 rounded-lg">
                                            {tagData ? tagData.tag : ""}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}</>) : (<p>You don't have any artworks!</p>)}
            </div >
        </>
    )
}

export default ArtworkListComponent;