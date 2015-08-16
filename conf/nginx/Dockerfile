FROM nginx

copy conf/nginx/nginx.conf /etc/nginx/
copy conf/nginx/sites-enabled/default.conf /etc/nginx/conf.d/
copy blog/static/* /data/blog/static/
RUN chmod -R 664 /data/blog/static/
