FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_DATABASE broadcast
ENV MYSQL_USER admin
ENV MYSQL_PASSWORD root

COPY ./sql-scripts /docker-entrypoint-initdb.d