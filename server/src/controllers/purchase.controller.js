const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const PurchaseModel = require('../models/purchase.model');

class PurchaseController {
  //todo: 
    makePayment = async (req, res) => {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: 1000, 
          currency: 'cad',
        });
        res.json({ clientSecret: paymentIntent.client_secret }); 
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    };


    async createPurchase(req, res) {
        //todo: auth
        try {
            const { seller_id, buyer_id, artwork_id, transaction_price } = req.body;
            if (!seller_id || !buyer_id || !artwork_id ) {
                return res.status(400).json({ message: 'Incomplete information, unable to purchase' });
            }
            const purchaseData = {
                seller_id:seller_id,
                buyer_id:buyer_id,
                artwork_id:artwork_id,
                purchase_time:new Date(),
                is_paid:!transaction_price ||transaction_price===0,
                transaction_price:transaction_price || 0
            };
            const newPurchaseId = await PurchaseModel.createPurchase(purchaseData);
            res.status(200).json({ message: 'Add to purchase list', purchaseId: newPurchaseId });
        } catch (error) {
            console.error('An error occurred while creating purchase record:', error);
            res.status(500).json({ message: 'Failed to create purchase record' });
        }
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
