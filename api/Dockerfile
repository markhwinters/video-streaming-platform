FROM node:24-alpine3.22 

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY server.js .
COPY db ./db
COPY routes ./routes
COPY schemas ./schemas

EXPOSE 3001

CMD ["node", "server.js"]