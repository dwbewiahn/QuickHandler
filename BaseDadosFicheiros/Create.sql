CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Handler` (
  `handlerID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `avaliacaoMedia` DOUBLE NULL,
  `descricao` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`handlerID`),
  UNIQUE INDEX `handlerID_UNIQUE` (`handlerID` ASC) ,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) );


CREATE TABLE IF NOT EXISTS `mydb`.`Cliente` (
  `clienteID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `avaliacaoMedia` DOUBLE NULL,
  PRIMARY KEY (`clienteID`),
  UNIQUE INDEX `clienteID_UNIQUE` (`clienteID` ASC) ,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) );


CREATE TABLE IF NOT EXISTS `mydb`.`Taxas` (
  `taxaID` INT NOT NULL AUTO_INCREMENT,
  `categoria` VARCHAR(45) NOT NULL,
  `taxaMin` DOUBLE NOT NULL,
  `taxaMax` DOUBLE NOT NULL,
  PRIMARY KEY (`taxaID`));

CREATE TABLE IF NOT EXISTS `mydb`.`Pedido` (
  `handler_id` INT NULL,
  `cliente_id` INT NOT NULL,
  `pedidoID` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  `estado` VARCHAR(9) NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  `morada` VARCHAR(45) NOT NULL,
  `avaliacaoHandler` DOUBLE NULL,
  `avaliacaoCliente` DOUBLE NULL,
  `preco` DOUBLE NOT NULL,
  `taxa_id` INT NOT NULL,
  PRIMARY KEY (`pedidoID`),
  CONSTRAINT `fk_Handler_has_Cliente_Handler1`
    FOREIGN KEY (`handler_id`)
    REFERENCES `mydb`.`Handler` (`handlerID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Handler_has_Cliente_Cliente1`
    FOREIGN KEY (`cliente_id`)
    REFERENCES `mydb`.`Cliente` (`clienteID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pedido_Taxas1`
    FOREIGN KEY (`taxa_id`)
    REFERENCES `mydb`.`Taxas` (`taxaID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);