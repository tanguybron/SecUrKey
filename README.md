# Gestionnaire de MdP

## Déploiement

```shell
docker-compose up --build
```

:warning: Pensez à changer les mots de passe par défaut ! (dans le fichier [docker-compose.yml](./docker-compose.yml))

## Visualiser la page
http://localhost:8080/html/

## Ajout Superuser
```shell
docker exec -it 8771e3e909ab python manage.py createsuperuser
```

## note sur le docker-compose

- Pour déploiement utiliser les images securkey du dockerhub
- Pour le développement utiliser les build (avec les Dockerfile associés)
