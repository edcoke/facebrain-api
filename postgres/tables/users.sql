BEGIN TRANSACTION;
create table users
(
	id serial not null
		constraint users_pkey
			primary key,
	name varchar(100) not null,
	email text not null,
	entries bigint default 0,
	joined timestamp not null,
	constraint "UNIQUE"
		unique (name, email)
);

alter table users owner to postgres;
COMMIT;


