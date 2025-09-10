#!/bin/bash

rm -rf /var/run/squid /var/run/squid.pid

if [ ! -d /var/spool/squid/00 ]; then
  echo "Initializing cache..."
  /usr/sbin/squid -N -f /etc/squid/squid.conf -z
fi

echo "Starting squid..."
/usr/sbin/squid -f /etc/squid/squid.conf -NYCd 1