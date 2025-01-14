-- trigger

DELIMITER $
create trigger tr_add_item_no_carrinho
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
create trigger tr_remover_item_no_carrinho
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
create trigger tr_update_item_qtd_no_carrinho
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

-- view
drop view if exists RelatorioVendasPorCliente;

create view RelatorioVendasPorCliente as
select c.id as ClienteId, c.nome as NomeCliente, count(v.id) as TotalVendas, sum(v.total) as TotalGasto
from clientes c
left join vendas v on c.id = v.ClienteId
left join itemvendas iv on v.id = iv.VendaId
group by c.id, c.nome;

select * from RelatorioVendasPorCliente;


-- view 

drop procedure CalcularMediaGastosCliente;

DELIMITER $$
create procedure CalcularMediaGastosCliente(pClienteId int)
begin
    select avg(total) from vendas where ClienteId = pClienteId;
end $$

DELIMITER ;

call CalcularMediaGastosCliente(11);

alter table itemcarrinhos
drop foreign key itemcarrinhos_ibfk_2;

alter table itemcarrinhos
add constraint itemcarrinhos_ibfk_2
foreign key (CarrinhoId) references carrinhos(id)
on delete cascade;

-- inserts

INSERT INTO `produtos` VALUES (1,'Bolsa Tote Média','A Bolsa Média The Tote da Marc Jacobs é uma peça prática e moderna, perfeita para o dia a dia. Confeccionada em couro de alta qualidade nas cores preto e bege, possui um formato quadrado elegante e funcional. Com alça de ombro removível e uma alça de mão única na lateral, oferece versatilidade para diferentes estilos de uso. O fechamento por zíper na parte superior garante segurança, enquanto o logo gravado na frente adiciona um toque de autenticidade. Com um compartimento principal espaçoso, essa bolsa é ideal para quem busca um acessório estiloso e funcional.',6844,5,'../images/TOTE BAG.png',15,'2025-01-02 15:25:12','2025-01-02 15:25:12',NULL),(2,'Bolsa Mini Crystal','A Bolsa Mini Crystal La Medusa da Versace é o acessório ideal para quem valoriza o glamour e a elegância. Em couro preto de alta qualidade, ela destaca-se pelo icônico detalhe da cabeça de Medusa e pelas aplicações de cristais que conferem um brilho sofisticado. Seu design funcional inclui uma parte superior dobrável com fecho magnético e uma alça de mão única, garantindo estilo e praticidade. O interior, cuidadosamente planejado, possui compartimento principal e divisões para cartões, oferecendo organização em uma peça compacta e luxuosa, assinada pela renomada Versace.',23935,5,'../images/BolsaMiniCrystal.jpg',3,'2025-01-02 15:26:31','2025-01-02 15:26:31',NULL),(3,'Óculos de Sol Cartier','Elegância francesa e excelência em design são evidentes no Óculos de Sol Oval da Cartier Eyewear. Com uma armação oval em metal marrom e lentes cinza com proteção UV, esse modelo une estilo e funcionalidade para o dia a dia. O suporte de nariz garante conforto, enquanto as hastes retas com pontas curvas oferecem um encaixe seguro e sofisticado. Com o discreto logo Cartier gravado nas lentes e uma capa protetora inclusa, esses óculos são a escolha perfeita para quem busca sofisticação e proteção em um só acessório.',22931,5,'../images/OculosOvalCartier.jpg',10,'2025-01-02 15:27:46','2025-01-02 15:27:46',NULL),(4,'Scarpin com Aplicação de Strass','O Scarpin com Aplicação de Strass da Gucci é a escolha perfeita para quem busca sofisticação e brilho em cada detalhe. Feito em couro preto de alta qualidade e produzido na Itália, o modelo apresenta um elegante bico fino e um delicado kitten heel, que oferece conforto e estilo ao caminhar. As aplicações de cristais adicionam um toque glamouroso, enquanto a tira com fivela na parte posterior garante um ajuste perfeito. Com palmilha em couro e logo Gucci, este scarpin é uma peça icônica e versátil para elevar qualquer look.',21933,5,'../images/Scarpin com Aplicação de Strass da Gucci.jpg',10,'2025-01-02 15:29:02','2025-01-02 15:29:02',NULL),(5,'Scarpin com Corrente','Elegante e contemporâneo, o Scarpin com Corrente da Miu Miu é confeccionado em couro com acabamento envernizado, garantindo um brilho sofisticado. O design apresenta um bico quadrado moderno e um salto bloco de 80mm, oferecendo estilo e conforto em cada passo. Detalhes exclusivos, como a corrente delicada e o toque refinado de uma pérola, fazem deste scarpin uma escolha única para ocasiões especiais. É a combinação perfeita entre inovação e elegância, assinada pela renomada Miu Miu.',7200,5,'../images/Scarpin Milu.jpg',10,'2025-01-02 15:30:07','2025-01-02 15:30:07',NULL),(6,'Bolsa Tiracolo Alltime','A Bolsa Tiracolo Alltime de Couro da Valentino Garavani é a expressão da sofisticação italiana. Confeccionada em couro branco marfim de alta qualidade, ela possui um detalhe entrelaçado elegante e o icônico VLogo com ferragens douradas, que acrescentam um toque refinado. Seu design versátil conta com uma parte superior dobrável e uma alça de ombro ajustável e removível, além de uma alça de mão removível, oferecendo opções variadas de uso. Com compartimento principal espaçoso, bolso interno e logo gravado, é ideal para quem busca elegância e funcionalidade no dia a dia.',22800,5,'../images/BolsaTriacolo.jpg',10,'2025-01-02 15:30:54','2025-01-02 15:30:54',NULL),(7,'Shopping Bag Viva Superstar','A Shopping Bag Viva Superstar da Valentino Garavani combina elegância e praticidade em um design sofisticado. Feita em couro nappa de alta qualidade, essa bolsa apresenta o icônico maxi VLogo Signature em contraste, adicionando um toque de personalidade. Com ferragens douradas em acabamento antigo e uma corrente deslizante que permite uso no ombro, é ideal para quem busca versatilidade e estilo. O compartimento espaçoso inclui um bolso externo com zíper e fechamento seguro. Produzida na Itália, essa peça é uma escolha atemporal para o dia a dia.',20500,5,'../images/BolsaVivaSuperstar.jpg',1,'2025-01-02 15:32:26','2025-01-02 15:32:26',NULL),(8,'Colar Dolce & Gabbana','Este colar com pedraria da Dolce & Gabbana é uma joia impressionante e repleta de elegância. Ricamente adornado com aplicações de ametistas, peridoto, citrinas, quartzo, turmalina e topázio, o design combina cores e brilhos únicos que capturam o olhar. Pérolas de água salgada acrescentam um toque refinado e clássico, complementando a peça com sutileza. Com um fechamento por encaixe seguro, esse colar é a escolha perfeita para quem busca uma peça luxuosa e marcante para ocasiões especiais.',225250,5,'../images/ColarDolceGabbana.jpg',4,'2025-01-02 15:34:58','2025-01-02 15:34:58',NULL),(9,'Brincos Dolce & Gabbana','Este elegante par de brincos de argola da Dolce & Gabbana é uma peça deslumbrante, perfeita para adicionar sofisticação a qualquer look. Projetados para orelhas furadas, os brincos apresentam aplicações de diamantes e safiras, criando um brilho excepcional em um design de argola pequena. Com fechamento por encaixe de alfinete, eles oferecem segurança e conforto. Ideais para quem busca uma joia marcante e delicada, esses brincos são uma escolha luxuosa que valoriza e completa o visual.',64000,5,'../images/BrincosDolceGabbana.jpg',4,'2025-01-02 15:37:42','2025-01-02 15:37:42',NULL),(10,'Brincos Esmeralda Dolce & Gabbana','Este deslumbrante par de brincos da Dolce & Gabbana é a escolha perfeita para adicionar um toque de glamour ao seu visual. Projetados para orelhas furadas, os brincos são adornados com um elegante diamante e diversas aplicações de pedrarias, que garantem um brilho sofisticado. Com fecho gancho de encaixe, proporcionam segurança e conforto ao usar. Confeccionados em bronze, eles combinam durabilidade e estilo, tornando-se uma peça ideal para ocasiões especiais.',41250,5,'../images/BrincosEsmeralda.jpg',1,'2025-01-02 15:37:55','2025-01-02 15:37:55',NULL),(11,'Bolsa Tote Le Panier Pliage','A Bolsa Tote Le Panier Pliage da Longchamp é a combinação perfeita de estilo e funcionalidade. Com um design elegante em lona nas cores bege areia e marrom, esta bolsa apresenta acabamento em couro e um bordado corrido do logo, que adiciona um toque sofisticado. As alças de mão duplas arredondadas oferecem conforto, enquanto a alça de ombro ajustável e removível proporciona versatilidade para diferentes ocasiões. O fechamento por botões de pressão e o compartimento principal espaçoso garantem praticidade no dia a dia. Ideal para quem busca uma bolsa clássica e atemporal.',1885,5,'../images/BolsaTote.jpg',3,'2025-01-02 15:38:05','2025-01-02 15:38:05',NULL),(12,'Relógio Date Superlative','O Relógio Date Superlative de 34mm é a combinação ideal de elegância e modernidade. Com uma sofisticada cor prateada, este modelo é confeccionado em aço inoxidável, garantindo durabilidade e resistência. O mostrador apresenta números indo-arábicos que facilitam a leitura do tempo, enquanto o efeito polido e as aplicações de cristais conferem um brilho sutil e refinado. Com uma armação retangular, este relógio se destaca pela sua forma única e contemporânea. Esta peça conta com a garantia padrão de um ano da boutique, assegurando qualidade e satisfação.',15000,5,'../images/RelógioDateSuperlative.jpg',1,'2025-01-02 15:38:14','2025-01-02 15:38:14',NULL),(13,'Bolsa Tote Le Bambino','Explore a elegância da Bolsa Tote Le Bambino, uma peça sofisticada e atemporal, feita com a mais alta qualidade em couro italiano. Apresenta um acabamento em tom marrom clássico e um monograma dourado discreto, proporcionando um toque luxuoso e moderno. Com design funcional, possui uma aba dobrável com fecho magnético, uma alça de mão reta e uma alça de ombro ajustável e removível, oferecendo versatilidade e conforto no uso. O compartimento principal espaçoso conta com forro de algodão e um patch interno de logo, completando o visual refinado. Ideal para quem busca estilo e praticidade em uma única peça.',7646,5,'../images/bolsaa marrom.png',8,'2025-01-02 15:38:26','2025-01-02 15:38:26',NULL),(14,'Bolsa Tote Le Chiquito Long','A Bolsa Tote Le Chiquito Long Boucle é um verdadeiro ícone de sofisticação e estilo. Feita na Itália, essa peça em couro preto com acabamento brilhante exibe um luxuoso efeito de pele de crocodilo, realçado pelo monograma e ferragens em tom dourado, que trazem um toque glamoroso e moderno. Seu design versátil inclui uma aba superior dobrável com fecho magnético, alça de mão única e uma alça de ombro ajustável e removível, perfeita para diversas ocasiões. O interior é cuidadosamente pensado, com um compartimento principal amplo, forro completo, compartimento interno para cartão e patch com logo. Acompanha uma bolsa protetora, garantindo a preservação de sua beleza e exclusividade ao longo do tempo.',10468,5,'../images/bolsa preta.jpg',3,'2025-01-02 15:38:33','2025-01-02 15:38:33',NULL),(15,'Scarpin Saeda da Jimmy Choo','O Scarpin Saeda da Jimmy Choo é sinônimo de elegância e glamour atemporal. Feito com couro de cabra em um sofisticado tom creme, esse scarpin possui um delicado bico fino que alonga a silhueta e uma charmosa aplicação de cristais que adiciona um brilho luxuoso ao design. Com uma alça de tornozelo que oferece segurança e conforto, ele também apresenta um salto agulha de 85mm, ideal para quem busca um toque de sofisticação em qualquer ocasião. Produzido na Itália, o Scarpin Saeda é perfeito para elevar qualquer look com estilo e exclusividade.',10444,5,'../images/sapato brNCO.png',8,'2025-01-02 15:38:42','2025-01-02 15:38:42',NULL),(16,'Brincos Cristal','Delicados e sofisticados, esses brincos prateados trazem um toque de brilho com suas aplicações de cristais cuidadosamente trabalhadas. Feitos com uma base de metal e vidro de alta qualidade, combinam elegância com versatilidade, sendo perfeitos para qualquer ocasião. Produzidos na Itália, esses brincos destacam-se pelo design refinado e pela beleza do acabamento cristalino, ideal para quem deseja uma peça atemporal e luxuosa para compor o visual.',4825,5,'../images/BRINCO.png',1,'2025-01-02 15:38:53','2025-01-02 15:38:53',NULL),(17,'Scarpin Slingback Amita','O Scarpin Slingback Amita da Jimmy Choo é uma combinação perfeita de elegância e conforto. Feito na Itália em um tom bordô marcante e confeccionado em couro com acabamento envernizado, traz um toque sofisticado e moderno para qualquer look. Com design de bico fino e salto médio esculpido de 45mm, esse modelo slip-on oferece praticidade e estilo. A tira elástica posterior garante ajuste seguro, enquanto a palmilha de couro com logo adiciona um detalhe refinado ao interior. Ideal para quem busca um toque de glamour sem abrir mão do conforto.',8758,5,'../images/SAPATO.jpg',3,'2025-01-02 15:39:04','2025-01-02 15:39:04',NULL),(18,'Bolsa Comma Notte Hello Kitty','A Bolsa Comma Notte Hello Kitty da GCDS é uma peça encantadora que combina estilo contemporâneo e um toque divertido. Em um elegante tom branco, esta bolsa assimétrica se destaca pela aplicação floral inspirada na icônica personagem Hello Kitty, adicionando um toque lúdico ao design. Feita na Itália com atenção aos detalhes, possui um compartimento frontal com fechamento por zíper para fácil acesso e uma alça de mão única que garante conforto e praticidade. Ideal para quem busca um acessório exclusivo e despojado, perfeito para compor looks modernos e criativos.',6420,5,'../images/HELLO KITTY.png',3,'2025-01-02 15:39:14','2025-01-02 15:39:14',NULL),(19,'Bolsa Jolie Madame','A Bolsa Jolie Madame da Balmain é uma peça de luxo incomparável, feita para quem valoriza sofisticação e estilo. Confeccionada na Itália em um tom preto clássico, apresenta um forro em couro e detalhes exclusivos, como o delicado bordado de amora, aplicações de cristais e contas que adicionam um toque artesanal e glamoroso. O design inclui uma alça de mão única e uma alça de ombro em corrente e couro, ajustável e removível para maior versatilidade. A bolsa conta com fechamento magnético seguro, uma placa dourada com o logo da marca, além de um bolso interno espaçoso e compartimento para cartão, ideal para manter tudo organizado. Com acabamento impecável e detalhes de metal gravados com o logo, a Jolie Madame é a escolha ideal para elevar qualquer look com elegância e personalidade.',22325,5,'../images/BOLSA VERDE.png',1,'2025-01-02 15:39:22','2025-01-02 15:39:22',NULL),(21,'Bolsa Média The Tote da Marc Jacobs','A Bolsa Média The Tote da Marc Jacobs é uma peça prática e moderna, perfeita para o dia a dia. Confeccionada em couro de alta qualidade nas cores preto e bege, possui um formato quadrado elegante e funcional. Com alça de ombro removível e uma alça de mão única na lateral, oferece versatilidade para diferentes estilos de uso. O fechamento por zíper na parte superior garante segurança, enquanto o logo gravado na frente adiciona um toque de autenticidade. Com um compartimento principal espaçoso, essa bolsa é ideal para quem busca um acessório estiloso e funcional.',6844,5,'../images/BolsaToteMedia.jpg',2,'2025-01-02 15:44:36','2025-01-02 15:44:36',NULL);

