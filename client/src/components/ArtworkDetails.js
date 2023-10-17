import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ArtworkDetailsComponent({ artworkId }) {
    const [artworkToUpdate, setArtworkToUpdate] = useState([]);
    const navigate = useNavigate();
    const [tagList, setTagList] = useState([]);

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

    useEffect(() => {
        Axios.get("http://localhost:3001/api/tags")
            .then((response) => {
                setTagList(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    console.log("ArtworkDetailsComponent");
    console.log(artworkId);
    console.log(artworkToUpdate);
    console.log(tagList);

    return (
        <>
            <div className='mainInfo m-5 p-3 '>
                <div className='font-bold text-2xl'>{artworkToUpdate.title}</div>
                <div className="text-xl p-3">{artworkToUpdate.description}</div>
                <div className="p-1 flex">
                    {artworkToUpdate.tags.map((tag, tagIndex) => {
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

            {/* <div className='photos'>
                <div className='flex flex-wrap justify-center'>
                    {artworkToUpdate.length >= 1 ? (
                        <>
                            {artworkToUpdate.photos.map((photo, photoIndex) => {
                                return (
                                    <div key={photoIndex} className='m-3 p-3'>
                                        <img src={photo.file_url} className='w-60 h-80 justify-center m-auto p-2' alt="Artwork" />
                                        <div className="text-xl p-3 text-center font-bold subpixel-antialiased capitalize">{photo.photo_name}</div>
                                        <div className="text-l p-3 pt-0 capitalize">{photo.description}</div>
                                        <div className="button-group flex p-3 pt-0 rounded-full justify-center mb-5">
                                            <button className="border-r-2 items-center ml-1"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                            </button>
                                            <button className="items-center px-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="mb-4 p-3 pt-0">
                                            <label htmlFor="formPhotoName" className="block font-medium mb-2">photo Name:</label>
                                            <input
                                                type="text"
                                                id="formPhotoName"
                                                name="photoName"
                                                className="block w-full border border-gray-300 rounded p-2"
                                            // defaultValue={!isAdd ? photo.photo_name : ''}
                                            // onChange={(e) => setPhotoName(e.target.value)}
                                            />
                                            <p className="text-gray-500 text-sm">Required, 10-50 Characters, Only Letters Or Spaces.
                                            </p>
                                        </div>
                                        <div className="mb-4 p-3">
                                            <label htmlFor="formPhotoDes" className="block font-medium mb-2">photo Description:</label>
                                            <input
                                                type="text"
                                                id="formPhotoDes"
                                                name="photoDes"
                                                className="block w-full border border-gray-300 rounded p-2"
                                            // defaultValue={!isAdd ? photo.description : ''}
                                            // onChange={(e) => setPhotoDescription(e.target.value)}
                                            />
                                            <p className="text-gray-500 text-sm">Required, 50-100 Characters.</p>
                                        </div>
                                        <div className="mb-4 p-3">
                                            <label htmlFor="formUploadPhoto" className="block font-medium">Upload Image:</label>
                                            <input
                                                type="file"
                                                id="formUploadPhoto"
                                                name="uploadPhoto"
                                                accept=".jpg, .png, .jpeg"
                                                className="block w-full border border-gray-300 rounded p-2"
                                            // onChange={(e) => setPhotoFile(e.target.files[0])}

                                            />
                                            <p className="text-gray-500 text-sm">Required, Image Format Should Be JPG Or PNG.</p>
                                        </div>

                                    </div>
                                );
                            })}
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div> */}
        </>

    )
}

export default ArtworkDetailsComponent;