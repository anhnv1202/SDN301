const Account = require("../models/AccountModel");
const Order = require("../models/OrderModel");
const { reSold } = require("../utils");
const LIMIT_ORDER = 10
const startReceiveOrder = (shippingId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { orderId } = data;
            const newOrder = await Order.findByIdAndUpdate(orderId, {
                isDelivery: true,
                shippingId: shippingId,
                isCancel: false,
                reasonCancel: ''
            }, { new: true })
                .populate('addressShippingId')
            if (newOrder) {
                resolve({
                    status: 'OK',
                    message: 'Start shipping',
                    newOrder: newOrder
                })
            }
        } catch (err) {
            reject(err)
        }
    })
}
const successDeliveryOrder = (shippingId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { orderId } = data;
            const newOrder = await Order.findByIdAndUpdate(orderId, {
                isDelivery: false,
                isDeliverySuccess: true,
                shippingId: shippingId,
                isCancel: false,
                reasonCancel: ''
            }, { new: true })
                .populate('addressShippingId')
            if (newOrder) {
                resolve({
                    status: 'OK',
                    message: 'Shipping successfully',
                    newOrder: newOrder
                })
            }

        } catch (err) {
            reject(err)
        }
    })
}
const failedDeliveryOrder = (shippingId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { orderId, message } = data;
            const newOrder = await Order.findByIdAndUpdate(orderId, {
                isDelivery: false,
                isDeliverySuccess: false,
                isCancel: true,
                reasonCancel: message,
                shippingId: shippingId
            }, { new: true })
                .populate('addressShippingId')
            if (newOrder) {
                resolve({
                    status: 'OK',
                    message: 'Shipping failed',
                    newOrder: newOrder
                })
            }

        } catch (err) {
            reject(err)
        }
    })
}
const returnOrder = (shippingId, orderId, message) => {
    return new Promise(async (resolve, reject) => {
        try {
            const orderExist = await Order.findOne({
                _id: orderId
            })
            for (i = 0; i < orderExist.cart.length; i++) {
                //update Product
                reSold(orderExist.cart[i].productId, orderExist.cart[i].quantity)
            }
            const newOrder = await Order.findByIdAndUpdate(orderId, {
                isDelivery: false,
                isDeliverySuccess: false,
                isCancel: true,
                reasonCancel: message,
                shippingId: shippingId,
                status: false
            }, { new: true })
                .populate('addressShippingId')

            if (newOrder) {
                resolve({
                    status: 'OK',
                    message: 'Return Order successfully',
                    newOrder: newOrder
                })
            }

        } catch (err) {
            reject(err)
        }
    })
}
const getAllOrder = (page = 1, limit = LIMIT_ORDER) => {
    return new Promise(async (resolve, reject) => {
        try {
            var skipNumber = (page - 1) * limit;
            const totalOrder = await Order.count()
            const allOrder = await Order.find({})
                .skip(skipNumber)
                .limit(limit)
                .populate('addressShippingId')
            resolve({
                status: 'OK',
                data: allOrder,
                totalOrder,
                currentPage: parseInt(page),
                limit: parseInt(limit)
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getDetailOrder = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const orderDetail = await Order.findOne({
                _id: orderId
            })
                .populate('addressShippingId')
            resolve({
                status: 'OK',
                data: orderDetail,
            })
        } catch (err) {
            reject(err)
        }
    })
}
const getAllOrderSuccessByShipping = (shippingId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find({
                shippingId,  isDeliverySuccess: true
            })
                .populate('addressShippingId')
            resolve({
                status: 'OK',
                data: allOrder,
            })
        } catch (err) {
            reject(err)
        }
    })
}


module.exports = {
    startReceiveOrder, successDeliveryOrder, failedDeliveryOrder,
    getAllOrder, getDetailOrder, returnOrder, getAllOrderSuccessByShipping
}