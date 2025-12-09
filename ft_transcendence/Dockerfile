FROM node:20-alpine AS builder

RUN apk add --no-cache sqlite sqlite-dev && npm install -g typescript

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
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "server"]
