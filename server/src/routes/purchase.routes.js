const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchase.controller');

//create payment
router.post('/create-payment-intent', purchaseController.createPaymentIntent);
//check payment status
router.post('/checkPaymentStatus/:id', purchaseController.checkPaymentStatus);

router.post('/', purchaseController.createPurchase);

router.get('/', purchaseController.getAllPurchases);

router.get('/:id', purchaseController.getPurchaseById);
//payment
// router.put('/:id', purchaseController.payPurchase);

router.delete('/:id', purchaseController.deletePurchase);

// get all unpaid purchase records by buyerId
router.get('/unpaid/:buyerId', purchaseController.getUnpaidPurchasesByBuyerId);

module.exports = router;
