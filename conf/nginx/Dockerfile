FROM nginx

copy conf/nginx/nginx.conf /etc/nginx/
copy conf/nginx/sites-enabled/default.conf /etc/nginx/conf.d/
copy blog/static/ /data/blog/static/
RUN chown -R www-data /data
