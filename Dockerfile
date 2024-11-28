# ------------------------------DEVELOPMENT STAGE------------------------------
FROM node:22-alpine AS development
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

ENV APP_ENVIRONMENT development

# RUN addgroup --system --gid 1001 node
# RUN adduser --system --uid 1001 node

COPY --chown=node:node . .

RUN npm install

USER node

# ------------------------------BUILD STAGE-----------------------------------
FROM node:22-alpine AS build
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

ENV APP_ENVIRONMENT production

# RUN addgroup --system --gid 1001 node
# RUN adduser --system --uid 1001 node

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build
RUN npm install --production
RUN npm cache clean --force

USER node

# ------------------------------PRODUCTION STAGE------------------------------
FROM node:22-alpine AS production
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

ENV APP_ENVIRONMENT production

# RUN addgroup --system --gid 1001 node
# RUN adduser --system --uid 1001 node

RUN mkdir -p disk/medical-pdf \
    disk/signatures \
    disk/zip \
    disk/old-eeq \
    disk/old-ipeges

COPY --chown=node:node --from=build /usr/src/app/dist dist
COPY --chown=node:node --from=build /usr/src/app/node_modules node_modules
COPY --chown=node:node --from=build /usr/src/app/static static
COPY --chown=node:node --from=build /usr/src/app/templates templates

USER node

# CMD ["node", "dist/src/main.js"]
CMD ["sh", "-c", "npx typeorm migration:run -d dist/typeorm.config.js && node dist/src/main.js"]