const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/database');
const colors = require('colors')
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const mongoSanitize=require('express-mongo-sanitize');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

//Load environment variables
dotenv.config({path:'./config/config.env'});

//Connect to database

connectDB();


//Route files
const categories = require('./routes/categories');
const items = require('./routes/items');
const auth = require('./routes/auth');
const users = require('./routes/users');
const orders = require('./routes/orders');



const app = express();

//Body Parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());





// Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Sanitize data
 app.use(mongoSanitize());

// Set security headers
app.use(helmet());


//Rate limiting
const limiter = rateLimit({
    windowMs:10*60*1000,//10 mins
    max:100
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());


//Mount routers

app.use('/api/v1/categories',categories);
app.use('/api/v1/items',items);
app.use('/api/v1/auth',auth);
app.use('/api/v1/users',users);
app.use('/api/v1/orders',orders);

app.use(errorHandler);


const PORT = process.env.PORT || 5000;
const server =app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.gray.bold));


//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error : ${err.message}`.red);
    //Close server and exit process
    server.close(()=>process.exit(1));
})
