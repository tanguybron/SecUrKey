# mise a jour du systeme

# installation de python et pip
echo -n "Installation de python3 et pip...  "
apt install python3-pip 2>/dev/null >/dev/null
echo -n "  0K"
echo

# installation module Django
echo -n "Installation module Django...  "
pip install django 2>/dev/null >/dev/null
echo -n "  0K"
echo


# recuperation des fichiers du projet
echo -n "Recuperation des fichiers du projet...  "
git clone --quiet https://github.com/tanguybron/GestionnaireMdP
cd GestionnaireMdP
echo -n "  OK"
echo

# recuperation des certificats ssl
echo -n "Recuperation des certificats SSL...  "
wget --quiet --no-check-certificate 'https://docs.google.com/uc?export=download&id=1scyOloSNzs1M3G7a5ziHkZdostFMl7nF' -O securkey.key
wget --quiet --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=1XBGEGh9vhPglxXslI9uSeiVTq7uuq2W8' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=1XBGEGh9vhPglxXslI9uSeiVTq7uuq2W8" -O securkey.crt && rm -rf /tmp/cookies.txt

mv securkey.* ./nginx/
echo -n "  OK"
echo

# creation des variables d'environnement pour les connexions BDD
mkdir environnements
cd environnements

touch database.env

echo -n "Nom de la BDD : "
read name_bdd
echo "MYSQL_DATABASE=$name_bdd" >> database.env

echo -n "Nom utilisateur de la BDD : "
read username_bdd
echo "MYSQL_USER=$username_bdd" >> database.env

echo -n "Mot de passe de l'utilisateur de la BDD : "
read password_user_bdd
echo "MYSQL_PASSWORD=$password_user_bdd" >> database.env

echo -n "Mot de passe administrateur de la BDD : "
read root_password_bdd
echo "MYSQL_ROOT_PASSWORD=$root_password_bdd" >> database.env

touch django.env
echo
echo -n "Generation d'une nouvelle clef django"
DJANGO_KEY=$(python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
echo "SECRET_KEY=)django-insecure-bod)%"$DJANGO_KEY >> django.env
echo -n "  OK"

echo

echo "Fin de la creation des fichiers."
echo "Pour lancer l'application, executez la commande :"
echo "docker-compose build --force-rm; docker-compose up"

echo "En cas de problème (ERREUR CONNEXION A LA BDD), executez la commande : docker-compose down, puis relancez l'application : docker-compose up --build"