FROM node:20.12.2-alpine3.18 AS base
RUN apk add --no-cache python3 make g++

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS production-deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN export $(cat .production.env | xargs) && node ace build

FROM node:20.12.2-alpine3.18 AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=build /app/build ./
COPY --from=build /app/.production.env ./.env
EXPOSE 3333
CMD ["sh", "-c", "node ace migration:run --force && node ./bin/server.js"]
