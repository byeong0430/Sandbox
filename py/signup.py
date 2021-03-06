#!/usr/bin/python

print("Content-type: text/plain\r\n")

#Import modules
import json, cgi, cgitb, MySQLdb
import string

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

#Get the json keys
keys = data.keys()

#Save the passed variables. Make sure each character variable is quoted 
for x in range(0, len(keys)):
    key_name = keys[x]
    val = data[key_name].value

    #First letter of each word in the business name should be capitalised
    if key_name == "business_name":
        val = string.capwords(val)
    
    globals()[key_name] = repr(val)

#Password should be hashed before it is saved in mysql
input_password = "PASSWORD(" + input_password + ")" #Change 

try:
    radio_Y
except NameError:
    member_type = "1" #If "no" was selected (self-employed), member_type is 1
else:
    member_type = "2" #If "yes" was selected (self-employed), member_type is 2

#Create a string by ","
val_array = [input_email, input_password, business_name, member_type]
values = "(" + delim.join(val_array) + ")"

#Create a query
insert_query = "INSERT IGNORE INTO %s (%s) VALUES %s" % (sql_tbl, delim.join(sql_col), values)
#End - 1. Construct insert query


#2. Execute the insert query
try:
    db = MySQLdb.connect(host=host, user=user, passwd=password, db=dbase) #Access the database
    try:
        cur = db.cursor() #You must create a Cursor object. It will let you execute all the queries you need
        cur.execute(insert_query) #Execute the insert query
        db.commit()
        print(1) # Query successfully executed
    except MySQLdb.Error as e: #Insert query error
        print("MySQL Error [%d]" % (e.args[0]))
except MySQLdb.Error as e: #DB error
    print("MySQL Error [%d]" % (e.args[0]))

if cur != None:
    cur.close()