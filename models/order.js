const {Schema,model} = require('mongoose');

const OrdersSchema = Schema({
    usuario:{
        type:String,
        required:[true, "El usuario es requerido"]
    },
    pendiente: {
        type: Boolean,
        default: true
    },
    platos:{
        type: String,
        required:[true,"Los platos son requeridos"]
    },
    precio: {
        type: String,
        required: [true, "El precio es requerido"]
    }
})
OrdersSchema.methods.toJSON = function () {
    const {__v,_id,...order} = this.toObject();
    order.id = _id;
    return order
};
module.exports = model("Order",OrdersSchema);