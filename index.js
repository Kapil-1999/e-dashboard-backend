const express = require('express');
require('./db/config');
const User = require('./model/userModel');
const Product = require('./model/productModel')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password
  res.send(result)
})

app.post('/login', async(req, res) => {
  if(req.body?.email && req.body?.password) {
    let user = await User.findOne(req.body).select('-password');
    if(user) {
      res.send({result : user})
    } else {
      res.send({result : 'User Not Found'})
    }
  } else {
    res.send({result : 'User Not Found'})
  }
})

app.post('/add-product' , async(req, res) => {
  let product = new Product(req.body)
  let result = await product.save();
  result = result.toObject();
  res.send(result)

})

app.listen(5000)