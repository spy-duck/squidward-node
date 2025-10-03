#!/bin/bash

LETSENCRYPT_EMAIL=$(cat /run/secrets/letsencrypt_email)
DOMAIN=$(cat /run/secrets/domain)
export REDIS_PASSWORD=$(cat /run/secrets/valkey_password)
export APP_PORT=$(cat /run/secrets/app_port)
export SSL_CERT=$(cat /run/secrets/ssl_cert)

log_start() {
    echo -e "\033[94m◐ \033[0m$1"
}

log_success() {
    echo -e "\033[92m✔ \033[0m$1"
}

log() {
    echo -e "\033[37mℹ \033[0m$1"
}

log_error() {
    echo -e "\033[101;97m ERROR \033[0;31m $1\033[0m"
}

log "Domain: ${DOMAIN}"
log "LetsEncrypt email: ${LETSENCRYPT_EMAIL}"
log "Node version: $(/usr/local/bin/node -v)"

if [ ! -f /etc/squid/certs/privkey.key ]; then
  if [ ! -f /root/.acme.sh/acme.sh ]; then
    log_start "Installing acme.sh..."
    curl https://get.acme.sh | sh -s email="${LETSENCRYPT_EMAIL}" || log_error "Failed to install acme.sh" && exit 1
    log_success "Acme.sh installed."
  fi

  log_start "Requesting certificate..."
  /root/.acme.sh/acme.sh \
    --issue \
    --standalone \
    -d "${DOMAIN}" \
    --key-file /etc/squid/certs/privkey.key \
    --fullchain-file /etc/squid/certs/fullchain.pem \
    --alpn \
    --tlsport 8443 \
    --renew-hook "/app/cert-renew-hook.sh" \
    --debug 2\
    || log_error "Certificate request failed" && exit 1

    bash /app/cert-renew-hook.sh

    log_success "Certificate obtained."
fi

#squid -k parse

mkdir -p /var/spool/squid
mkdir -p /var/log/squid

chown -R squid:squid /var/spool/squid
chown -R squid:squid /var/log/squid

chmod +x /app/bin/squid-auth-connector.js
chown squid:squid /app/bin/squid-auth-connector.js
chmod 700 /app/bin/squid-auth-connector.js

log_start "Starting supervisor and node app..."
supervisord -c /app/supervisord.conf & NODE_ENV='production' node /app/main.js