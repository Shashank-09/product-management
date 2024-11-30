const express = require('express');
const app = express();
const PORT = 3000;
require('dotenv').config()
const connectDB = require('./connect')
const productRoute = require('./routes/productRoutes')
const userRoute = require('./routes/userRoutes')
const {checkAuth} = require('./middleware/auth')
const cookieParser = require('cookie-parser');
const Url = process.env.Url
const cors = require('cors');  

app.use(cors({
    origin: 'http://localhost:5173',  // frontend origin
    credentials: true,               // allows cookies to be sent and received
  }));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use((req, res, next) => {
  console.log('Request Headers:', req.headers);
  console.log('Received Cookies:', req.cookies);
  next();
});


connectDB(Url);
app.use('/api/products' ,checkAuth, productRoute)
app.use('/' , userRoute)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
