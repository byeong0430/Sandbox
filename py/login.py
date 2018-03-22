#!/usr/bin/python
import string, random
import json, cgi, cgitb, MySQLdb

def id_generator(size=40, chars=string.ascii_uppercase + string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

print("Content-type: text/plain\r\n")

#Variables
account_sql_tbl = "account"
login_sql_tbl = "logged_in"
sql_col = ["token", "email", "password"]
host = "localhost"
user = "update_user"
password = "Qudrb0430!"
dbase = "byeong_dev"
delim = ","

#1. Construct insert query
cgitb.enable() # for troubleshooting
data = cgi.FieldStorage() #Start an instant

#Get the json keys
keys = data.keys()

#Save the passed variables. Make sure each character variable is quoted 
for x in range(0, len(keys)):
    key_name = keys[x]
    globals()[key_name] = repr(data[key_name].value)

#Password should be hashed before it is saved in mysql
login_password = "PASSWORD(" + login_password + ")" #Change 

#Multiple users may try to login with similar info. To differentiate them, create a unique id
token = repr(id_generator())

#Create a string by ","
val_array = [token, login_email, login_password]
values = "(" + delim.join(val_array) + ")"

#Create a query
insert_query = "INSERT IGNORE INTO %s (%s) VALUES %s" % (login_sql_tbl, delim.join(sql_col), values)
#End - 1. Construct insert query

#2. Execute the insert query
db = MySQLdb.connect(host=host, user=user, passwd=password, db=dbase)

#You must create a Cursor object. It will let you execute all the queries you need
cur = db.cursor()

#Execute the insert query
try:
    cur.execute(insert_query) #Execute the insert query

    #After inserting the given data into logged_in table, check if 1. the given email exists in the account table
    #2. If so, check if the given password matches what's in the account table.
    match_query = "SELECT %s.password AS a_pswd, A.password AS l_pswd FROM %s LEFT JOIN (SELECT * FROM %s WHERE token = %s) AS A on %s.email = A.email" % \
    (account_sql_tbl, account_sql_tbl, login_sql_tbl, token, account_sql_tbl)
    
    #Compare the password stored in account and given password
    cur.execute(match_query)
    match_result = cur.fetchall()

    for row in match_result:
        if row[0] == row[1]:
            print(1)
        else:
            print(0)
            
    db.commit()
except MySQLdb.Error as e:
    try:
        print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
    except IndexError:
        print("MySQL Error: %s" % str(e))
finally:
    if cur != None:
        cur.close()
