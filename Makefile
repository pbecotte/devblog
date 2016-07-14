MACHINE=digital-ocean

dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
build:
	docker-compose -f docker-compose.dev.yml -f docker-compose.yml build
	docker build -t building frontend
	docker run --rm -v `pwd`/frontend/node_modules:/app/node_modules building npm install --unsafe-perm

backup:
	eval `docker-machine env $(MACHINE)` && docker-compose -p blog -f docker-compose.yml -f docker-compose.admin.yml run --rm backup > backup.sql
restore:
	docker-machine scp backup.sql $(MACHINE):/tmp/backup.sql
	eval `docker-machine env $(MACHINE)` && docker-compose -p blog -f docker-compose.yml -f docker-compose.admin.yml run --rm restore
deploy:
	eval `docker-machine env $(MACHINE)` && docker-compose build
	eval `docker-machine env $(MACHINE)` && docker-compose -p blog up -d
migrate:
	eval `docker-machine env $(MACHINE)` && docker-compose -p blog -f docker-compose.yml -f docker-compose.admin.yml build
	eval `docker-machine env $(MACHINE)` && docker-compose -p blog -f docker-compose.yml -f docker-compose.admin.yml run --rm migrate
migrate-dev:
	docker-compose -f docker-compose.yml -f docker-compose.admin.yml build
	docker-compose -f docker-compose.yml -f docker-compose.admin.yml run --rm migrate
