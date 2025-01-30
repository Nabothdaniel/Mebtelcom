import jwt from 'jsonwebtoken';

export const generateCookie = (res,token,next)=>{
        res.cookie('authToken',token,{
            httpOnly:true,//this prevents access from the script
            secure:process.env.NODE_ENV === 'production',//only allows HTTPS access in production
            sameSite:'Strict',//prevents against CRSF Attacks
            maxAge:360000// expiration time for this particular cookie
        })
        next();
}
