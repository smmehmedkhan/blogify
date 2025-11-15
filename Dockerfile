# Use exact Node version from your package.json
FROM node:22-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm@10

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies (cached layer)
RUN pnpm install --frozen-lockfile --prod

# Development stage
FROM base AS dev
RUN pnpm install --frozen-lockfile
COPY . .
CMD ["pnpm", "run", "dev"]

# Production build stage
FROM base AS build
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build:docker

# Production stage
FROM node:22-alpine AS production
RUN npm install -g pnpm@10
WORKDIR /app

# Copy only production files
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/server.js ./
COPY --from=build /app/app.js ./
COPY --from=build /app/config ./config
COPY --from=build /app/controllers ./controllers
COPY --from=build /app/middlewares ./middlewares
COPY --from=build /app/models ./models
COPY --from=build /app/routes ./routes
COPY --from=build /app/services ./services
COPY --from=build /app/utils ./utils
COPY --from=build /app/views ./views
COPY --from=build /app/public ./public

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S blogify -u 1001
USER blogify

EXPOSE 3000
CMD ["pnpm", "start"]
