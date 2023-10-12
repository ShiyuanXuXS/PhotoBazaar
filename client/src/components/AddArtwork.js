import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import UploadImageComponent from './UploadImage';
// import {
//     S3Client,
//     DeleteObjectCommand,
//     PutObjectCommand,
// } from "@aws-sdk/client-s3";
// window.Buffer = window.Buffer || require("buffer").Buffer;

function AddArtworkComponent() {
    const [tagList, setTagList] = useState([]);
    const [tagArray, setTagArray] = useState([]);
    const [uploadImages, setUploadImages] = useState([{
        index: 1,
        status: "show",
    }]);

    const handleAddImage = (event) => {
        event.preventDefault();
        const newUploadImage = {
            index: uploadImages.length + 1,
            status: "show",
        };

        const newUploadImages = [...uploadImages, newUploadImage];
        setUploadImages(newUploadImages);
        if (newUploadImages.length === 8) {
            // disable the add image button
            alert("You can only upload 8 images.");
        }
    };

    const handleShowImage = (index) => {
        //change status in newUploadImages based on index
        const updatedUploadImages = uploadImages.filter((uploadImage) => uploadImage.index !== index);
        setUploadImages(updatedUploadImages);
    };

    const handleTags = (event, id) => {
        event.preventDefault();

        if (tagArray.includes(id)) {
            const updatedTagArray = tagArray.filter((_id) => _id !== id);
            setTagArray(updatedTagArray);
        }
        else {
            if (tagArray.length < 5) {
                setTagArray([...tagArray, id]);
            } else {
                alert("You can only choose 5 tags.");
            }
        }

    };

    useEffect(() => {
        Axios.get("http://localhost:3001/api/tags").then((response) => {
            setTagList(response.data);
        })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="my-4">
            <div className="container mx-auto capitalize">
                <h1 className="text-2xl font-semibold capitalize">Create new artwork</h1>
                <div className="mt-4">
                    <form>
                        {/* <div className="mb-4">
                            <label htmlFor="formArtworkId" className="block font-medium mb-2">artwork Id:</label>
                            <input
                                type="text"
                                id="formArtworkId"
                                name="artworkId"
                                className="block w-full border border-gray-300 rounded p-2"
                                disabled
                            />
                        </div> */}

                        <div className="mb-4">
                            <label htmlFor="formArtworkTitle" className="block font-medium mb-2">title:</label>
                            <input
                                type="text"
                                id="formArtworkTitle"
                                name="artworkTitle"
                                className="block w-full border border-gray-300 rounded p-2"
                            />
                            <p className="text-gray-500 text-sm">Required, 10-50 characters, only letters or spaces.</p>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="formArtworkDescription" className="block font-medium mb-2">Description:</label>
                            <input
                                type="text"
                                id="formArtworkDescription"
                                name="artworkDescription"
                                className="block w-full border border-gray-300 rounded p-2"
                            />
                            <p className="text-gray-500 text-sm">Required, 50-100 characters.</p>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="formCoverUrl" className="block font-medium mb-2">cover image:</label>
                            <input
                                type="file"
                                id="formCoverUrl"
                                name="coverUrl"
                                accept=".jpg, .png, .jpeg"
                                className="block w-full border border-gray-300 rounded p-2"
                            />
                            <p className="text-gray-500 text-sm">Required, image format should be JPG or PNG.</p>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="formArtworkTag" className="block font-medium mb-2">Tags:</label>
                            <input
                                type="text"
                                id="formArtworkTag"
                                name="artworkTag"
                                defaultValue={tagArray.map((id) => {
                                    const matchingTag = tagList.find((tag) => tag._id === id);
                                    return matchingTag ? matchingTag.tag : ''; // If a matching tag is found, return its tag, otherwise an empty string
                                }).join(', ')}
                                className="block w-full border border-gray-300 rounded p-2 mb-2"
                            />
                            <p className="text-gray-500 text-sm">Required, maximum choose 5 tags.</p>
                            {tagList.map((tag, index) => {
                                return (
                                    <button
                                        key={index}
                                        className={`font-serif capitalize p-1 text-sm inline ml-2 rounded-lg bg-sky-600 text-white mt-2`}
                                        onClick={(event) => handleTags(event, tag._id)}
                                    >
                                        {tag.tag}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="formArtworkPrice" className="block font-medium">Price:</label>
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
                        <div className='flex items-center mb-4'>
                            <div className='text-xl font-bold capitalize'>Photo</div>
                            <button className={"items-center px-1 bg-blue"} onClick={handleAddImage} disabled={uploadImages.length >= 8}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={3}
                                    stroke={uploadImages.length >= 8 ? 'gray' : 'blue'}
                                    className="w-6 h-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-500 text-sm">Required, maximum 8 photos.</p>

                        <div className="flex flex-wrap">
                            {uploadImages.map((uploadImage, index) => (
                                <div key={index} className="w-1/4"> {/* w-1/4 means each element takes 25% width */}
                                    <UploadImageComponent
                                        key={index}
                                        index={uploadImage.index}
                                        status={uploadImage.status}
                                        handleShowImage={(index) => handleShowImage(index)}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center mt-4 font-bold">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-4"
                            >
                                Save
                            </button>
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                                variant="warning"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >

    )
}

export default AddArtworkComponent;