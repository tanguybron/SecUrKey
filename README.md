# Gestionnaire de MdP

## Déploiement

```shell
docker-compose up --build
```

## Visualiser la page
https://localhost

## Ajout Superuser
```shell
docker exec -it 8771e3e909ab python manage.py createsuperuser
```

## note sur le docker-compose

- Pour déploiement utiliser les images securkey du dockerhub
- Pour le développement utiliser les build (avec les Dockerfile associés)
