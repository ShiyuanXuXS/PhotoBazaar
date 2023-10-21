import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminTag() {
    const [addTag, setAddTag] = useState(null);
    const [editTag, setEditTag] = useState("");

    const [searchFor, setSearchFor] = useState('');
    const [tags, setTags] = useState(null);
    const url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('accessToken');
    const [page, setPage] = useState(1); 
    const perPage= 5; 
    
    const searchTags = async () => {
        setTags(null)
        if (!searchFor) return;
        try {
        const response = await axios.get(`${url}/api/tags`,{
            headers: { Authorization: `Bearer ${token}` },
            params: { page, perPage, searchFor },
            }); 
            console.log(response.data)
            // const newTags=response.data
        setTags(response.data);
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
      };
    useEffect(()=>{
        searchTags()
    },[page])

    const updateTag=async()=>{
        if (editTag==="")return;
        if (editTag.count!=Math.floor(editTag.count))return;//use '!=" because type needn't match
        console.log("confirmed")
        try {
            const response = await axios.put(`${url}/api/tags/${editTag._id}`,
                {
                    tag:editTag.tag,
                    count:editTag.count
                },{
                    headers: { Authorization: `Bearer ${token}` },
                }); 
                console.log(response.data)
                const newTags=tags.map(tag=>{
                    if (tag._id===editTag._id) {return editTag}else{return tag}
                })
                setTags(newTags);
        } catch (error) {
            console.error('Error fetching data:', error);
            return;
        }
        setEditTag("")
    }

    const confirmAdd=async()=>{
        if (addTag.tag==="") return;
        try {
            const response = await axios.post(`${url}/api/tags`,
                {
                    tag:addTag.tag,
                    count:addTag.count
                },{
                    headers: { Authorization: `Bearer ${token}` },
                }); 
                setAddTag({...addTag,_id:response.data.tagId})
                console.log(response.data)
                
        } catch (error) {
            console.error('Error fetching data:', error);
            return;
        }
    }

    return (
        <div className="p-4 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:border-blue-500 transform hover:-translate-y-1 transition duration-300">
        <h3 className="text-xl font-bold text-blue-600 mb-4">Tags Management</h3>
        <label htmlFor="purchaseId" className="block text-sm font-medium text-gray-600 text-left mx-2">
            Enter text for search:
        </label>
        <div className='flex items-center'>
            <input
                type="text"
                id="tagSearch"
                value={searchFor}
                onChange={(e) => setSearchFor(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
            />
            <button 
                onClick={searchTags}
                className="mt-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mx-10">
                Search
            </button>
        </div>
        <div className="add-container my-2 p-2 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:border-blue-500 duration-300 flex items-center">
            {addTag && addTag._id && (
                <p>ID:{addTag._id} Tag:{addTag.tag} Count:{addTag.count} added</p>
            )}
            {addTag && !addTag._id && 
                (<>
                    <input
                    type="text"
                    placeholder="Enter Tag"
                    value={addTag.tag}
                    onChange={(e) => setAddTag({ ...addTag, tag: e.target.value })}
                    className="w-2/5 block border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
                />
                <input
                    type="number"
                    placeholder="Enter Count"
                    value={addTag.count}
                    onChange={(e) => setAddTag({ ...addTag, count: parseInt(e.target.value) })}
                    className="w-2/5 block border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
                />
                </>)
                
            }
            {(!addTag || addTag._id) && 
                (<button
                    onClick={()=>setAddTag({tag:"",count:0})}
                    className='ml-auto font-serif capitalize p-1 text-sm inline ml-2 rounded-lg bg-sky-600 text-white mt-2'
                >
                    Add
                </button>)
            }
            {addTag && !addTag._id &&
                (<button
                    onClick={confirmAdd}
                    className='ml-auto font-serif capitalize p-1 text-sm inline ml-2 rounded-lg bg-red-900 text-white mt-2'
                >
                    confirm
                </button>)
            }
        </div>

        {tags && (
            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tag
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Count
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            OP
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tags.map((tag) => (
                        <tr key={tag._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">{tag._id}</td>

                            {(editTag._id!==tag._id) ? (
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">{tag.tag}</td>
                                    ):(
                                <td>
                                    <input
                                        type="text"
                                        value={editTag.tag}
                                        onChange={(e) => setEditTag({...editTag,tag:e.target.value})}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
                                    />
                                </td>
                            )}

                            {(editTag._id!==tag._id) ? (
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">{tag.count}</td>
                                    ):(
                                <td>
                                    <input
                                        type="number"
                                        value={editTag.count}
                                        onChange={(e) => setEditTag({...editTag,count:e.target.value})}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
                                    />
                                </td>
                            )}
                            {(editTag._id!==tag._id) ? (
                                <td>
                                    <button
                                        className={`font-serif capitalize p-1 text-sm inline ml-2 rounded-lg bg-sky-600 text-white mt-2`}
                                        onClick={() =>setEditTag(tag)}
                                    >
                                        Modify
                                    </button>
                                </td>
                                
                                ):(
                                <td>
                                    <button
                                        className={`font-serif capitalize p-1 text-sm inline ml-2 rounded-lg bg-red-900 text-white mt-2`}
                                        onClick={()=>{
                                            if (editTag.tag===tag.tag && editTag.count===tag.count){
                                                setEditTag("")
                                            }else{
                                                updateTag()
                                            }
                                            }}
                                    >
                                        Confirm
                                    </button>
                                </td>
                            )}
                        </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
                <button
                    className={`font-serif capitalize p-1 text-sm inline ml-2 rounded-lg bg-sky-600 text-white mt-2`}
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className="text-blue-500 font-bold">
                    Page {page}
                </span>
                <button
                    className={`font-serif capitalize p-1 text-sm inline ml-2 rounded-lg bg-sky-600 text-white mt-2`}
                    onClick={() => handlePageChange(page + 1)}
                    disabled={tags.length <perPage}
                >
                    Next
                </button>
                </div>
            </div>
            
        )}
        </div>
    );
}

export default AdminTag;
