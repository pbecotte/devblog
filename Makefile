MACHINE=digitalocean

dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
backup:
	eval `docker-machine env $(MACHINE)` && docker-compose -f docker-compose.yml -f docker-compose.admin.yml run --rm backup > backup.sql
restore:
	docker-machine scp backup.sql $(MACHINE):/tmp/backup.sql
	eval `docker-machine env $(MACHINE)` && docker-compose -f docker-compose.yml -f docker-compose.admin.yml run --rm restore
deploy:
	eval `docker-machine env $(MACHINE)` && docker-compose build
	eval `docker-machine env $(MACHINE)` && docker-compose up -d
migrate:
	eval `docker-machine env $(MACHINE)` && docker-compose -f docker-compose.yml -f docker-compose.admin.yml build
	eval `docker-machine env $(MACHINE)` && docker-compose -f docker-compose.yml -f docker-compose.admin.yml run --rm migrate
migrate-dev:
	docker-compose -f docker-compose.yml -f docker-compose.admin.yml build
	docker-compose -f docker-compose.yml -f docker-compose.admin.yml run --rm migrate
