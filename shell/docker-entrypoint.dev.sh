#!/bin/bash

echo "[Entrypoint] Starting entrypoint script..."

echo "Node version: $(/usr/local/bin/node -v)"

#squid -k parse

mkdir -p /var/spool/squid
mkdir -p /var/log/squid

chown -R squid:squid /var/spool/squid
chown -R squid:squid /var/log/squid

supervisord -c /app/supervisord.conf & NODE_ENV='development' npm run start:dev