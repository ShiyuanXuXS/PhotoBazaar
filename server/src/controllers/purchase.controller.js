const dotenv = require("dotenv");
dotenv.config()
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY || 'default-secret-key';

const PurchaseModel = require('../models/purchase.model');
const ArtworkModel = require('../models/artwork.model');

class PurchaseController {


    async createPaymentIntent(req, res) {
<<<<<<< Updated upstream
        
        const { authorization } = req.headers;
        if (!authorization) {return  res.status(400).json({ message: "No authorization" }); }
        const token = authorization.split(' ')[1];
        if (!token) { res.status(400).json({ message: "No token" }); }
        const { purchase_id } = req.body;
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                return res.status(400).json({ error: "Token is invalid" });
            }
            console.log(decoded)
            const user_id = decoded.id;

            let purchase;
            try {
                purchase = await PurchaseModel.getPurchaseById(purchase_id);
            } catch (err) {
                return res.status(400).json({ message: 'Order not found' });
            }
            
            if ( !purchase) {
                return res.status(400).json({ message: 'Order not found' });
            }
            if (purchase.buyer_id !== user_id) {
                return  res.status(400).json({ message: "No authorization" });
            }
            if ( purchase.is_paid) {
                return res.status(400).json({ message: 'Already paid, please do not pay again' });
            }
            let paymentIntent;
            try {
                paymentIntent = await stripe.paymentIntents.create({
                amount: purchase.transaction_price*100,
                currency: 'cad',
                automatic_payment_methods: {
                    enabled: true,
                },
                });
                const updatedTransactionRef = purchase.transaction_ref || [];
                updatedTransactionRef.push(paymentIntent.id);
                await PurchaseModel.updatePurchase(purchase_id, { transaction_ref: updatedTransactionRef });
                res.status(200).json({clientSecret: paymentIntent.client_secret,});
            } catch (err) {
                res.status(500).json({message:"create payment failed"})
            }
=======
        const { purchase_id } = req.body;
        console.log(purchase_id);
        let purchase;
        try {
            purchase = await PurchaseModel.getPurchaseById(purchase_id);
        } catch (err) {
            return res.status(400).json({ message: 'Order not found' });
        }
        
        if ( !purchase) {
            return res.status(400).json({ message: 'Order not found' });
        }
        if ( purchase.is_paid) {
            return res.status(400).json({ message: 'Already paid, please do not pay again' });
        }
        let paymentIntent;
        try {
            paymentIntent = await stripe.paymentIntents.create({
            amount: purchase.transaction_price*100,
            currency: 'cad',
            automatic_payment_methods: {
                enabled: true,
            },
            });
            const updatedTransactionRef = purchase.transaction_ref || [];
            updatedTransactionRef.push(paymentIntent.id);
            await PurchaseModel.updatePurchase(purchase_id, { transaction_ref: updatedTransactionRef });
            res.status(200).json({clientSecret: paymentIntent.client_secret,});
        } catch (err) {
            res.status(500).json({message:"create payment failed"})
        }
         console.log(paymentIntent)
        
>>>>>>> Stashed changes

        });
    }

    async checkPaymentStatus(req, res) {
<<<<<<< Updated upstream
        const { authorization } = req.headers;
        if (!authorization) {return  res.status(400).json({ message: "No authorization" }); }
        const token = authorization.split(' ')[1];
        if (!token) { res.status(400).json({ message: "No token" }); }
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                return res.status(400).json({ error: "Token is invalid" });
            }
            console.log(decoded)
            const user_id = decoded.id;
            try {
                const { id } = req.params;
                const purchase = await PurchaseModel.getPurchaseById(id);            
                if (purchase.buyer_id !== user_id) {
                    return  res.status(400).json({ message: "No authorization" });
                }
                const successfulPayments = [];
                for (const transactionId of purchase.transaction_ref) {
                    const paymentIntent = await stripe.paymentIntents.retrieve(transactionId);
                    if (paymentIntent.status === 'succeeded') {
                        successfulPayments.push(transactionId);
                    }
                }

                if (successfulPayments.length === 0) {
                    return res.status(200).json({ message:'No payments have succeeded.' });
                } else {
                    await PurchaseModel.updatePurchase(id, { is_paid: true });
                    if (successfulPayments.length === 1) {
                        return res.status(201).json({ message:'Payment succeeded.' });
                    } else {
                        return res.status(202).json({ message: 'Multiple payments detected. Please contact an administrator for assistance.'});
                    } 
                    
                }
                
            } catch (error) {
            console.error('retrieve error:', error);
            return res.status(500).json({message:"retrieve order failed"})
            }


        });
        // console.log(token)
        
