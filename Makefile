docker_build:
	docker build --progress=plain -t squidwardproxy/squidward-node .

deploy:
	tsx ./shell/deploy.js

dev_build:
	tsx ./shell/deploy.js --yes --no-push