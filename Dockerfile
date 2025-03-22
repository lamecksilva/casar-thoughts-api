# Builder stage
FROM node:20 AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# Run stage
FROM node:18 AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json yarn.lock ./

EXPOSE 3000

CMD ["yarn", "start:prod"]
