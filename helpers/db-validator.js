const Usuario = require('../models/usuarios');

const esAdmin=async(id)=>{
    const user = await Usuario.findOne({_id:id});
    if (!user.admin) {
        throw new Error("El usuario no es administrador");
        return "El usuario no es administrador"
    }

}
const usuarioExiste=async(id)=>{
    const existeUsuario= await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no corresponde a un usuario registrado`)
    }

}
module.exports={
    esAdmin,
    usuarioExiste
}