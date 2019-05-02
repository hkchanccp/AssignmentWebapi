const Order = require('../../models/OrderModels');
const _ = require('lodash');


/* Get all */
exports.getList = (req, res) => Order.find(req.params.id)
    .then((Order) => {
        return res.status(200).json(Order)
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({success: false, msg: 'Unable to get Orders'});
    });


/* Get by id */
exports.getSingle = (req, res) => Order.findOne({_id: req.params.id})
    .then((Order) => {
        if (!Order) {
            return Promise.reject(new Error({success: false, msg: 'Order not found'}));
        }
        res.status(200).json(Order);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({success: false, msg: 'Unable to get Order'});
    });


/* Create */
exports.create = (req, res) => {
    if (!(req.body instanceof Order)) {
        req.body = new Order(req.body);
    }

    req.body.save()
        .then((Order) => {
            if (!Order) {
                return Promise.reject(new Error({success: false, msg: 'Cannot createOrder'}));
            }
            res.status(200).json(Order);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({success: false, msg: 'Unable to create Order'})
        });
};


/* Update */
exports.update = (req, res) => Order.findOne({_id: req.params.id})
    .then(async (Order) => {
        if (!Order) {
            return Promise.reject(new Error({success: false, msg: 'Order not found'}));
        }

        const {name, quantity, delivery_address} = req.body;

        _.assign(Order, {
            name, quantity,delivery_address
        });

        await Order.save();

        res.status(200).json({
            success: true,
            data: Order
        });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({success: false, msg: 'Unable to update Order'});
    });


/* Delete */
exports.delete = (req, res) => Order.findByIdAndRemove(req.params.id)
    .then(() => res.status(200).json())
    .catch((err) => {
        console.error(err);

        res.status(500).json({success: false, msg: 'Unable to delete Order'});
    });