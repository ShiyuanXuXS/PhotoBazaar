const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchase.controller');

router.post('/create-payment-intent', purchaseController.createPaymentIntent);
router.post('/checkPaymentStatus/:id', purchaseController.checkPaymentStatus);

router.post('/', purchaseController.createPurchase);

router.get('/', purchaseController.getAllPurchases);

router.get('/:id', purchaseController.getPurchaseById);
//payment
router.put('/:id', purchaseController.payPurchase);

router.delete('/:id', purchaseController.deletePurchase);

module.exports = router;
