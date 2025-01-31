import express from 'express';
import bodyParser from  'body-parser';
import cookieParser from 'cookie-parser';
import connectDb from './src/config/db.js';
import authRoute from './src/routes/Authroute.js';
import requestLogger from './src/middleware/requestLogger.js';

//set your port
const PORT = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));
app.disable('x-powered-by');
app.use(requestLogger);

// connect to mongodb
connectDb();

//all routes are handled here
app.use('/api/v1/auth/',authRoute);

app.get('/',(req,res)=>{
res.status(200).json({message:'Api is runing', timeStamp: new Date().toISOString()})
})

app.listen(PORT, '0.0.0.0', ()=> console.log(`server is runing on port ${PORT}`))