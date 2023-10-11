import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function ArtworkListComponent() {
    const [artworkList, setArtworkList] = useState([]);
    const [tagList, setTagList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/api/artworks").then((response) => {
            setArtworkList(response.data);
        })
            .catch((error) => {
                console.error(error);
            });

        // Fetch the tag data
        Axios.get("http://localhost:3001/api/tags").then((response) => {
            console.log("enter");
            setTagList(response.data);
            console.log(tagList);
        })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="flex flex-wrap justify-center">
            {artworkList.map((artwork, index) => (
                <div key={index} className="card border-4 w-96 h-96 m-5 flex flex-col justify-between">
                    <img src={artwork.cover_url} className="mx-auto my-auto w-90 h-60" alt="Artwork" />
                    <div className="ml-4">
                        <div className="text-lg subpixel-antialiased font-bold uppercase">{artwork.title}</div>
                        <div className="flex justify-between  mt-3">
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
                        </div>
                        <div className="text-base capitalize mt-2">{artwork.description}</div>
                        <div className='mb-2 flex justify-center'>
                            {artwork.tags.map((tag, tagIndex) => {
                                // Find the corresponding tag object in tagList
                                const tagData = tagList.find(t => t._id === tag.tag_id);

                                // Display tagData.name if found
                                return (
                                    <div key={tagIndex} className="capitalize border-2 p-1 text-sm inline ml-2">
                                        {tagData ? tagData.name : 'Tag Not Found'}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        // <div className="card border-4 w-96 h-96 m-5 flex flex-col justify-between">
        //     <img src="./logo192.png" className="mx-auto w-90 h-60" alt="..." />
        //     <div className="ml-4">
        //         <div className="text-lg subpixel-antialiased font-bold uppercase">title</div>
        //         <div className="flex justify-between">
        //             <div className="flex items-center mr-4">
        //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        //                     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        //                 </svg>
        //                 <span className='ml-2'>1</span>
        //             </div>
        //             <div className="flex items-center">
        //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        //                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        //                 </svg>
        //                 <span className='ml-2 mr-4'>199.90</span>
        //             </div>
        //         </div>

        //         <div className="text-base capitalize">description</div>
        //         <div className='mb-2 flex justify-center'>
        //             <div className="capitalize border-2 p-1 text-sm inline">tags</div>
        //         </div>
        //     </div>
        // </div>

        //         <div className="btn-group">
        //                 <a
        //                     href={`/addToCart/${book.bookId}`}
        //                     className="btn btn-sm btn-outline-secondary"
        //                 >
        //                     <svg
        //                         xmlns="http://www.w3.org/2000/svg"
        //                         width="16"
        //                         height="16"
        //                         fill="currentColor"
        //                         className="bi bi-plus-square"
        //                         viewBox="0 0 16 16"
        //                     >
        //                         <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
        //                         <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        //                     </svg>
        //                 </a>
        //                 <button type="button" className="btn btn-sm btn-outline-secondary">
        //                     <svg
        //                         xmlns="http://www.w3.org/2000/svg"
        //                         width="16"
        //                         height="16"
        //                         fill="currentColor"
        //                         className="bi bi-suit-heart-fill"
        //                         viewBox="0 0 16 16"
        //                     >
        //                         <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
        //                     </svg>
        //                 </button>
        //             </div>
        //             <div className="flex flex-row items-center space-x-2">
        //                 <div className="flex items-center">
        //           <a
        //             href={`/books/edit/${book.bookId}`}
        //             className="btn btn-sm btn-outline-secondary"
        //           >
        //             <svg
        //               xmlns="http://www.w3.org/2000/svg"
        //               width="16"
        //               height="16"
        //               fill="currentColor"
        //               className="bi bi-pencil-square"
        //               viewBox="0 0 16 16"
        //             >
        //               <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
        //               <path
        //                 fillRule="evenodd"
        //                 d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
        //               />
        //             </svg>
        //           </a>
        //         </div>
        //                 <div className="flex items-center">
        //           <a
        //             href={`/books/delete/${book.bookId}`}
        //             className="btn btn-sm btn-outline-secondary"
        //             onclick="if (!(confirm('Are you sure you want to delete this book?'))) return false"
        //           >
        //             <svg
        //               xmlns="http://www.w3.org/2000/svg"
        //               width="16"
        //               height="16"
        //               fill="currentColor"
        //               className="bi bi-trash3-fill"
        //               viewBox="0 0 16 16"
        //             >
        //               <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a.5.5 0 0 1-.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"
        //             />
        //           </a>
        //         </div>
        //             </div>
        //         </div>
        //     </div>
        // </a> */}
    )
}

export default ArtworkListComponent;