=======
        try {
            const { id } = req.params;
            const purchase = await PurchaseModel.getPurchaseById(id);            

            const successfulPayments = [];
            for (const transactionId of purchase.transaction_ref) {
                const paymentIntent = await stripe.paymentIntents.retrieve(transactionId);
                if (paymentIntent.status === 'succeeded') {
                    successfulPayments.push(transactionId);
                }
            }

            if (successfulPayments.length === 0) {
                return res.status(200).json({ message:'No payments have succeeded.' });
            } else {
                await PurchaseModel.updatePurchase(id, { is_paid: true });
                if (successfulPayments.length === 1) {
                    return res.status(201).json({ message:'Payment succeeded.' });
                } else {
                    return res.status(202).json({ message: 'Multiple payments detected. Please contact an administrator for assistance.'});
                } 
                
            }
            
        } catch (error) {
          console.error('retrieve error:', error);
          return res.status(500).json({message:"retrieve order failed"})
        }
>>>>>>> Stashed changes
      }

    async createPurchase(req, res) {
        const { authorization } = req.headers;
        if (!authorization) {return  res.status(400).json({ message: "No authorization" }); }
        const token = authorization.split(' ')[1];
        if (!token) { res.status(400).json({ message: "No token" }); }
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                return res.status(400).json({ error: "Token is invalid" });
            }
            console.log(decoded)
            const user_id = decoded.id;

            try {
                const { artwork_id } = req.body;
                if (!artwork_id ) {
                    return res.status(400).json({ message: 'Artwork_id needed' });
                }
                const artwork = await ArtworkModel.findOne({ _id: artwork_id })
                console.log(artwork)
                if (!artwork) {
                    return res.status(400).json({ message: 'Artwork not found' });
                }
                const purchaseData = {
                    seller_id:artwork.author_id,
                    buyer_id:user_id,
                    artwork_id:artwork_id,
                    purchase_time:new Date(),
                    is_paid:!artwork.price ||artwork.price===0,
                    transaction_price:artwork.price || 0
                };
                const newPurchaseId = await PurchaseModel.createPurchase(purchaseData);
                res.status(200).json({ message: 'Add to purchase list', purchaseId: newPurchaseId });
            } catch (error) {
                console.error('An error occurred while creating purchase record:', error);
                res.status(500).json({ message: 'Failed to create purchase record' });
            }
        });

        
    }

    async getAllPurchases(req, res) {
        //todo: auth
        try {
            const purchases = await PurchaseModel.getAllPurchases();
            res.status(200).json(purchases);
        } catch (error) {
            console.error('An error occurred while retrieving purchase history:', error);
            res.status(500).json({ message: 'An error occurred while retrieving purchase history' });
        }
    }

    async getPurchaseById(req, res) {
        //todo: auth
        try {
            const { id } = req.params;
            const purchase = await PurchaseModel.getPurchaseById(id);
            if (!purchase) {
                return res.status(404).json({ message: 'Purchase record not found' });
            }
            res.status(200).json(purchase);
        } catch (error) {
            console.error('An error occurred while getting purchase records by ID:', error);
            res.status(500).json({ message: 'An error occurred while getting purchase records by ID' });
        }
    }

    async payPurchase(req, res) {
        //todo: add payment
        try {
            const { id } = req.params;
            const existingPurchase = await PurchaseModel.getPurchaseById(id);
            if (!existingPurchase) {
                return res.status(404).json({ message: 'Purchase record not found' });
            }
            
          const updatedData = {
            is_paid: true,
                pay_time: new Date(),
                transaction_ref:"TODO: get ref from stripe" 
            };
            const updatedCount = await PurchaseModel.updatePurchase(id, updatedData);
            if (updatedCount === 0) {
                return res.status(404).json({ message: 'Purchase record not found' });
            }
            res.status(200).json({ message: 'Purchase is paid' });
        } catch (error) {
            console.error('Payment failed:', error);
            res.status(500).json({ message: 'Payment failed' });
        }
    }

    async deletePurchase(req, res) {
        //todo: auth
        try {
            const { id } = req.params;
            const deletedCount = await PurchaseModel.deletePurchase(id);
            if (deletedCount === 0) {
                return res.status(404).json({ message: 'Purchase record not found' });
            }
            res.status(200).json({ message: 'Purchase history has been deleted' });
        } catch (error) {
            console.error('An error occurred while deleting purchase history:', error);
            res.status(500).json({ message: 'Failed to delete purchase history' });
        }
    }
}

module.exports = new PurchaseController();
