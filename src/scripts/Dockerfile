FROM nginx:latest
RUN rm /etc/nginx/conf.d/*
COPY  build/ /usr/share/nginx/html
COPY  src/scripts/nginx.conf  /etc/nginx/conf.d/

RUN chown -R nginx /usr/share/nginx/html
RUN chown -R nginx /etc/nginx/conf.d
RUN chmod -R 765 /usr/share/nginx/html

EXPOSE 80 443
