FROM nginx

copy misc/nginx/nginx.conf /etc/nginx/
copy misc/nginx/sites-enabled/default.conf /etc/nginx/conf.d/
copy backend/blog/static/ /data/blog/static/
RUN chown -R www-data /data
