const Product = require('../../models/ProductModels');
const _ = require('lodash');


/* Get all */
exports.getList = (req, res) => Product.find(req.params.id)
    .then((products) => {
        return res.status(200).json(products)
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({success: false, msg: 'Unable to get products'});
    });


/* Get by id */
exports.getSingle = (req, res) => Product.findOne({_id: req.params.id})
    .then((product) => {
        if (!product) {
            return Promise.reject(new Error({success: false, msg: 'Product not found'}));
        }
        res.status(200).json(product);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({success: false, msg: 'Unable to get product'});
    });


/* Create */
exports.create = (req, res) => {
    if (!(req.body instanceof Product)) {
        req.body = new Product(req.body);
    }

    req.body.save()
        .then((product) => {
            if (!product) {
                return Promise.reject(new Error({success: false, msg: 'Cannot create product'}));
            }
            res.status(200).json(product);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({success: false, msg: 'Unable to create product'})
        });
};


/* Update */
exports.update = (req, res) => Product.findOne({_id: req.params.id})
    .then(async (product) => {
        if (!product) {
            return Promise.reject(new Error({success: false, msg: 'Product not found'}));
        }

        const {name, description, price, quantity, imageUrl} = req.body;

        _.assign(product, {
            name, description, price, quantity, imageUrl
        });

        await product.save();

        res.status(200).json({
            success: true,
            data: product
        });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({success: false, msg: 'Unable to update product'});
    });


/* Delete */
exports.delete = (req, res) => Product.findByIdAndRemove(req.params.id)
    .then(() => res.status(200).json())
    .catch((err) => {
        console.error(err);

        res.status(500).json({success: false, msg: 'Unable to delete product'});
    });