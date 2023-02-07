FROM nginx:1.21-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
RUN mkdir /certs/
COPY ./securkey.crt /certs/securkey.crt
COPY ./securkey.key /certs/securkey.key
RUN mkdir /code
WORKDIR /code
ADD .. /code/