const modelProduct = require('../models/model');

async function getProducts(req, res) {
  try {
    const products = await modelProduct.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

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

module.exports = { getProducts, getProduct };
