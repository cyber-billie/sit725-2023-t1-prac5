let express = require('express');
let router = express.Router();
let controller = require('../controllers/controller');

router.post('/', function(req,res){
    controller.postProducts(req,res);
});

router.get('/', (req,res)=>{
    controller.getAllProducts(req,res);
});


module.exports = router;