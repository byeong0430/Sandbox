#!/usr/bin/python
import json, cgi, cgitb, MySQLdb

print("Content-type: text/plain\r\n")

#Variables
sql_tbl = "account"
sql_col = ["email", "password", "member_name", "member_type"]
host = "localhost"
user = "update_user"
password = "Qudrb0430!"
dbase = "byeong_dev"
delim = ","

#1. Construct insert query
cgitb.enable() # for troubleshooting
data = cgi.FieldStorage() #Start an instant

email = data['input_email'].value
password = data['input_password'].value
member_name = data['business_name'].value
member_type = 2

#Construct mysql insert query
insert_query = "INSERT INTO %s (%s) VALUES ('%s', PASSWORD('%s'), '%s', %s)" % (sql_tbl, delim.join(sql_col), email, password, member_name, member_type)

#2. Execute the insert query
db = MySQLdb.connect(host=host, user=user, passwd=password, db=dbase)

#You must create a Cursor object. It will let you execute all the queries you need
cur = db.cursor()

#Execute the insert query
try:
    sql_exe = cur.execute(insert_query)
    db.commit()
    print(insert_query)
    print("Update successful!")
#except MySQLdb.Error as e:
#    print(e)
finally:
    if cur != None:
        cur.close()