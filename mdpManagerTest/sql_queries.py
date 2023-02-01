from django.db import connection

def print_users():
    with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM Utilisateurs;")
            row = cursor.fetchall()

    print(row)