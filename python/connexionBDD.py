import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="azerty",
    database="MdPManager"
)

# faire quelque chose d'utile avec la connexion

db.close()