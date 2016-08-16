FROM nginx

copy misc/nginx/nginx.conf /etc/nginx/
copy misc/nginx/sites-enabled/default.conf /etc/nginx/conf.d/
copy frontend/dist /app/dist
RUN chown -R www-data /app
