let collection = require('../models/product');

const postProducts = (req,res) => {
    let prod = req.body;
    collection.postProducts(prod, (err,result) => {
        if (!err) {
            res.json({statusCode:201,data:result,message:'Success'});
        }
    });
}

const getAllProducts = (req,res) => {
    collection.getAllProducts((error,result)=>{
        if (!error) {
            res.json({statusCode:200,data:result,message:'Get All Products Successful'});
        }
    });
}

module.exports = {postProducts,getAllProducts}