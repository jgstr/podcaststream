FROM mysql:5.7

ENV MYSQL_DATABASE broadcast
ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_USER admin
ENV MYSQL_PASSWORD root
ENV MYSQL_HOST db

EXPOSE 3306

# TODO make the relevant SQL scripts to create a table
COPY ./name-of-scripts /docker-entrypoint-initdb.d/