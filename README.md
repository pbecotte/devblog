# Developer Blog

This is my little personal project.  I wanted a CMS project that I could mess
with and deploy easily.  Using docker-machine and docker-compose, this got to
be pretty easy.

First, create a file blog/secrets.py with the following content...
```python
SECRET_KEY = '<secrets!>'
S3_LOCATION = '<the s3 endpoint for your image hosting bucket'
S3_KEY = '<secret!>'
S3_SECRET = '<secret!>'
S3_UPLOAD_DIRECTORY = 'img'
S3_BUCKET = '<your bucket name>'
```

This lets you upload header images for blog posts and store them in an
s3 bucket.  If you don't want an s3 bucket, don't specify an image to
upload ;)  The user specified by the key must have write permissions on
the bucket, and the bucket must be set up for static website hosting.

Create a machine remotely with docker installed with machine-

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
