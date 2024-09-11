rop database if exists health_traning;
create database health_traning;
\c health_traning


begin;


--relacao pessoa
create table usuario(
  id serial primary key,
  nome character varying(200) not null,
  email character varying(200) not null,
  senha character varying(200) not null,
  status_pessoa character varying(200) not null,
  datahora_criacao timestamp without time zone not null,
  numero_de_jogos integer,
  telefone_contato numeric(12),
  unique(email)
);



--relacao jogo
create table jogo(
  id serial primary key,
  data_criacao timestamp without time zone not null,
  dado character varying(200) not null,
  casa character varying(200) not null,
  status_jogo character varying(200),
  usuario_id integer not null references usuario(id) on update cascade,
  unique(usuario_id)
);

--relacao joga
create table joga(
    id serial primary key,
    horario_fim timestamp without time zone not null default now(),
    horario_inicio timestamp without time zone not null default now(),
    data_inicio date,
    data_fim date,
    usuario_id integer not null references usuario(id) on update cascade,
    jogo_id integer not null references jogo(id) on update cascade,
    unique(usuario_id, jogo_id)
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