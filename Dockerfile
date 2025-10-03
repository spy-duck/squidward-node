FROM squidwardproxy/squidward-squid

ARG CONTAINER_TZ=UTC

ENV TZ=${CONTAINER_TZ}

WORKDIR /app

RUN apt update \
    && apt install -y apache2-utils supervisor

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# setup acme.sh
RUN mkdir -p /etc/squid/certs
COPY shell/cert-renew-hook.sh .

# cleanup
RUN apt clean
RUN rm -rf /var/lib/apt/lists/*

COPY ./supervisord.conf .

COPY shell/start-squid.sh /etc/squid/start-squid.sh
RUN chmod +x /etc/squid/start-squid.sh

COPY ./shell/squid-auth-connector.js /app/bin/squid-auth-connector.js

COPY shell/docker-entrypoint.sh /usr/local/bin/entrypoint.sh

COPY package*.json ./
COPY ./node_modules ./node_modules
COPY ./dist/src/main.js .
COPY ./dist/libs/squid-auth-handler/index.js /app/bin/squid-auth-handler.js

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

CMD tail -f /dev/null




