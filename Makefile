MACHINE=digital-ocean

#####################
# Dev Targets
#####################

build:
	docker-compose build
	docker build -t building frontend
	docker run --rm -v `pwd`/frontend/node_modules:/app/node_modules building npm install --unsafe-perm
migrate:
	docker-compose run --rm blog python blog/fixtures.py
up:
	docker-compose up -d
	$(MAKE) migrate
restart:
	docker-compose restart blog frontend nginx
down:
	docker-compose down -v --remove-orphans

#####################
# Deploy Targets
#####################

backup:
	eval `docker-machine env $(MACHINE)` && docker-compose -p blog -f docker-compose.yml -f docker-compose.admin.yml run --rm backup > backup.sql
restore:
	docker-machine scp backup.sql $(MACHINE):/tmp/backup.sql
	eval `docker-machine env $(MACHINE)` && docker-compose -p blog -f docker-compose.yml -f docker-compose.admin.yml run --rm restore
deploy:
	docker-compose build frontend
	docker-compose run --rm frontend npm run build
	eval `docker-machine env $(MACHINE)` && docker-compose -f docker-compose.yml -p blog build
	eval `docker-machine env $(MACHINE)` && docker-compose -p blog -f docker-compose.yml run --rm blog alembic upgrade head
	eval `docker-machine env $(MACHINE)` && docker-compose -f docker-compose.yml -p blog up -d
