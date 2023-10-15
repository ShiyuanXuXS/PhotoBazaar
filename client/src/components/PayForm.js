import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

import CheckoutForm from "../components/CheckoutForm";
console.log(process.env);
const stripeKey = process.env.REACT_APP_STRIPE_API_KEY;
const stripePromise = loadStripe(stripeKey);

function Payment(props) {
    const purchase_id = props.purchase_id;
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const url = process.env.REACT_APP_API_URL;
    const Navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        console.log(token);
        // check if is_paid
        const checkPaymentStatus = async () => {
            if (!token) {
                setError("Please log in")
                Navigate('/login')
                throw new Error();
            } else {
                try {
                    const response = await axios.post(
                        `${url}/api/purchases/checkPaymentStatus/${purchase_id}`,
                        null,
                        {
                        headers: { Authorization: `Bearer ${token}` }
                        }
                    );
                    const { message: resMessage } = response.data;
                    switch (response.status) {
                        case 200:   //not paid, show payment form without message
                            break;
                        case 201:   //paid
                            setMessage(resMessage)
                            throw new Error();
                        case 202:   //multiple paid
                            setError(resMessage)
                            throw new Error();
                        default:
                            setError("undefined error")
                            throw new Error();
                    }
                    
                } catch (err) {
                    // order not found
                    const { message: resMessage } = err.response.data;
                    setError(resMessage);
                    throw new Error();
                }
            }
            
        }

        //apply payment
        const fetchClientSecret = async () => {
            try {
                await checkPaymentStatus();
            } catch (err) {
                return;
            }
            
            // not paid(no message or error), apply payment intent
            try {
                const response = await axios.post(url + "/api/purchases/create-payment-intent", {
                    purchase_id: purchase_id
                }, {
                    headers: { "Content-Type": "application/json" }
                });
    
                const data = response.data;
                setClientSecret(data.clientSecret);
            } catch (err) {
                const { message: resMessage } = err.response.data;
                setError(resMessage)
            }
        };
        
        fetchClientSecret();
        
    }, []);

    const appearance = {
        theme: 'stripe',
        variables: {
        colorPrimary: '#9ee656',
        },
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="Payment">
            {error &&
                (
                    <div className="error-message h-96 flex flex-col items-center justify-center bg-white text-2xl font-medium">
                        <div className="text-red-500 mb-8">
                            {error}
                        </div>
                        <button
                            onClick={() => Navigate('/')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded whitespace-normal"
                        >
                            Back to cart
                        </button>
                    </div>
                )}
            {!error && message &&
                (
                    <div className="message h-96 flex flex-col items-center justify-center bg-white text-2xl font-medium">
                        <div className="text-green-500 mb-8">
                            {message}
                        </div>
                        <button
                            onClick={() => Navigate('/')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded whitespace-normal"
                        >
                            Back to cart
                        </button>
                    </div>
                )}
            {!error && !message && clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
            )
            }
        </div>
    );
}

export default Payment;