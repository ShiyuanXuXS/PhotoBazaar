import React, { useState } from "react";


function UploadImageComponent(props) {

    const { index, status, handleShowImage, uploadImageIndex } = props;

    const [hide, setHide] = useState(false);

    const handleButtonClick = (event) => {
        event.preventDefault();
        handleShowImage(index);
    };

    return (
        <>
            {hide ? (<></>) : (<div className='uploadImage  border-2 w-80 mr-5 my-3'>
                <div className='flex justify-end'>
                    <button className="items-center px-1 mr-2 mt-2" onClick={handleButtonClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>

                <div className="mb-4 p-3 pt-0">
                    <label htmlFor="formArtworkPrice" className="block font-medium mb-2">photo Name:</label>
                    <input
                        type="number"
                        id="formArtworkPrice"
                        name="artworkPrice"
                        className="block w-full border border-gray-300 rounded p-2"
                        min="0"
                        step="any"
                    />
                    <p className="text-gray-500 text-sm">Required, must be equal or higher than 0.</p>
                </div>
                <div className="mb-4 p-3">
                    <label htmlFor="formArtworkPrice" className="block font-medium mb-2">photo Description:</label>
                    <input
                        type="number"
                        id="formArtworkPrice"
                        name="artworkPrice"
                        className="block w-full border border-gray-300 rounded p-2"
                        min="0"
                        step="any"
                    />
                    <p className="text-gray-500 text-sm">Required, must be equal or higher than 0.</p>
                </div>
                <div className="mb-4 p-3">
                    <label htmlFor="formUploadImg" className="block font-medium">Upload Image:</label>
                    <input
                        type="file"
                        id="formUploadImg"
                        name="uploadImg"
                        accept=".jpg, .png, .jpeg"
                        className="block w-full border border-gray-300 rounded p-2"
                    />
                    <p className="text-gray-500 text-sm">Required, image format should be jpg, png.</p>
                </div>
            </div>)
            }

        </>)
}

export default UploadImageComponent;