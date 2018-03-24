#!/usr/bin/python

print("Content-type: text/plain\r\n")

#Import modules
import string, random
import json, cgi, cgitb, MySQLdb


#User-defined function
#Random id generator
def id_generator(size=40, chars=string.ascii_uppercase + string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


#Variables
account_tbl = "account"
login_tbl = "logged_in"
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
insert_query = "INSERT IGNORE INTO %s (%s) VALUES %s" % (login_tbl, delim.join(sql_col), values)
#End - 1. Construct insert query


#2. Execute the insert query
#e[0] is the error code in int format
#e[1] is the complete error message in str format
try:
    db = MySQLdb.connect(host=host, user=user, passwd=password, db=dbase) #Access the database
    try:
        cur = db.cursor() #You must create a Cursor object. It will let you execute all the queries you need
        cur.execute(insert_query) #Execute the insert query
        try:
            #After inserting the given data into logged_in table, check if 1. the given email exists in the account table
            #2. If so, check if the given password matches what's in the account table.
            match_query = \
            "SELECT %s.password AS a_pswd, A.password AS l_pswd, %s.account_id AS a_id FROM %s \
            LEFT JOIN (SELECT * FROM %s WHERE token = %s) AS A on %s.email = A.email \
            WHERE account.email = %s" % \
            (account_tbl, account_tbl, account_tbl, login_tbl, token, account_tbl, login_email)

            #Compare the password stored in account and given password
            cur.execute(match_query)
            match_result = cur.fetchall()

            for row in match_result:
                if row[0] == row[1]:
                    print(str(1) + ";" + str(row[2])) #If username & password are matching
                else:
                    print(0) #If not!
            
            try:
                #Remove the login instance in "logged_in" Table
                remove_query = \
                "DELETE FROM %s WHERE token = %s" % (login_tbl, token)

                #Execute the delete query
                cur.execute(remove_query)
            except MySQLdb.Error as e: #Remove query error
                print("MySQL Error [%d]" % (e.args[0]))

        except MySQLdb.Error as e: #Username, password matching error
            print("MySQL Error [%d]" % (e.args[0]))
    except MySQLdb.Error as e: #Insert query error
        print("MySQL Error [%d]" % (e.args[0]))
except MySQLdb.Error as e: #DB error
    print("MySQL Error [%d]" % (e.args[0]))

#If cur instance still exists, close it
if cur != None:
    cur.close()