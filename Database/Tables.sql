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

CREATE TABLE artistes (
  id serial PRIMARY KEY,
  nom varchar(50) NOT NULL,
  tarif_heure double precision not null check ( tarif_heure>0 ),
  frequence smallint default 1
);

CREATE TABLE typemateriels (
  id serial PRIMARY KEY,
  type varchar(20) NOT NULL
);

CREATE TABLE typeelements (
  id serial PRIMARY KEY,
  element varchar(30) NOT NULL,
  frequence smallint not null
);

CREATE TABLE elementbases (
  id serial PRIMARY KEY,
  nom varchar(50) not null,
  typeelement_id integer NOT NULL references typeelements(id),
  typemateriels_id integer NOT NULL references typemateriels(id),
  tarif double precision not null check ( tarif>0 )
);

CREATE TABLE categorie_lieu (
  id serial PRIMARY KEY,
  type varchar(20) NOT NULL
);

CREATE TABLE lieu (
  id serial primary key,
  nom varchar(30) NOT NULL,
  categorie_id integer NOT NULL references categorie_lieu(id),
  vip_place int  NOT NULL check ( vip_place > 0 ),
  reserve_place int NOT NULL check ( reserve_place > 0 ),
  normal_vip int NOT NULL check ( normal_vip>0 ),
  photo text NOT NULL
);

CREATE TABLE typedepenses (
  id serial PRIMARY KEY,
  type varchar(20) NOT NULL
);

CREATE TABLE devis (
  id serial PRIMARY KEY,
  libelle varchar(50) ,
  duree double precision NOT NULL,
  datedevis date not null default now(),
  total double precision not null check ( total>0 ),
  heure time not null default current_time
);

CREATE TABLE depenselieu(
    id serial primary key ,
    devis_id integer NOT NULL references devis(id),
    lieu_id integer NOT NULL references lieu,
    montant double precision not null check ( montant>0 ),
    prix_vip double precision not null check ( prix_vip > 0 ),
    prix_reserve double precision not null check ( prix_reserve > 0 ),
    prix_normal double precision not null check ( prix_normal > 0 )
);

CREATE TABLE depenseartistes (
  id serial PRIMARY KEY,
  devis_id integer NOT NULL references devis(id),
  artistes_id integer NOT NULL references artistes(id),
  duree double precision not null  check ( duree>0 )
);

CREATE TABLE depenseelements (
  id serial PRIMARY KEY,
  devis_id integer NOT NULL references devis(id),
  elementbases_id integer NOT NULL references elementbases(id),
  duree double precision not null check ( duree>0 )
);


CREATE TABLE diversdepensedevis (
  id serial PRIMARY KEY,
  devis_id integer NOT NULL references devis(id),
  typedepenses_id integer NOT NULL references typedepenses(id),
  montant double precision NOT NULL check ( montant>0 )
);

CREATE TABLE Taxe(
    id serial PRIMARY KEY ,
    pourcentage double precision NOT NULL
);

CREATE TABLE PlaceVendus(
    id serial primary key ,
    devis_id integer NOT NULL references devis(id),
    datefin date not null default now(),
    vip_place integer NOT NULL default 0,
    reserve_place integer NOT NULL default 0,
    normal_place integer NOT NULL default 0
);

delete from placevendus;