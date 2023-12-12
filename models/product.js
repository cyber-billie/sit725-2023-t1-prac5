let client = require('../dbConnection');
let collection = client.db('test').collection('Product');

function postProducts(prod,callback) {
    collection.insertOne(prod,callback);
}

function getAllProducts(callback){
    collection.find({}).toArray(callback);
}

module.exports = {postProducts,getAllProducts}