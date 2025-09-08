FROM ubuntu/squid

# https://community.letsencrypt.org/t/lets-encrypt-certificate-for-client-to-squid-proxy-encryption/206978/12
RUN set -eux; \
	apt-get update; \
	DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
		squid-openssl; \
    rm -rf /var/lib/apt/lists/*; \
	/usr/sbin/squid --version

RUN apt update && apt install -y squid-common ssl-cert ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_22.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt update && apt install -y nodejs

ENV TZ=Europe/Moscow

EXPOSE 3128
EXPOSE 3129

ENTRYPOINT ["entrypoint.sh"]

CMD ["-f", "/etc/squid/squid.conf", "-NYC"]
