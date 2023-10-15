import React, { useState, useEffect, useContext, } from 'react';
import Axios from 'axios';
import * as Yup from "yup";
import UploadImagesBoxComponent from './UploadImagesBox';
import {
    S3Client,
    DeleteObjectCommand,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
// window.Buffer = window.Buffer || require("buffer").Buffer;

//S3 config
const config = {
    bucketName: "photobazarr",
    dirName: "artwork",
    region: "ca-central-1",
    credentials: {
        accessKeyId: process.env.REACT_APP_ACCESSKEYID,
        secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
    },
};

const client = new S3Client(config);

function AddArtworkComponent(props) {
    const url = process.env.REACT_APP_API_URL;
    const [tagList, setTagList] = useState([]);
    const [tagArray, setTagArray] = useState([]);
    const tags = tagArray.map(data => ({ tag_id: data }));
    const [token, setToken] = useState(localStorage.getItem('accessToken'))
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            Axios.get(`${url}/api/users/auth`, { headers: { accessToken: token } })
                .then(response => {
                    setToken(response.data.token);
                    setUser(response.data.user)
                }).catch(() => {
                    localStorage.removeItem('token');
                });
        }
    }, []);

    const userId = user.id;

    const [imagesBoxes, setImagesBoxes] = useState([{
        index: 1,
        status: "show",
    }]);

    const handleAddImagesBox = (event) => {
        event.preventDefault();
        const newImagesBox = {
            index: imagesBoxes.length + 1,
            status: "show",
        };

        const newImagesBoxes = [...imagesBoxes, newImagesBox];
        setImagesBoxes(newImagesBoxes);
        if (newImagesBoxes.length === 8) {
            // disable the add image button
            alert("You can only upload 8 images.");
        }
    };

    const handleShowImagesBox = (index) => {
        //change status in newImagesBoxes based on index
        const updatedUploadImages = imagesBoxes.filter((imagesBox) => imagesBox.index !== index);
        setImagesBoxes(updatedUploadImages);
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

    // const [author_id, setAuthor_id] = useState('652226c2f905b8dea4f7712d'); //TODO: replace 1 with user id
    // const author_id = '652226c2f905b8dea4f7712d';
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState();
    const [uploadImg, setUploadImg] = useState([]);

    const handleSaveCoverImage = (event) => {
        event.preventDefault();
        const data = {
            index: 0,
            name: title,
            description: "cover image",
            file: event.target.files[0],
        };

        const newUploadImg = [...uploadImg, data];
        setUploadImg(newUploadImg);
    }
    const handleSaveChildrenPhoto = (data) => {

        const updatedUploadImages = uploadImg.filter((photo) => photo.index !== data.index);
        const newUploadImg = [...updatedUploadImages, data];
        setUploadImg(newUploadImg);
    }
    const saveArtwork = (event) => {
        event.preventDefault();

        //Validate
        validationSchema
            .validate({ title, description, price }, { abortEarly: false })
            .then(() => {
                //Validate Cover Image
                if (uploadImg === null || uploadImg[0] === null ||
                    uploadImg[0] === undefined || uploadImg[0].file.size > 5000000) {
                    alert("Please select a file less than 5MB");
                    return;
                } else {
                    console.log(uploadImg);
                    // save cover image to s3 bucket
                    // Create an array to store promises for image uploads
                    const uploadPromises = [];
                    const date = new Date();
                    for (const data of uploadImg) {
                        const timestamp = date.getTime();
                        const newFileName = `${timestamp}_${userId}.${data.file.name.split(".").pop()}`; //TODO: replace user1_id with user id

                        const params = {
                            Bucket: config.bucketName,
                            Key: "artwork/" + newFileName,
                            Body: data.file,
                        };
                        // Create a promise for each image upload
                        const uploadPromise = client
                            .send(new PutObjectCommand(params))
                            .then((data) => {
                                console.log("Image uploaded successfully:", data);
                                // setNewFileNames([...newFileNames, newFileName]);
                                return newFileName;
                            })
                            .catch((error) => {
                                console.error("Error uploading image:", error);
                                return null;
                            });
                        uploadPromises.push(uploadPromise);
                    }
                    // Use Promise.all to wait for all image uploads to complete
                    Promise.all(uploadPromises)
                        .then((fileNames) => {
                            // 'fileNames' will contain an array of successfully uploaded file names
                            console.log("All images uploaded successfully.", fileNames);

                            // get photos data
                            const photos = uploadImg.map((data, index) => {
                                return {
                                    photo_name: data.name,
                                    description: data.description,
                                    file_url: `https://${config.bucketName}.s3.${config.region}.amazonaws.com/${config.dirName}/${fileNames[index]}`,
                                    upload_time: date,
                                    modify_time: date,
                                }
                            });

                            console.log(photos);
                            console.log(photos.slice(1));

                            // save artwork to database
                            Axios.post("http://localhost:3001/api/artworks", {
                                author_id: userId,
                                title: title,
                                description: description,
                                price: parseFloat(price),
                                cover_url: `https://${config.bucketName}.s3.${config.region}.amazonaws.com/${config.dirName}/${fileNames[0]}`,
                                tags: tags,
                                photos: photos.slice(1),
                            }).then((response) => {
                                console.log(response);
                                alert("Artwork saved successfully!");
                                // Navigate(`/artwork/${userId}`);
                                // window.location.reload();

                                // add artwork_id to user
                                console.log(response.data._id);
                                const my_assets = [{ "artwork_id": response.data._id }];
                                console.log(my_assets);
                                Axios.patch(`http://localhost:3001/api/users/my_assets/${userId}`, {
                                    my_assets: my_assets,
                                }).then((response) => {
                                    console.log(response);
                                })
                                    .catch((error) => {
                                        console.error(error);
                                    });

                                // add tag count


                            })
                                .catch((error) => {
                                    console.error(error);
                                });
                        })
                        .catch((uploadErrors) => {
                            console.error("Error uploading images:", uploadErrors);
                        });
                }
            })
            .catch((validationErrors) => {
                console.error("Validation errors:", validationErrors);
            });
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(1, "Title must be at least 10 Characters, Only Letters Or Spaces.")
            .max(50, "Title must not exceed 50 characters.")
            .matches(/^[a-zA-Z ]*$/, "Only letters and spaces are allowed")
            .required("Title is required"),
        description: Yup.string()
            .min(5, "Description must be at least 5 characters")
            .max(100, "Description must not exceed 100 characters")
            .matches(
                /^[a-zA-Z0-9 ./,_()-]*$/,
                "Item name must only contain uppercase, lowercase, digits, spaces, and: ./,_()-"
            )
            .required("Description is required"),
        price: Yup.number()
            .min(0, "price must be equal or higher than 0")
            .required("price is required")
            .test("is-decimal", "Price must be a decimal number", (value) => {
                if (value === undefined) return true; // Allow undefined values
                return /^\d+(\.\d+)?$/.test(value);
            }),

    });

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
                                onChange={(e) => setTitle(e.target.value)}
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
                                onChange={(e) => setDescription(e.target.value)}
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
                                onChange={handleSaveCoverImage}
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
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <p className="text-gray-500 text-sm">Required, must be equal or higher than 0.</p>
                        </div>
                        <div className='flex items-center mb-4'>
                            <div className='text-xl font-bold capitalize'>Photo</div>
                            <button className={"items-center px-1 bg-blue"} onClick={handleAddImagesBox} disabled={imagesBoxes.length >= 8}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={3}
                                    stroke={imagesBoxes.length >= 8 ? 'gray' : 'blue'}
                                    className="w-6 h-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-500 text-sm">Required, maximum 8 photos.</p>

                        <div className="flex flex-wrap">
                            {imagesBoxes.map((imagesBox, index) => (
                                <div key={index} className="w-1/4"> {/* w-1/4 means each element takes 25% width */}
                                    <UploadImagesBoxComponent
                                        key={index}
                                        index={imagesBox.index}
                                        status={imagesBox.status}
                                        handleShowImagesBox={(index) => handleShowImagesBox(index)}
                                        handleSaveChildrenPhoto={handleSaveChildrenPhoto}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center mt-4 font-bold">
                            <button
                                onClick={(e) => saveArtwork(e)}
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