const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchase.controller');

//create payment
router.post('/create-payment-intent', purchaseController.createPaymentIntent);
<<<<<<< Updated upstream
//check payment status
=======
>>>>>>> Stashed changes
router.post('/checkPaymentStatus/:id', purchaseController.checkPaymentStatus);

router.post('/', purchaseController.createPurchase);

router.get('/', purchaseController.getAllPurchases);

router.get('/:id', purchaseController.getPurchaseById);
//payment
// router.put('/:id', purchaseController.payPurchase);

router.delete('/:id', purchaseController.deletePurchase);

module.exports = router;
