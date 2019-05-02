/* Modlues */
const express = require('express');
const jwt = require('jsonwebtoken');
const authController = require(`${__basedir}/controllers/api/AuthController`);
const productController = require(`${__basedir}/controllers/api/ProductController`);
const OrderController = require(`${__basedir}/controllers/api/OrderController`);
const index = `${__basedir}/views/index.html`;
const router = express.Router();


/* Web Pages */
router.get('/', (req, res) => { res.sendFile(index); });
router.get('/register', (req, res) => { res.sendFile(index); });
router.get('/login', (req, res) => { res.sendFile(index); });
router.get('/products', (req, res) => { res.sendFile(index); });
router.get('/products/create', (req, res) => { res.sendFile(index); });
router.get('/products/:id', (req, res) => { res.sendFile(index); });
router.get('/orders', (req, res) => { res.sendFile(index); });
router.get('/orders/create', (req, res) => { res.sendFile(index); });
router.get('/orders/:id', (req, res) => { res.sendFile(index); });


/* APIs */
router.get('/api', function(req, res) { 
    res.status(200).send({success: true, msg: 'API Testing Channel'});
});
router.post('/api/register', authController.register);
router.post('/api/login', authController.login);
router.get('/api/products', productController.getList);
router.get('/api/products/:id', productController.getSingle);
router.post('/api/products', productController.create);
router.patch('/api/products/:id', productController.update);
router.delete('/api/products/:id', productController.delete);

router.get('/api/orders', OrderController.getList);
router.get('/api/orders/:id', OrderController.getSingle);
router.post('/api/orders', OrderController.create);
router.patch('/api/orders/:id', OrderController.update);
router.delete('/api/orders/:id', OrderController.delete);




module.exports = router;
