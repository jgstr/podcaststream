FROM mysql:5.7

# Environment variables required for MYSQL to run. These are specified by the official MySQL image and are used
# to create the users and database.
ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_DATABASE broadcast
ENV MYSQL_USER admin
ENV MYSQL_PASSWORD root
EXPOSE 3306

COPY ./sql-scripts /docker-entrypoint-initdb.d