INSERT INTO clientes (nome, cpf, dataNasc, telefone, email, senha, isLogged, createdAt, updatedAt) VALUES
('João Silva', '12345678901', '1990-01-15', '11999999999', 'joao.silva@example.com', 'senha123', 1, NOW(), NOW()),
('Maria Oliveira', '23456789012', '1985-05-20', '11988888888', 'maria.oliveira@example.com', 'senha123', 0, NOW(), NOW()),
('Carlos Santos', '34567890123', '1978-03-10', '11977777777', 'carlos.santos@example.com', 'senha123', 1, NOW(), NOW()),
('Ana Costa', '45678901234', '1995-07-30', '11966666666', 'ana.costa@example.com', 'senha123', 0, NOW(), NOW()),
('Lucas Lima', '56789012345', '1992-09-25', '11955555555', 'lucas.lima@example.com', 'senha123', 1, NOW(), NOW()),
('Julia Martins', '67890123456', '1988-12-15', '11944444444', 'julia.martins@example.com', 'senha123', 0, NOW(), NOW()),
('Pedro Alves', '78901234567', '1980-02-05', '11933333333', 'pedro.alves@example.com', 'senha123', 1, NOW(), NOW()),
('Carolina Rocha', '89012345678', '1994-11-01', '11922222222', 'carolina.rocha@example.com', 'senha123', 0, NOW(), NOW()),
('Guilherme Azevedo', '90123456789', '1982-04-18', '11911111111', 'guilherme.azevedo@example.com', 'senha123', 1, NOW(), NOW()),
('Fernanda Mendes', '01234567890', '1993-06-07', '11900000000', 'fernanda.mendes@example.com', 'senha123', 0, NOW(), NOW());

