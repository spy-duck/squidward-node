node_dir=/opt/squidward-node


# === Logging === #

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


if [ -d "$node_dir" ]; then
    log_error "Node already installed"
    exit 0
fi

log_start "# Installing Node"

mkdir -p $node_dir && cd $node_dir || exit

log "# Get docker-compose.yml"
wget --inet4-only -N -O $node_dir/docker-compose.yml https://raw.githubusercontent.com/spy-duck/squidward-node/refs/heads/main/docker-compose.yml

log "# Get .env"
wget --inet4-only -N -O $node_dir/.env https://raw.githubusercontent.com/spy-duck/squidward-node/refs/heads/main/.env.sample

log "# Get squidward-node.sh"
wget --inet4-only -N -O $node_dir/squidward-node.sh https://raw.githubusercontent.com/spy-duck/squidward-node/refs/heads/main/squidward-node.sh
chmod +x $node_dir/squidward-node.sh

# Generate secure keys
redis_password=$(openssl rand -hex 24)


email_regex="^[a-z0-9!#\$%&'*+/=?^_\`{|}~-]+(\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]([a-z0-9-]*[a-z0-9])?\$"
while true; do
  read -rp "Enter node domain (ex. usa.squidward.tech): " node_domain
  if host -t a $node_domain | grep -q "$node_domain has address"; then
    break
  else
    log_error "Please enter a valid hostname for SSL proxy"
  fi
done

while true; do
    read -rp "Enter your email for letsencrypt: " letsencrypt_email
    if [[ $letsencrypt_email =~ $email_regex ]] ; then
        break
    else
        log_error "Please enter a valid email address"
    fi
done

read -rp "Enter API port [ex. 54123]: " api_port
read -rp "Enter SSL_CERT: " ssl_cert


echo "# Update .env"
sed -i "s/^DOMAIN=.*/DOMAIN=$node_domain/" .env
sed -i "s/^LETSENCRYPT_EMAIL=.*/LETSENCRYPT_EMAIL=$letsencrypt_email/" .env
sed -i "s/^REDIS_PASSWORD=.*/REDIS_PASSWORD=$redis_password/" .env
sed -i "s/^APP_PORT=.*/APP_PORT=$api_port/" .env
sed -i "s/^SSL_CERT=.*/$ssl_cert/" .env

log_success "Node installed"

while true; do
    read -rp "Start squidward panel?: [Y/n] " yn
    case $yn in
        [Yy]* )
          docker compose up -d && docker compose logs -f
          break;;
        [Nn]* )
          exit;;
        * ) log_error "Please enter Yy|Nn";;
    esac
done