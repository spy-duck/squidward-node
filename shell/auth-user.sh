#!/bin/bash
while read line
do
  echo "$line" >> /etc/squid/certs/auth.log
#  echo "$line" | node /etc/squid/auth.js
done < "${1:-/dev/stdin}"

echo "OK"

