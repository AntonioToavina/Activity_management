CREATE TABLE
  profils (
    id serial primary key ,
    nom_profil varchar(50) NOT NULL
);

CREATE TABLE utilisateurs (
    id serial primary key ,
    nom varchar(50) NOT NULL,
    prenom varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    mdp varchar(50) NOT NULL,
    profil_id integer NOT NULL REFERENCES  profils(id)
);