FROM squidwardproxy/squidward-squid

ARG CONTAINER_TZ=UTC
ARG BUILD_VERSION

ENV TZ=${CONTAINER_TZ}
ENV VERSION=${BUILD_VERSION}

WORKDIR /app

RUN apt update \
    && apt install -y apache2-utils supervisor

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN adduser --system --no-create-home --group --disabled-login squid

# setup acme.sh
RUN mkdir -p /etc/squid/certs
COPY shell/cert-renew-hook.sh .
RUN chmod +x cert-renew-hook.sh

# cleanup
RUN apt clean
RUN rm -rf /var/lib/apt/lists/*

# Istall Vector
RUN curl --proto '=https' --tlsv1.2 -sSfL https://sh.vector.dev | bash -s -- -y --prefix /usr/local
COPY ./vector.yaml /etc/vector/
COPY ./vector.debug.yaml /etc/vector/
COPY ./shell/start-vector.sh /usr/local/bin/start-vector.sh
RUN chmod +x /usr/local/bin/start-vector.sh
RUN mkdir -p /var/lib/vector

# Copy node files
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
