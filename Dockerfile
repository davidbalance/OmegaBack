# -------------------------------- DEVELOPMENT STAGE --------------------------------
FROM node:20-slim AS builder

# Install dependencies for building
RUN apk add --no-cache libc6-compat bash

WORKDIR /usr/src/app

# Set environment variable for build stage
ENV NODE_ENV=build

# Copy only the package.json and package-lock.json first to leverage Docker cache for dependencies
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY --chown=node:node . ./

# Generate Prisma client, build the project, and remove dev dependencies
RUN npx prisma generate && npm run build && npm prune --omit=dev

# -------------------------------- PRODUCTION STAGE --------------------------------
FROM node:20-slim AS production

# Install dependencies needed for runtime
RUN apk add --no-cache \
    libc6-compat bash \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    fontconfig \
    dumb-init \
    udev

WORKDIR /usr/src/app

# Set environment variable for production stage
ENV NODE_ENV=production
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV CHROMIUM_PATH=/usr/bin/chromium

# Switch to root to create directories and ensure correct permissions
RUN mkdir -p .disk/medical_file \
    .disk/signatures \
    .disk/medical_report \
    .disk/old-eeq \
    .disk/old-ipeges 

# Copy package.json and package-lock.json for production dependencies
COPY --from=builder --chown=node:node /usr/src/app/package*.json ./

# Copy the necessary files from the builder stage
COPY --from=builder --chown=node:node /usr/src/app/node_modules ./node_modules/
COPY --from=builder --chown=node:node /usr/src/app/dist ./dist/
COPY --from=builder --chown=node:node /usr/src/app/static ./static/
COPY --from=builder --chown=node:node /usr/src/app/prisma ./prisma/

USER node

# Default command to run the app
CMD ["node", "dist/main.js"]
