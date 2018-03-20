#!/usr/bin/python
import json, cgi, cgitb, MySQLdb

#Variables
sql_tbl = "location"
sql_col = ["account_id", "place_name", "place_id"]
delim = ","
update_val = []

#1. Construct insert query
cgitb.enable() # for troubleshooting
data = cgi.FieldStorage() #Start an instant

#Extract the account ID. Each instance contains only 1 account ID
accountID = data['accountID'].value 

#There can be multiple place IDs
keys = data.keys() #First get all key names in data
nameKeys = filter(lambda k: 'name' in k, keys) #Get keys for place names
placeidKeys = filter(lambda k: 'placeid' in k, keys)#Get keys for place IDs

#Calculate how many places are stored in json
placeLength = len(placeidKeys)

for x in range(0, placeLength):
    baseKey = 'places[loc_' + str(x) + ']' #Create the base of key names

    #repr() wraps variables with ''
    eachName = repr(data.getvalue(baseKey + '[name]')) #Get each place name
    eachPlaceid = repr(data.getvalue(baseKey + '[placeid]')) #Get each place id

    #Join account id, place name, and place id
    val = delim.join([accountID, eachName, eachPlaceid])
    val_bracket = "(" + val + ")"

    update_val.append(val_bracket) #Push the result into empty array update_val

#Implode update_val
multi_val = delim.join(update_val)

#Construct mysql insert query
insert_query = "INSERT IGNORE INTO " + sql_tbl + " (" + delim.join(sql_col) + ") VALUES " + multi_val 
#End - 1. Construct insert query

#2. Execute the insert query
db = MySQLdb.connect(host="localhost", user="admin_user", passwd="Pe2chMonkeyD2nce!", db="byeong_dev")

#You must create a Cursor object. It will let you execute all the queries you need
cur = db.cursor()

print("Content-type: text/plain\r\n")
#Execute the insert query
try:
    sql_exe = cur.execute(insert_query)
    db.commit()
    print("Update successful!")
except MySQLdb.Error as e:
    print(e)
finally:
    if cur != None:
        cur.close()

