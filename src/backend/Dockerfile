
# Get NPM packages
FROM node:16-alpine AS dependencies
RUN apk add --no-cache libc6-compat yarn git
WORKDIR /app
COPY package.json ./
RUN rm -rf node_modules && yarn install

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app
COPY --from=builder /app .

ENV PORT 8080
EXPOSE 8080
CMD ["yarn", "start"]