INSERT INTO categoria (descricao, createdAt, updatedAt) VALUES
('Eletrônicos', NOW(), NOW()),
('Eletrodomésticos', NOW(), NOW()),
('Móveis', NOW(), NOW()),
('Roupas', NOW(), NOW()),
('Calçados', NOW(), NOW()),
('Acessórios', NOW(), NOW()),
('Livros', NOW(), NOW()),
('Esporte e Lazer', NOW(), NOW()),
('Informática', NOW(), NOW()),
('Beleza e Saúde', NOW(), NOW());

INSERT INTO produtos (nome, descricao, preco, rate, image_url, quantidade, createdAt, updatedAt, CategoriumId) VALUES
('Notebook', 'Notebook Dell Inspiron', 3500, 5, 'notebook.jpg', 100, NOW(), NOW(), 1),
('Geladeira', 'Geladeira Brastemp Frost Free', 2500, 4, 'geladeira.jpg', 50, NOW(), NOW(), 2),
('Sofá', 'Sofá retrátil 3 lugares', 1200, 4, 'sofa.jpg', 30, NOW(), NOW(), 3),
('Camiseta', 'Camiseta básica branca', 50, 5, 'camiseta.jpg', 200, NOW(), NOW(), 4),
('Tênis', 'Tênis esportivo Nike', 300, 5, 'tenis.jpg', 150, NOW(), NOW(), 5),
('Relógio', 'Relógio de pulso Casio', 400, 4, 'relogio.jpg', 100, NOW(), NOW(), 6),
('Livro', 'Livro de ficção científica', 80, 5, 'livro.jpg', 500, NOW(), NOW(), 7),
('Bola', 'Bola de futebol Nike', 100, 4, 'bola.jpg', 70, NOW(), NOW(), 8),
('Mouse', 'Mouse gamer Logitech', 150, 5, 'mouse.jpg', 120, NOW(), NOW(), 9),
('Perfume', 'Perfume importado Chanel', 500, 5, 'perfume.jpg', 60, NOW(), NOW(), 10);

