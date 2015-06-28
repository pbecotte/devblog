FROM phusion/baseimage

RUN apt-get update && apt-get install -y python python-dev python-pip \
    git uwsgi-plugin-python uwsgi nginx \
    && easy_install -U pip \
    && rm -rf /var/lib/apt/lists/*

ADD requirements.txt /
RUN pip install -r /requirements.txt

COPY conf/runit /etc/service/
COPY conf/nginx /etc/nginx/
COPY conf/init /etc/my_init.d/

RUN groupadd uwsgi && useradd -g uwsgi -G www-data uwsgi

WORKDIR /data

# Use baseimage-docker init system entrypoint, by default just run that!
CMD []
ENTRYPOINT ["/sbin/my_init"]


COPY . /data/
ENV PYTHONPATH=/data
