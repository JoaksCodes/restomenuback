const { Schema, model } = require('mongoose');
const ProductosSchema = Schema({
    titulo: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    precio: {
        type: String,
        required: [true, "El precio es obligatorio"]
    },
    texto: {
        type: String,
        required: [true, "La descripción es obligatoria"]
    },
    categoria: {
        type: String,
        required: [true, "La categoria es obligatoria"]
    },
    imagen: {
        type: String,
        required: [true, "La imagen del producto es obligatoria"]
    },
    activo: {
        type: Boolean,
        required: [true, "Debe indicar si lo quiere publicar o no"]
    }
});

ProductosSchema.methods.toJSON = function () {
    const { __v, _id, ...producto } = this.toObject();
    producto.id = _id;
    return producto
};
module.exports = model("Producto", ProductosSchema);