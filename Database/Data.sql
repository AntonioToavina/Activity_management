INSERT INTO Profils(nom_profil) values
   ('admin'),
   ('employe');

INSERT INTO Utilisateurs(nom, prenom, email, mdp, profil_id) values
    ('admin','admin','admin@gmail.com','admin',1),
    ('Rajao','user1','user1@gmail.com','user1',2),
    ('Rajao','user2','user2@gmail.com','user2',2);