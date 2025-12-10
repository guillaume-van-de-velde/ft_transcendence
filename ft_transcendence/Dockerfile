FROM node:20-alpine AS builder

RUN apk add --no-cache sqlite sqlite-dev openssl && npm install -g typescript

WORKDIR /app

COPY . .

WORKDIR /app/front
RUN npm install

WORKDIR /app/back
RUN npm install

RUN cp /app/.env /app/back/.env

WORKDIR /app/front
RUN export $(grep IP_MACHINE /app/back/.env | xargs) && sed -i "s|https://localhost|https://$IP_MACHINE|g" ./app/index.ts
RUN npx tailwindcss -i ./style/input.css -o ./style/output.css
RUN tsc --project config/tsconfig.json

WORKDIR /app/back

RUN mkdir -p ./cert

RUN openssl req -x509 -nodes -days 365 \
    -newkey rsa:2048 \
    -keyout ./cert/server.key \
    -out ./cert/server.cert \
    -subj "/C=FR/ST=Ile-de-France/L=Paris/O=./OU=./CN=localhost"

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "server"]