INSERT INTO carrinhos (total, createdAt, updatedAt, ClienteId) VALUES
(400, NOW(), NOW(), 1),
(150, NOW(), NOW(), 2),
(300, NOW(), NOW(), 3),
(500, NOW(), NOW(), 4),
(250, NOW(), NOW(), 5),
(200, NOW(), NOW(), 6),
(100, NOW(), NOW(), 7),
(450, NOW(), NOW(), 8),
(350, NOW(), NOW(), 9),
(500, NOW(), NOW(), 10);

INSERT INTO itemcarrinhos (quantidade, createdAt, updatedAt, ProdutoId, CarrinhoId) VALUES
(2, NOW(), NOW(), 1, 1),
(1, NOW(), NOW(), 2, 2),
(3, NOW(), NOW(), 3, 3),
(1, NOW(), NOW(), 4, 4),
(2, NOW(), NOW(), 5, 5),
(1, NOW(), NOW(), 6, 6),
(1, NOW(), NOW(), 7, 7),
(2, NOW(), NOW(), 8, 8),
(3, NOW(), NOW(), 9, 9),
(1, NOW(), NOW(), 10, 10);

INSERT INTO vendas (total, dataVenda, paymentIntent, createdAt, updatedAt, ClienteId) VALUES
(400, NOW(), 'pay_intent_1', NOW(), NOW(), 1),
(150, NOW(), 'pay_intent_2', NOW(), NOW(), 2),
(300, NOW(), 'pay_intent_3', NOW(), NOW(), 3),
(500, NOW(), 'pay_intent_4', NOW(), NOW(), 4),
(250, NOW(), 'pay_intent_5', NOW(), NOW(), 5),
(200, NOW(), 'pay_intent_6', NOW(), NOW(), 6),
(100, NOW(), 'pay_intent_7', NOW(), NOW(), 7),
(450, NOW(), 'pay_intent_8', NOW(), NOW(), 8),
(350, NOW(), 'pay_intent_9', NOW(), NOW(), 9),
(500, NOW(), 'pay_intent_10', NOW(), NOW(), 10);

INSERT INTO itemvendas (preco, total, quantidade, createdAt, updatedAt, ProdutoId, VendaId) VALUES
(200, 400, 2, NOW(), NOW(), 1, 1),
(150, 150, 1, NOW(), NOW(), 2, 2),
(100, 300, 3, NOW(), NOW(), 3, 3),
(500, 500, 1, NOW(), NOW(), 4, 4),
(125, 250, 2, NOW(), NOW(), 5, 5),
(200, 200, 1, NOW(), NOW(), 6, 6),
(100, 100, 1, NOW(), NOW(), 7, 7),
(225, 450, 2, NOW(), NOW(), 8, 8),
(350, 350, 1, NOW(), NOW(), 9, 9),
(500, 500, 1, NOW(), NOW(), 10, 10);




select * from vendas;
select * from itemVendas;
select * from itemcarrinhos;
select * from produtos;
select * from clientes;
select * from vendas; 
select * from carrinhos;