MACHINE=digitalocean
# Comment out this line if you don't want to use the digital ocean volume plugin
VOLUME=-f docker-compose.deploy.yml
#VOLUME=

#####################
# Dev Targets
#####################
build:
	mkdir -p frontend/dist
	docker build -t building frontend
	docker run --rm -v `pwd`/frontend/node_modules:/app/node_modules building npm install --unsafe-perm
	docker-compose build
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
	eval `docker-machine env $(MACHINE)` && docker-compose -p blog -f docker-compose.yml $(VOLUME) up -d postgres
	eval `docker-machine env $(MACHINE)` && docker-compose -p blog -f docker-compose.yml $(VOLUME) -f docker-compose.admin.yml  run --rm restore
deploy:
	docker-compose build frontend
	docker-compose run --rm frontend npm run build
	eval `docker-machine env $(MACHINE)` && docker-compose -f docker-compose.yml -p blog build
	eval `docker-machine env $(MACHINE)` && docker-compose -p blog $(VOLUME) -f docker-compose.yml up -d postgres
	eval `docker-machine env $(MACHINE)` && docker-compose -p blog $(VOLUME) -f docker-compose.yml run --rm blog alembic upgrade head
	eval `docker-machine env $(MACHINE)` && docker-compose -p blog $(VOLUME) -f docker-compose.yml up -d
setup_volume:
	docker-machine ssh $(MACHINE) sed -i '/MountFlags=slave/d' /etc/systemd/system/docker.service
	-docker-machine restart $(MACHINE)
	until docker-machine ssh $(MACHINE) echo 'Worked'; do sleep 5; done
	eval `docker-machine env $(MACHINE)` && docker run -v /dev:/dev -v /run/docker/plugins:/run/docker/plugins -v /do_volumes/:/do_volumes:rshared \
    	--privileged -d --restart always \
    	-e DIGITAL_OCEAN_TOKEN=$(DO_TOKEN) \
    	pbecotte/digital_ocean_volumes
