let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://localhost:27017";
let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Product');
        console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}

app.get('/', function (req,res) {
    res.render('index.html');
});

app.get('/api/products', (req,res) => {
    getAllProducts((err,result)=>{
        if (!err) {
            res.json({statusCode:200, data:result, message:'Get All Products Successful'});
        }
    });
});

app.post('/api/product', (req,res)=>{
    let product = req.body;
    postProducts(product, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data:result, message:'Success'});
        }
    });
});

function postProducts(prod,callback) {
    collection.insertOne(prod,callback);
}

function getAllProducts(callback){
    collection.find({}).toArray(callback);
}

app.listen(port, ()=>{
    console.log('express server started');
    runDBConnection();
});