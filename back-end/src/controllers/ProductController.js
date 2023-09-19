
const { validationResult } = require('express-validator');
const ProductServices = require('../services/ProductServices');
const Product = require('../models/ProductModel');
const createProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const response = await ProductServices.createProduct(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const createRandomProduct = async (req, res) => {
    for (var i = 0; i < 10; i++) {
        await Product.create({
            name: ` product random2 ${i}`,
            image: `image ${i}`,
            quantity: 10 + `${i}`,
            price: 100000 + `${i}` * 1000,
            description: 'an cung ngon',
            subCategoryId: '6506abd4ad570d7d9bfb0bfa'
        })
    }
}
const updateProduct = async (req, res) => {
    const id = req.params.id
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const response = await ProductServices.updateProduct(id, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getDetailProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await ProductServices.getDetailProduct(productId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getAllProduct = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const response = await ProductServices.getAllProduct(page, limit)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const deleteProduct = async (req, res) => {
    const productId = req.params.id
    try {
        const response = await ProductServices.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getAllProductBySubCategoryId = async (req, res) => {
    try {
        const { page, limit, subCategoryId } = req.query;
        const response = await ProductServices.getAllProductBySubCategoryId(page, limit, subCategoryId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const getAllProductByCategoryId = async (req, res) => {
    try {
        const { page, limit, categoryId } = req.query;
        const response = await ProductServices.getAllProductByCategoryId(page, limit, categoryId)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            status: 'ERR',
            message: error.message
        })
    }
}
const searchProductByName = async (req, res) => {
    try {
        const { page, limit, name } = req.query;
        const response = await ProductServices.searchProductByName(page, limit, name)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
module.exports = {
    createProduct, updateProduct,
    getDetailProduct, getAllProduct,
    deleteProduct, getAllProductBySubCategoryId,
    getAllProductByCategoryId, createRandomProduct,
    searchProductByName
}