drop database if exists health_traning;
create database health_traning;
\c health_traning


begin;


--relacao pessoa
create table pessoa(
  id serial primary key,
  nome character varying(200) not null,
  email character varying(200) not null,
  senha character varying(200) not null,
  status_pessoa character varying(200) not null,
  datahora_criacao timestamp without time zone not null,
  preferencia json,
  tipo_usuario boolean not null,
  numero_de_jogos integer,
  tipo_administrador boolean not null,
  telefone_contato numeric(12),
  permissao character varying(200),
  unique(email)
);

--relacao registro de auditoria
create table registro_de_auditoria(
  id serial primary key,
  tabela_modificada character varying(100) not null,
  data_modificada timestamp without time zone not null,
  pessoa_id integer not null references pessoa(id) on update cascade,
  unique(pessoa_id,data_modificada)
  

);

--relacao jogo
create table jogo(
  id serial primary key,
  data_criacao timestamp without time zone not null,
  status_jogo json ,
  pessoa_id integer not null references pessoa(id) on update cascade,
  unique(pessoa_id)
);

--relacao fase
create table fase(
  id serial primary key,
  numero_da_fase integer not null,
  descricao character varying(200) not null,
  cor character varying(15) not null,
  jogo_id integer not null references jogo(id) on update cascade,
  unique(numero_da_fase,jogo_id)
);

--relacao imagem fase
create table imagem_fase(
  id serial primary key,
  imagem character varying(10),
  fase_id integer not null references fase(id) on update cascade,
  unique(fase_id)
);

--relacao carta
create table carta(
  id serial primary key,
  titulo character varying(200) not null,
  descricao character varying(200) not null,
  validade character varying(1) not null check(validade in('v','f')),
  data_criacao timestamp without time zone not null,
  fase_id integer not null references fase(id) on update cascade,
  unique(fase_id, descricao)
);

commit;
