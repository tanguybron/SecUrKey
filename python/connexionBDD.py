import mysql.connector

connection_params = {
    'host': "localhost",
    'user': "root",
    'password': "azerty",
    'database': "MdPManager",
}

with mysql.connector.connect(**connection_params) as db :
    with db.cursor(buffered=True) as c:
        c.execute("SELECT Hash_MdP FROM utilisateurs;")
        # db.commit()
        resultats = c.fetchall()
        print(resultats)
        # for utilisateur in resultats:
        #     print(utilisateur)

db.close()