var pool = require("./connection");

module.exports.getAll = async function() {
    try {
        let sql = "SELECT pedidoID as id, date, estado, morada, descricao from Pedido";
        let pedidos = await pool.query(sql);
        return {status:200, data: pedidos};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}

module.exports.getOne = async function(id) {
    try {
        let sql = "SELECT pedidoID as id, date, estado, morada, descricao from Pedido WHERE pedidoID = ?";
        let pedido = await pool.query(sql, id);
        console.log(sql);
        return pedido;
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}