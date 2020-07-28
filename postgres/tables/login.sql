BEGIN TRANSACTION;
create table login
(
	id serial not null
		constraint login_pk
			primary key,
	hash varchar(100) not null,
	email text not null
		constraint login_un
			unique
);

alter table login owner to postgres;
COMMIT;

