# Builder stage
FROM node:20 AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN rm -rf dist && yarn build

# Run stage
FROM node:20 AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/ ./tsconfig.json
COPY package.json yarn.lock ./

EXPOSE 3000

CMD ["node", "dist/main"]
