FROM mysql:5.7

# These are environment variables that can be used instead of hard-coded into the server.js file... at some point.
ENV MYSQL_DATABASE broadcast
ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_USER admin
ENV MYSQL_PASSWORD root
ENV MYSQL_HOST localhost

EXPOSE 3306

COPY ./sql-scripts /docker-entrypoint-initdb.d/