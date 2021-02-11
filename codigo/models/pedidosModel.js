var pool = require("./connection");

module.exports.getPendentes = async function() {
    try {
        let sql = "SELECT pedidoID as id, date, estado, morada, username, descricao from Pedido, Cliente WHERE cliente_id = clienteID AND estado='pendente'";
        let pedidos = await pool.query(sql);
        return {status:200, data: pedidos};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}

module.exports.getAllMine = async function(id, userType) {
    try {
        let sql ="";
        if(userType == "Cliente"){
            console.log("sql cliente mine");
            sql = "SELECT pedidoID as id, date, estado, morada, username, descricao from Pedido, Cliente WHERE cliente_id = clienteID AND cliente_id = ?";
        }else{
            console.log("sql handler mine");
            sql = "SELECT pedidoID as id, date, estado, morada, username, descricao from Pedido, Cliente WHERE cliente_id = clienteID AND handler_id = ?";    
        }   
        let pedidos = await pool.query(sql, id);
        return {status:200, data: pedidos};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}

module.exports.getOne = async function(id) {
    try {
        let sql = "SELECT pedidoID, date, estado,  morada, descricao, username, handler_id, cliente_id from Pedido, Cliente WHERE cliente_id = clienteID AND pedidoID = ?";
        let pedido = await pool.query(sql, id);
        console.log(sql);
        return {status: 200, data : pedido[0]};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}

module.exports.postPedido = async function(pedido) {
    try {
        let sql = "INSERT INTO Pedido (date, categoria, morada, descricao, cliente_id) VALUES( ?,?,?,?,?)";
        let newPedido = await pool.query(sql, [pedido.date, pedido.categoria, pedido.morada, pedido.descricao, pedido.cliente_id]);
        console.log(sql);
        if (newPedido.affectedRows > 0) { 
            return {status: 200, msg: "Pedido Criado" };
        }

        //verificacoes se os campos foram preenchidos

    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}

module.exports.atribuirPedido = async function(aPedido) {
    try {
        console.log(JSON.stringify(aPedido)); 
        let sql = "UPDATE `Pedido` SET `handler_id` = ?, `estado` = ? WHERE `Pedido`.`pedidoID` = ? ";
        let atualizarPedido = await pool.query(sql, [aPedido.handler_id, aPedido.estado, aPedido.pedidoID ]);
        console.log(sql);
        console.log(atualizarPedido);
        if (atualizarPedido.affectedRows > 0) { 
            return {status: 200, msg: "Pedido Atualizado" };
        }

        //verificacoes se os campos foram preenchidos

    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}