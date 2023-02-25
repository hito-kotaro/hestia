FROM node

WORKDIR /hestia
COPY package.json .
RUN npm i
COPY .. .
ADD docker/entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
