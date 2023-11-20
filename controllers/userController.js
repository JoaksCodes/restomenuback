const {request,response}=require('express');
const Usuario = require('../models/ussers');
const bcrypt = require('bcrypt');

const  index=async(req = request, res=response)=>{
  const{desde=0,limite=200}=req.query;
  const [total,usr]= await Promise.all([
    Usuario.countDocuments(),
    Usuario.find().skip(desde).limit(limite)
  ])
  res.status(200).json({total,usr});
}

const getOne=async(req=request, res=response)=>{
  let {id}=req.params;
  let usuario= await Usuario.findOne({_id:id});
  res.status(200).json({usuario});
}

const update=async(req=request, res=response)=>{
  const {id} =req.params;
  const {password,correo, ...resto}=req.body;
  if (password) {
    let passEncrip = bcrypt.hashSync(password,12);
    resto.password= passEncrip;
  }

  const usuario = await Usuario.findByIdAndUpdate(id,resto,{new:true});
  res.status(201).json({usuario:usuario,msg:"Usuario actualizo con éxito!"})
}

const create=async(req=request, res=response)=>{
  const {nombre,apellido,correo,password} = req.body;
  let passEncrip = bcrypt.hashSync(password,12);
  const newUser = new Usuario({nombre,apellido,correo,password:passEncrip})
  console.log(newUser);
  try {
    await newUser.save();
    return res.status(201).json({msg:"Usuario creado con éxito!"})
  } catch (error) {
    return res.json({error})
  }
  
}

module.exports={
  index,
  getOne,
  update,
  create
}