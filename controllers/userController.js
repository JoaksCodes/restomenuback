const {request,response}=require('express');
const usuarios = require('../models/usuarios');
const Usuario = require('../models/usuarios');
const {esAdmin} = require('../helpers/db-validator');
const bcrypt = require('bcrypt');

const  index=async(req = request, res=response)=>{
  const{desde=0,limite=200}=req.query;
  // const sentencia={activo:true};
  // let usuarios= await Usuario.find()
  const [total,usr]= await Promise.all([
    Usuario.countDocuments(),
    Usuario.find().skip(desde).limit(limite)
  ])
  res.status(200).json({total,usr});
}

// const index = async (req, res) => {
//   try {
//       const usuarios = await Usuario.find();
//       return res.status(200).json({ data: usuarios })
//   } catch (error) {
//       return res.json({ error })
//   }
// }

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
  // const id = req.body.id;
  // esAdmin(id)
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

// const del=async(req=request, res=response)=>{
//   const {id} =req.params;
//   const usuario = await Usuario.findById(id);
//   if(!usuario.activo){
//     return res.json({mgs:"El usuario está inactivo!"})
//   }
//   const usuaBorrado = await Usuario.findByIdAndUpdate(id,{activo:false},{new:true});

//   res.status(200).json({msg:"El usuario pasó a estar inactivo",data:usuaBorrado})
// }

const activeUser=async(req=request, res=response)=>{
  const {id} =req.params;
  const urs = await Usuario.findOne({_id:id});
  if(!urs.activo){
    const usuario = await Usuario.findByIdAndUpdate(id,{activo:true},{new:true});
    res.status(201).json({usuario:usuario,msg:"Usuario actualizo con éxito!"})
  }else{
    const usuario = await Usuario.findByIdAndUpdate(id,{activo:false},{new:true});
    res.status(201).json({usuario:usuario,msg:"Usuario inactivo!"})
  }
}

module.exports={
  index,
  getOne,
  update,
  create,
  // del,
  activeUser
}