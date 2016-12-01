FROM node:6

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

COPY . /app
WORKDIR /app
EXPOSE 9000

CMD ["server.js"]
