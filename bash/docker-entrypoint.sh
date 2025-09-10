#!/bin/bash

echo "[Entrypoint] Starting entrypoint script..."

n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; cp -r $n/{bin,lib,share} /usr/local
echo "Node version: $(/usr/local/bin/node -v)"

chown squid:squid /etc/squid/auth.js
chmod 700 /etc/squid/auth.js


if [ ! -f /root/.acme.sh/acme.sh ]; then
  curl https://get.acme.sh | sh -s email="${LETSENCRYPT_EMAIL}"

  /root/.acme.sh/acme.sh \
    --issue \
    --standalone \
    -d "${DOMAIN}" \
    --key-file /etc/squid/certs/privkey.key \
    --fullchain-file /etc/squid/certs/fullchain.pem \
    --alpn \
    --tlsport 8443 \
    --renew-hook "/etc/squid/certs/cert-renew-hook.sh" \
    || echo "Error: Failed to get certificate" && exit 1
fi

#squid -k parse

mkdir -p /var/spool/squid
mkdir -p /var/log/squid

chown -R squid:squid /var/spool/squid
chown -R squid:squid /var/log/squid

rm -rf /var/run/squid /var/run/squid.pid

#if [ ! -d /var/spool/squid/00 ]; then
#  echo "Initializing cache..."
#  /usr/sbin/squid -N -f /etc/squid/squid.conf -z
#fi
#
#echo "Starting squid..."
#/usr/sbin/squid -f /etc/squid/squid.conf -NYCd 1 || tail -f /var/log/squid/auth.log

NODE_ENV='development' npm run start:dev