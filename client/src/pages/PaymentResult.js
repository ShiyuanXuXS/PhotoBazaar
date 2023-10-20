import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from "react-router-dom";

function PaymentResult() {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    let { purchase_id } = useParams();
    const url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('accessToken');

    const Navigate = useNavigate();
    useEffect(()=>{
        if (!token) {
            setError("Please log in")
            Navigate('/login')
            return
        } 
        axios.post(
                `${url}/api/purchases/checkPaymentStatus/${purchase_id}`,
                null,
                {
                headers: { Authorization: `Bearer ${token}` }
                }
            )
            .then(response=>{
                const { message: resMessage } = response.data;
                console.log(response.status)
                switch (response.status) {
                    case 200:   //not paid
                        setError("Your payment has not been received yet. Payment may be delayed. Please refresh or re-enter the payment page later to check.")
                        break;
                    case 201:   //paid
                        setMessage(resMessage)
                        break;
                    case 202:   //multiple paid
                        setError(resMessage)
                        break;
                    default:
                        setError("undefined error")
                        
                }
            })
            .catch(err=>{
                const { message: resMessage } = err.response.data;
                setError(resMessage);
            });
        
    },[])
    
    return (
        <div className="Payment">
            <Header/>
            <div>
            {error &&
                (
                    <div className="error-message h-96 flex flex-col items-center justify-center bg-white text-2xl font-medium">
                        <div className="text-red-500 mb-8">
                            {error}
                        </div>
                        <div className="button-container flex space-x-4">
                            <button
                                className="common-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => window.location.reload()}
                            >
                                Refresh
                            </button>
                            <button
                                onClick={() => Navigate('/cart')}
                                className="common-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Back to cart
                            </button>
                        </div>
                        
                    </div>
                )}
            {!error && message &&
                (
                    <div className="message h-96 flex flex-col items-center justify-center bg-white text-2xl font-medium">
                        <div className="text-green-500 mb-8">
                            {message}
                        </div>
                        <button
                            onClick={() => Navigate('/cart')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded whitespace-normal"
                        >
                            Back to cart
                        </button>
                    </div>
                )}
            </div>
            <Footer fixBottom={true} />
        </div>
    );
}

export default PaymentResult;