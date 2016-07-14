FROM python:2.7

ADD requirements.txt /
RUN pip install -r /requirements.txt

RUN groupadd uwsgi && useradd -g uwsgi -G www-data uwsgi \
	&& mkdir /storage \
	&& chown uwsgi:www-data /storage

WORKDIR /data

COPY . /data/
ENV PYTHONPATH=/data
