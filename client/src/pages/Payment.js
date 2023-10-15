import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import Header from '../components/Header';
import Footer from '../components/Footer';
import PayForm from '../components/PayForm'

import CheckoutForm from "../components/CheckoutForm";
console.log(process.env);
const stripeKey = process.env.REACT_APP_STRIPE_API_KEY;
const stripePromise = loadStripe(stripeKey);

function Payment() {
    const purchase_id="652226c2f905b8dea4f77130"
    

    return (
        <div className="Payment">
            <Header/>
            <PayForm purchase_id={purchase_id}/>
            <Footer/>
        </div>
    );
}

export default Payment;