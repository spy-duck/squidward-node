docker_build:
	docker build --progress=plain -t squidwardproxy/squidward-node:dev .

dev_rebuild: docker_build
	docker compose down && docker compose -f docker-compose.dev.yml up -d