var pool = require("./connection");

module.exports.getAll = async function() {
    try {
        let sql = "SELECT date, estado, morada, descricao from Pedido";
        let pedidos = await pool.query(sql);
        return {status:200, data: pedidos};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}