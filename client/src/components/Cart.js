import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

function CartComponent({ buyerId }) {
    const [artworkInCart, setArtworkInCart] = useState([]); // all the items in cart
    const [saveForLater, setSaveForLater] = useState([]); // all the items in save for later

    console.log(buyerId);

    useEffect(() => {
        // get all the items in cart
        //     Axios.get(`http://localhost:3001/api/purchases/unpaid/${buyerId}`)
        //         .then((response) => {
        //             console.log(response.data);
        //             setArtworkInCart(response.data);
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // }

        //test
        Axios.get(`http://localhost:3001/api/purchases`)
            .then((response) => {
                console.log(response.data);
                const unpaidPurchase = response.data;
                // extract all artwork id from unpaid purchase, store in artworkInCart
                if (unpaidPurchase.length > 0) {
                    const uppaidArtworkIds = unpaidPurchase.map((purchase) => purchase.artwork_id);
                    // get all artwork info from artwork id
                    const fetchArtworkData = async (artworkId) => {
                        try {
                            const response = await Axios.get(`http://localhost:3001/api/artworks/${artworkId}`);
                            return response.data;
                        } catch (error) {
                            console.log(error);
                            return null;
                        }
                    };

                    Promise.all(uppaidArtworkIds.map((artworkId) => fetchArtworkData(artworkId)))
                        .then((artworkData) => {
                            console.log(artworkData);
                            setArtworkInCart(artworkData);
                        }
                        )
                }
            })
            .catch((error) => {
                console.log(error);
            });


    }, []);
    console.log(artworkInCart);
    return (
        <div className="cart m-5 p-5 capitalize">
            <div className="text-3xl font-bold subpixel-antialiased p-3 m-5">shopping cart</div>
            <div className='text-xl font-normal p-3 m-5 mt-0 text-right text-red-600 hover:text-red-600/75 underline underline-offset-auto'>Remove all</div>

            {artworkInCart == null ? (<p>You cart is empty!</p>) :
                (<>{artworkInCart.map((artwork, index) => (
                    <div key={index} className="cartItems flex p-3 m-5">
                        <div className="imageBox w-1/4 border-2">
                            <img className="w-60 h-60 m-auto my-3"></img>
                        </div>
                        <div className="generalInfo w-1/4 flex flex-col items-center justify-center">title</div>
                        <div className="photos w-1/4 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <span className="pl-2">numbers of photo</span>
                        </div>
                        <div className="price w-1/4 flex flex-col items-center justify-center">
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="pl-2">price</span>
                            </div>
                            <div className="text-base underline text-red-600 hover:text-red-600/75">save for later</div>
                            <div className="text-base underline text-red-600 hover:text-red-600/75">remove</div>
                        </div>
                    </div>))}</>)}

            <div className="subTotal flex p-5 m-5 border-t-2">
                <div className="text-right w-3/4">
                    <div className="text-xl font-bold">Subtotal</div>
                    <div className="text-l ">items</div>
                </div>
                <div className="text-center w-1/4">
                    <div className="text-xl font-bold">$0.00</div>
                </div>
            </div>
            <div className="flex p-3 m-5">
                <div className="w-3/4"></div>
                <button className="w-1/4 capitalize bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-200 mr-4">check out</button>
            </div>
        </div>
    )
}
export default CartComponent;