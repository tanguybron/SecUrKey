import mysql.connector

def get_hash_user(email_address):
    connection_params = {
        'host': "localhost",
        'user': "root",
        'password': "azerty",
        'database': "MdPManager",
    }
    request='SELECT Hash_MdP FROM utilisateurs WHERE Adresse_Mail="'+str(email_address)+'";'
    with mysql.connector.connect(**connection_params) as db :
        with db.cursor(buffered=True) as c:
            c.execute(request)
            resultat = str(c.fetchall())
            resultat = resultat.split("'")[1]

    db.close()
    return resultat

## Tests
# res = get_hash_user("tanguy.bron@test.com")
# print(res)
# get_hash_user("armand.vanel@test.com")