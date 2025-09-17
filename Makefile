docker_build:
	docker build --progress=plain -t squidwardproxy/squidward-node .

deploy:
	tsx ./shell/deploy.js