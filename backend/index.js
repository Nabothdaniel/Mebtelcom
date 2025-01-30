import express from 'express';
import bodyParser from  'body-parser';
import connectDb from './src/config/db.js';
import authRoute from './src/routes/Authroute.js'
const PORT = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.disable('x-powered-by');

// connect to mongodb
connectDb();

//all routes are handled here
app.use('/api/v1/auth/',authRoute);

app.get('/',(req,res)=>{
res.status(200).json({message:'Api is runing', timeStamp: new Date().toISOString()})
})

app.listen(PORT, ()=> console.log(`server is runing on port ${PORT}`))