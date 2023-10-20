import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

function SearchBoxComponent({ page }) {
    const [option, setOption] = useState("keywords");
    const [searchKey, setSearchKey] = useState();
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("accessToken"));
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (token) {
            Axios.get(`http://localhost:3001/api/users/auth`, {
                headers: { accessToken: token },
            })
                .then((response) => {
                    setToken(response.data.token);
                    setUserId(response.data.user.id);
                })
                .catch(() => {
                    localStorage.removeItem("token");
                });
        }
    }
        , [token]);


    console.log(page);

    return (
        <div className={`${page === "search" ? "flex justify-center mt-5" : "absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            } p-4 searchBox`}>
            <div className={`${page === "search" ? "bg-gray-300 bg-opacity-70" : "bg-white bg-opacity-70"
                } rounded-lg p-2`}>
                <select className="bg-transparent px-2 py-1 mx-2 rounded-l-md outline-none"
                    onChange={(e) => setOption(e.target.value)}>
                    <option value="keywords" className="text-lg font-bold">Keywords</option>
                    <option value="tags">Tags</option>
                </select>
                <input
                    type="text"
                    placeholder="Search"
                    className="py-1 px-2 mx-2 rounded-md outline-none"
                    onChange={(e) => setSearchKey(e.target.value)}
                />
                <button className="bg-sky-500 hover:bg-sky-600 text-white rounded-r-md px-2 py-1 mx-2"
                    onClick={() => {
                        if (userId === null || userId === undefined) {
                            alert("Please login first!");
                            navigate('/Login')
                        } else if (searchKey === null || searchKey === undefined || searchKey === "") {
                            alert("Please enter a search key!");
                        }
                        else {
                            navigate(`/search/${option}/${searchKey}`, { state: { userId: userId } })
                        }
                    }
                    }>Search</button>
            </div>
        </div >)
}

export default SearchBoxComponent;