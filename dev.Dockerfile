FROM ubuntu:24.04

ARG CONTAINER_TZ=UTC

ENV TZ=${CONTAINER_TZ}

WORKDIR /app

RUN apt update
RUN apt install -y \
    wget \
    curl \
    openssl \
    cron \
    socat \
    build-essential \
    libssl-dev

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# setup Squid
ARG SQUID_VERSION=7.1

RUN useradd -r -s /sbin/nologin squid

RUN wget -q https://github.com/squid-cache/squid/releases/download/SQUID_${SQUID_VERSION//./_}/squid-${SQUID_VERSION}.tar.gz -O /tmp/squid.tgz \
    && mkdir /tmp/squid \
    && tar xzf /tmp/squid.tgz --strip-components=1 -C /tmp/squid

RUN cd /tmp/squid && ./configure \
        --prefix=/usr \
        --datadir=/usr/share/squid \
        --sysconfdir=/etc/squid \
        --libexecdir=/usr/lib/squid \
        --localstatedir=/var \
        --with-logdir=/var/log/squid \
        --disable-strict-error-checking \
        --disable-arch-native \
        --enable-removal-policies="lru,heap" \
        --enable-auth-basic="getpwnam" \
        --enable-log-daemon-helpers="file" \
        --enable-epoll \
        --disable-mit \
        --enable-delay-pools \
        --enable-arp-acl \
        --enable-openssl \
        --enable-ssl-crtd \
        --enable-linux-netfilter \
        --enable-ident-lookups \
        --enable-useragent-log \
        --enable-cache-digests \
        --enable-referer-log \
        --enable-async-io \
        --enable-truncate \
        --enable-arp-acl \
        --enable-htcp \
        --enable-carp \
        --enable-poll \
        --enable-follow-x-forwarded-for \
        --with-large-files \
        --with-default-user=squid \
        --with-openssl

RUN cd /tmp/squid && make
RUN cd /tmp/squid && make install


# setup NVM
COPY ./.nvmrc .
ENV BASH_ENV /root/.bash_env
RUN touch "${BASH_ENV}" && echo '. "${BASH_ENV}"' >> ~/.bashrc
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | PROFILE="${BASH_ENV}" bash
RUN nvm install
RUN nvm use default
RUN node -v



# setup acme.sh
RUN mkdir -p /etc/squid/certs
COPY shell/cert-renew-hook.sh .

RUN apt install -y apache2-utils supervisor

# cleanup
RUN rm -rf /tmp/squid
RUN apt clean
RUN rm -rf /var/lib/apt/lists/*

COPY ./supervisord.conf .

COPY shell/start-squid.sh /etc/squid/start-squid.sh
RUN chmod +x /etc/squid/start-squid.sh

COPY shell/squid-auth-connector.js /etc/squid/squid-auth-connector.js
RUN chmod +x /etc/squid/squid-auth-connector.js
RUN chown squid:squid /etc/squid/squid-auth-connector.js
RUN chmod 700 /etc/squid/squid-auth-connector.js

COPY shell/docker-entrypoint.sh /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

CMD tail -f /dev/null




