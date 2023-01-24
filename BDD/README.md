
# Installation & mise en place

## Télécharger image docker :

```shell
docker pull mysql
```

## Docker run : 

```shell
docker run --name bdd-mdp -e MYSQL_ROOT_PASSWORD=azerty -d mysql
```

## Exécuter image docker :

```shell
docker exec -it bdd-mdp bash
```

Là on est dans le conteneur.

## Entrer dans la bdd : 

```shell
mysql --host=localhost --user=root --password=azerty
```

# Schéma relationnel

![[Pasted image 20230124134853.png]]

# Création Tables et Vues

## créer bdd

```sql
CREATE DATABASE MdPManager;
USE MdPManager;
```

## créer tables

Table **Utilisateurs**

```sql
CREATE TABLE Utilisateurs(Adresse_Mail VARCHAR(50),Pseudo VARCHAR(50) NOT NULL,Hash_MdP VARCHAR(50) NOT NULL,Actif BOOLEAN NOT NULL,PRIMARY KEY(Adresse_Mail));
```

Table **Mot_de_Passe**

```sql
CREATE TABLE Mot_de_Passe(ID_MdP int NOT NULL AUTO_INCREMENT,MdP_Chiffre VARCHAR(100) NOT NULL,Titre VARCHAR(50) NOT NULL,Nom_Utilisateur VARCHAR(50) NOT NULL,Date_Expiration DATE,URL VARCHAR(100),Adresse_Mail VARCHAR(50) NOT NULL,PRIMARY KEY(ID_MdP),FOREIGN KEY(Adresse_Mail) REFERENCES Utilisateurs(Adresse_Mail));
```


## Insertion données dans les tables

Ajout d'un nouvel utilisateur
```sql
INSERT INTO Utilisateurs (Adresse_Mail,Pseudo,Hash_MdP,Actif) VALUES("armand.vanel@test.com","McBook","goerihj98484opihpoj",TRUE);
```

Ajout d'un nouveau mot de passe pour un utilisateur

```sql
INSERT INTO Mot_de_Passe(ID_MdP,MdP_Chiffre,Titre,Nom_Utilisateur,Date_Expiration,URL,Adresse_Mail) VALUES (1,"oigher","Google","McBoux","2023-01-12","https://google.com","armand.vanel@test.com");
```