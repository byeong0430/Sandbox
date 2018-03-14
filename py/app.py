#!/usr/bin/python

import cgi, cgitb
cgitb.enable()

data = cgi.FieldStorage()

print "Content-type:text/html\r\n"
print data['a'].value + data['b'].value
