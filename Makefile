docker_build:
	docker build --progress=plain -t squidwardproxy/squidward-node:dev .

dev_rebuild:
	npm run build:squid-auth-handler
	make docker_build
	docker compose down && docker compose -f docker-compose.dev.yml up -d

vector_logs:
	docker compose -f docker-compose.dev.yml exec squidward-node bash -c "tail -f /var/log/squid/vector_access.log"