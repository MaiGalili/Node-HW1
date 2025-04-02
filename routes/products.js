const express = require("express");
const router = express.Router();
const data = require("../data");
const path = require("path");

router.get("/", (req, res) => {
  res.json({ users: data.products });
});

router.get('/:id',(req,res)=>{
  const {id} = req.params;
  const product = data.products.find((product)=> product.id === parseInt(id))
  if(product)
  {
    res.json(product);
  }
else{
  res.status(404).json({ message: `User with ID: ${id} not found` });
}
})

router.post('/',(req,res)=>{
  const productsData = req.body
  console.log(productsData)
  const findOne = data.products.find((product) => product.id === productsData.id);

  if (productsData.price < 0 )
  {
    res.status(404).send("the price most by bigger to zero")
  }
  if (productsData.amont < 0)
  {
    res.status(404).send("the amont most by postive")
  }
    if (
      findOne ||
      productsData.name === undefined ||
      productsData.price === undefined
    ) {
      res.status(400).send("cant add this products");
    } else {
      data.products.push(productsData);
      res.json({ message: `User added`, users: data.products });
    }
})

router.put("/:id",(req,res)=>{
   const { id } = req.params;
   const productData = req.body;
  
   const productsInd = data.users.findIndex((item) => item.id === parseInt(id));

   if (productsInd !== -1) 
   {
    data.products[productsInd] = productData;
    res.json({ message: `User with ID: ${id} deleted`, products: data.products });
   }
   else{
    res.status(404).send("cant find the id")
   }
})

router.delete('/',(req,res)=>{
   const { id } = req.params;
   const productsInd = data.users.findIndex((item) => item.id === parseInt(id));

   if(productsInd !== -1){
    data.products.splice(productsInd ,1)
    res.json({ message: `User with ID: ${id} deleted`, products: data.products });
   }
   else{
    res.status(404).json({ message: `User not found` });
   }
})

module.exports = router;