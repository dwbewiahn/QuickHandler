insert into Handler(username, email, password, descricao) values ("handler", "handler@example.com", "handler", "eletricista");

insert into Cliente(username, email, password) values ("user", "user@example.com", "user");

insert into Taxas(categoria, taxaMin, taxaMax) values ("canalização", 2, 200);

insert into Pedido(cliente_id, date, estado, descricao, morada, preco, taxa_id) values (1, "2021-3-21 15:30:00", "pendente", "Cano rebentado na casa de banho, modelo X", "38.707099, -9.152485", 0, 1);