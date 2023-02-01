-- CREATE DATABASE MdPManager;
USE MdPManager;

-- table utilisateur
CREATE TABLE Utilisateurs(Adresse_Mail VARCHAR(50),Pseudo VARCHAR(50) NOT NULL,Hash_MdP VARCHAR(50) NOT NULL,Actif BOOLEAN NOT NULL,PRIMARY KEY(Adresse_Mail));

-- table mdp
CREATE TABLE Mot_de_Passe(ID_MdP int NOT NULL AUTO_INCREMENT,MdP_Chiffre VARCHAR(100) NOT NULL,Titre VARCHAR(50) NOT NULL,Nom_Utilisateur VARCHAR(50) NOT NULL,Date_Expiration DATE,URL VARCHAR(100),Adresse_Mail VARCHAR(50) NOT NULL,PRIMARY KEY(ID_MdP),FOREIGN KEY(Adresse_Mail) REFERENCES Utilisateurs(Adresse_Mail));

-- test insert
INSERT INTO Utilisateurs (Adresse_Mail,Pseudo,Hash_MdP,Actif) VALUES("armand.vanel@test.com","McBook","goerihj98484opihpoj",TRUE);