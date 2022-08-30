const modelProduct = require('../models/model');
const { getPostData } = require('../utils');

//@desc return all products
//@route GET /api/products
async function getProducts(req, res) {
  try {
    const products = await modelProduct.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

//@desc return a product
//@route GET /api/products/${id}
async function getProduct(req, res, id) {
  try {
    const product = await modelProduct.findByID(id);
    if (product) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(product));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `product not found ${id}` }));
    }
  } catch (error) {
    console.log(error);
  }
}

//@desc create a product
//@route POST /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    console.log(body);
    const { title, description, price } = JSON.parse(body);
    const product = { title, description, price };
    const newProduct = await modelProduct.create(product);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getProducts, getProduct, createProduct };
