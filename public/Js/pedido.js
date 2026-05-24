const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({

    usuario: String,
    produto: String,
    data: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Pedido', PedidoSchema);