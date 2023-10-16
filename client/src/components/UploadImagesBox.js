import React, { useState, useEffect } from "react";
import * as Yup from "yup";
export default UploadImagesBoxComponent;


function UploadImagesBoxComponent(props) {

    const { index, handleShowImagesBox, handleSaveChildrenPhoto, artworkToUpdate, isAdd } = props;

    const handleButtonClick = (event) => {
        event.preventDefault();
        handleShowImagesBox(index);
    };

    const [photoName, setPhotoName] = useState('');
    const [photoDescription, setPhotoDescription] = useState('');
    const [photoFile, setPhotoFile] = useState(null);

    useEffect(() => {
        //Validate
        // validationSchema
        //     .validate({ photoName, photoDescription }, { abortEarly: false })
        //     .then(() => {
        // if (photoFile === null || photoFile === undefined || photoFile.size > 5000000) {
        //     alert("Please select a file less than 5MB");
        // } else {
        const data = {
            index: index,
            name: photoName,
            description: photoDescription,
            file: photoFile,
        };
        // Call the callback function with the data and index
        handleSaveChildrenPhoto(data);
        console.log(data);
        // }
        // })
        // .catch((err) => {
        //     alert(err);
        // });
    }, [photoName, photoDescription, photoFile]);

    const validationSchema = Yup.object().shape({
        photoName: Yup.string()
            .min(5, "PhotoName must be at least 5 Characters, Only Letters Or Spaces.")
            .max(30, "PhotoName must not exceed 30 characters.")
            .matches(/^[a-zA-Z ]*$/, "Only letters and spaces are allowed")
            .required("PhotoName is required"),
        photoDescription: Yup.string()
            .min(5, "photoDescription must be at least 5 characters")
            .max(100, "photoDescription must not exceed 100 characters")
            .matches(
                /^[a-zA-Z0-9 ./,_()-]*$/,
                "Item name must only contain uppercase, lowercase, digits, spaces, and: ./,_()-"
            )
            .required("photoDescription is required"),
    });

    return (
        <>
            {isAdd ? (<>
                <div className='uploadImage  border-2 w-80 mr-5 my-3'>
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
                            type="text"
                            id="formArtworkPrice"
                            name="artworkPrice"
                            className="block w-full border border-gray-300 rounded p-2"
                            onChange={(e) => setPhotoName(e.target.value)}
                        />
                        <p className="text-gray-500 text-sm">Required, 10-50 Characters, Only Letters Or Spaces.
                        </p>
                    </div>
                    <div className="mb-4 p-3">
                        <label htmlFor="formArtworkPrice" className="block font-medium mb-2">photo Description:</label>
                        <input
                            type="text"
                            id="formArtworkPrice"
                            name="artworkPrice"
                            className="block w-full border border-gray-300 rounded p-2"
                            onChange={(e) => setPhotoDescription(e.target.value)}
                        />
                        <p className="text-gray-500 text-sm">Required, 50-100 Characters.</p>
                    </div>
                    <div className="mb-4 p-3">
                        <label htmlFor="formUploadImg" className="block font-medium">Upload Image:</label>
                        <input
                            type="file"
                            id="formUploadImg"
                            name="uploadImg"
                            accept=".jpg, .png, .jpeg"
                            className="block w-full border border-gray-300 rounded p-2"
                            onChange={(e) => setPhotoFile(e.target.files[0])}

                        />
                        <p className="text-gray-500 text-sm">Required, Image Format Should Be JPG Or PNG.</p>
                    </div>
                </div>
            </>) : (<>
                <div className='uploadImage  border-2 w-80 mr-5 my-3'>
                    {/* {artworkToUpdate.map((artwork, index) => (  ))}; */}
                    {/* <div key={index}> */}
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
                            type="text"
                            id="formArtworkPrice"
                            name="artworkPrice"
                            className="block w-full border border-gray-300 rounded p-2"
                            onChange={(e) => setPhotoName(e.target.value)}
                        />
                        <p className="text-gray-500 text-sm">Required, 10-50 Characters, Only Letters Or Spaces.
                        </p>
                    </div>
                    <div className="mb-4 p-3">
                        <label htmlFor="formArtworkPrice" className="block font-medium mb-2">photo Description:</label>
                        <input
                            type="text"
                            id="formArtworkPrice"
                            name="artworkPrice"
                            className="block w-full border border-gray-300 rounded p-2"
                            onChange={(e) => setPhotoDescription(e.target.value)}
                        />
                        <p className="text-gray-500 text-sm">Required, 50-100 Characters.</p>
                    </div>
                    <div className="mb-4 p-3">
                        <label htmlFor="formUploadImg" className="block font-medium">Upload Image:</label>
                        <input
                            type="file"
                            id="formUploadImg"
                            name="uploadImg"
                            accept=".jpg, .png, .jpeg"
                            className="block w-full border border-gray-300 rounded p-2"
                            onChange={(e) => setPhotoFile(e.target.files[0])}

                        />
                        <p className="text-gray-500 text-sm">Required, Image Format Should Be JPG Or PNG.</p>
                    </div>
                </div>

            </>)}

        </>
    )
}
