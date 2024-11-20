const express = require('express');
const app = express();
const PORT = 3000;
require('dotenv').config()
const connectDB = require('./connect')
const productRoute = require('./routes/productRoutes')
const Url = process.env.Url
const cors = require('cors');  

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended : false}));


connectDB(Url);
app.use('/api/products' , productRoute)


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
