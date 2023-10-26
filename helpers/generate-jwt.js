const jwt = require('jsonwebtoken');
const generarJWT=(uid)=>{
    return new Promise((resolve,reject)=>{
        const payload={uid};
        jwt.sign(
            payload,
            process.env.SECRETO_PRIVADO_KEY,
            {
                expiresIn:"4h"
            },
            (err,token)=>{
                if(err){
                    console.log(err);
                    reject("No se puede generar el token");
                }else{
                    console.log(token);
                    resolve(token)
                }
            }
        )
    });
}
const verificarToken=(token)=>{
    return new Promise((resolve,reject)=>{
        if(!token){
            reject("creadenciales erroneas!")
        }else{
            resolve(decode)
        }
    })
}
module.exports={generarJWT,verificarToken};