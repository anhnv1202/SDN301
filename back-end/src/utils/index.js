const Feedback = require("../models/FeedbackModel")
const Product = require("../models/ProductModel")

const getAverageRateByProduct = async (productId) => {
    const numberRate = await Feedback.count({
        productId
    })
    const averageRate = await Feedback.aggregate([
        {
            $match: {
                productId: productId,
            },
        },
        {
            $group: {
                _id: productId,
                total: { $sum: '$rate' },
            },
        },
    ])
    console.log(averageRate)
    return Number((averageRate[0]?.total / numberRate).toFixed(1))
}

const getAverageRateByAccount = async (accountId) => {
    const numberRate = await Feedback.count({
        accountId
    })
    const averageRate = await Feedback.aggregate([
        {
            $match: {
                accountId: accountId,
            },
        },
        {
            $group: {
                _id: accountId,
                total: { $sum: '$rate' },
            },
        },
    ])
    return Number((averageRate[0]?.total / numberRate).toFixed(1))
}
const sold = async (id, quantity) => {
    const productExist = await Product.findOne({
        _id: id
    })
    let prod = await Product.findOneAndUpdate({ _id: id }, {
        numberSold: parseInt(productExist?.numberSold + quantity),
        quantity: parseInt(productExist?.quantity - quantity),
    }, { new: true });
    if (prod.quantity === 0) {
        prod = await Product.findOneAndUpdate({ _id: id }, {
            status: false,
        }, { new: true });
    }
    return prod;
};
const reSold = async (id, quantity) => {
    const productExist = await Product.findOne({
        _id: id
    })
    let prod = await Product.findOneAndUpdate({ _id: id }, {
        numberSold: parseInt(productExist?.numberSold - quantity),
        quantity: parseInt(productExist?.quantity + quantity),
    }, { new: true });
    return prod;
};


module.exports = {
    getAverageRateByProduct,
    getAverageRateByAccount, sold, reSold
}