# -------------------------------- DEVELOPMENT STAGE --------------------------------
FROM node:20-slim AS builder

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
FROM node:20-bookworm-slim

# Install latest Chrome dependencies and fonts
RUN apt-get update \
    && apt-get install -y wget gnupg ca-certificates procps libxss1 \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome \
    CHROMIUM_PATH=/usr/bin/google-chrome

WORKDIR /usr/src/app

# Set environment variable for production stage
ENV NODE_ENV=production

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

# USER node

# Default command to run the app
CMD ["node", "dist/main.js"]
