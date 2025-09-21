#!/bin/bash

echo "[Entrypoint] Starting entrypoint script..."

n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; cp -r $n/{bin,lib,share} /usr/local
echo "Node version: $(/usr/local/bin/node -v)"


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
    --renew-hook "/app/cert-renew-hook.sh" \
    || echo "Error: Failed to get certificate" && exit 1
fi

#squid -k parse

mkdir -p /var/spool/squid
mkdir -p /var/log/squid

chown -R squid:squid /var/spool/squid
chown -R squid:squid /var/log/squid

supervisord -c /app/supervisord.conf & NODE_ENV='development' npm run start:dev