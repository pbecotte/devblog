# Developer Blog

This is my little personal project.  I wanted a CMS project that I could mess
with and deploy easily.  Using docker-machine and docker-compose, this got to
be pretty easy.  Create a machine remotely with docker installed with machine-

```sh
export DIGITAL_OCEAN_TOKEN=<a digital ocean token>

docker-machine create \
  --driver digitalocean \
  --digitalocean-access-token=$DIGITAL_OCEAN_TOKEN \
  digital-ocean
```
(if you want to use another hosting provider, feel free!)
Point your docker client at that machine

```sh
eval "$(docker-machine env digital-ocean)"
```

Launch your environment

```sh
docker-compose -f deploy.yml up -d
docker-compose -f deploy.yml run --rm blog alembic upgrade head
```

Add a user to the db with

```sh
docker-compose -f deploy.yml run --rm blog python blog/init.py myemail@example.com mypassword
```

After doing code changes,

```sh
docker-compose -f deploy.yml build blog
docker-compose -f deploy.yml up -d blog
```
