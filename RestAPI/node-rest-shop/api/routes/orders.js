const express = require('express');
const router =  express.Router();
const checkAuth = require('../middleware/check-auth');

const OrderContoller = require('../controllers/orders');

//Handle requests to /orders
router.get('/', checkAuth, OrderContoller.orders_get_all );

router.post('/', checkAuth, OrderContoller.orders_create_order);

router.get('/:orderId', checkAuth, OrderContoller.orders_get_order);

router.delete('/:orderId', checkAuth, OrderContoller.orders_delete_order);

module.exports = router;  