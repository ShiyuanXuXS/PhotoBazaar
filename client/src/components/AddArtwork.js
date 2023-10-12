import React, { useState, useEffect } from 'react';
import Axios from 'axios';
// import {
//     S3Client,
//     DeleteObjectCommand,
//     PutObjectCommand,
// } from "@aws-sdk/client-s3";
// window.Buffer = window.Buffer || require("buffer").Buffer;

function AddArtworkComponent() {
    const [tagList, setTagList] = useState([]);

    const [tags, setTags] = useState([]);

    const [isDisabled, setIsDisabled] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        if (!isDisabled) {
            // Toggle the active state
            setIsActive(!isActive);
            // Disable the button
            setIsDisabled(true);
        } else {
            // Re-enable the button and reset the active state
            setIsActive(false);
            setIsDisabled(false);
        }
    };

    const handleTagClick = (tag) => {
        // if (tags.includes(tag._id)) {
        //     // Remove the tag from the selected tags
        //     setTags(tags.filter((selectedTag) => selectedTag !== tag._id));
        // } else {
        //     // Add the tag to the selected tags
        //     if (tags.length < 5) {
        //         setTags([...tags, tag._id]);
        //     }
        // }
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
                        <div className="mb-4">
                            <label htmlFor="formArtworkId" className="block font-medium">artwork Id:</label>
                            <input
                                type="text"
                                id="formArtworkId"
                                name="artworkId"
                                className="block w-full border border-gray-300 rounded p-2"
                                disabled
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="formArtworkTitle" className="block font-medium">title:</label>
                            <input
                                type="text"
                                id="formArtworkTitle"
                                name="artworkTitle"
                                className="block w-full border border-gray-300 rounded p-2"
                            />
                            <p className="text-gray-500 text-sm">Required, 10-50 characters, only letters or spaces.</p>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="formArtworkDescription" className="block font-medium">Description:</label>
                            <input
                                type="text"
                                id="formArtworkDescription"
                                name="artworkDescription"
                                className="block w-full border border-gray-300 rounded p-2"
                            />
                            <p className="text-gray-500 text-sm">Required, 50-100 characters.</p>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="formCoverUrl" className="block font-medium">cover image:</label>
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
                            <label htmlFor="formArtworkTag" className="block font-medium">Tags:</label>
                            {tagList.map((tag, index) => {
                                return (
                                    <button
                                        key={index}
                                        onClick={handleClick}
                                        className={`font-serif capitalize p-1 text-sm inline ml-2 rounded-lg ${isDisabled
                                            ? 'bg-gray-300 text-gray-600'
                                            : isActive
                                                ? 'bg-sky-600 text-white'
                                                : 'bg-sky-500 text-white hover:bg-sky-600'
                                            }`}
                                        disabled={isDisabled}
                                    >
                                        {tag.tag}
                                    </button>
                                );
                            })}
                            <p className="text-gray-500 text-sm">Required, maximum choose 5 tags.</p>
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

                        <div className="mb-4">
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