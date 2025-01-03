DELIMITER $
create trigger tr_add_item_to_cart
after insert on itemcarrinhos
for each row
begin
    declare item_total decimal(10, 0);
    
    select new.quantidade * p.preco into item_total
    from produtos p
    where p.id = new.ProdutoId;

    update carrinhos
    set total = ifnull(total, 0) + item_total,
        updatedAt = now()
    where id = new.CarrinhoId;
end $
DELIMITER ;


DELIMITER $
create trigger tr_remove_item_from_cart
after delete on itemcarrinhos
for each row
begin
    declare item_total decimal(10, 0);

    select old.quantidade * p.preco into item_total
    from produtos p
    where p.id = old.ProdutoId;

    update carrinhos
    set total = ifnull(total, 0) - item_total,
        updatedAt = now()
    where id = old.CarrinhoId;
end $
DELIMITER ;


DELIMITER $
create trigger tr_update_item_quantity_in_cart
after update on itemcarrinhos
for each row
begin
    declare old_item_total decimal(10, 0);
    declare new_item_total decimal(10, 0);

    select old.quantidade * p.preco into old_item_total
    from produtos p
    where p.id = old.ProdutoId;

    select new.quantidade * p.preco into new_item_total
    from produtos p
    where p.id = new.ProdutoId;

    update carrinhos
    set total = ifnull(total, 0) + (new_item_total - old_item_total),
        updatedAt = now()
    where id = new.CarrinhoId;
end $
DELIMITER ;


drop trigger if exists tr_adiciona_venda_antes_delete;

DELIMITER $
create trigger tr_adiciona_venda_antes_delete
before delete on carrinhos
for each row
begin
    insert into vendas (id, total, dataVenda, paymentIntent, ClienteId, createdAt, updatedAt)
    values (
        null,         
        old.total,     
        now(), 
        null,
        old.ClienteId,
        now(),         
        now()    
    );
end $
DELIMITER ;


ALTER TABLE itemcarrinhos
DROP FOREIGN KEY itemcarrinhos_ibfk_2;

ALTER TABLE itemcarrinhos
ADD CONSTRAINT itemcarrinhos_ibfk_2
FOREIGN KEY (CarrinhoId) REFERENCES carrinhos(id)
ON DELETE CASCADE;


select * from clientes;
select * from carrinhos;
select * from itemcarrinhos;
select * from vendas;
