const http = require('http');
const {
  getProducts,
  getProduct,
  createProduct,
} = require('./controllers/controller');
//checks if page exists for a specific product
const urlForProductPage = /\/api\/products\/([0-9]+)/;

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/api/products') {
      getProducts(req, res);
    } else if (req.url.match(urlForProductPage)) {
      const id = req.url.split('/')[3];
      getProduct(req, res, id);
    }
  } else if (req.method === 'POST') {
    if (req.url === '/api/products') {
      createProduct(req, res);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'route not found' }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log('server running');
});
