# ------------------------------DEVELOPMENT STAGE------------------------------
FROM node:22-alpine AS development
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app

ENV app.enviroment development

# RUN addgroup --system --gid 1001 node
# RUN adduser --system --uid 1001 node

COPY --chown=node:node . .

RUN npm install

USER node

# ------------------------------BUILD STAGE-----------------------------------
FROM node:22-alpine AS build
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app

ENV app.enviroment production

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

ENV app.enviroment production

# RUN addgroup --system --gid 1001 node
# RUN adduser --system --uid 1001 node

RUN mkdir medical-report-pdf
RUN mkdir signatures
RUN mkdir old-eeq
RUN mkdir old-ipeges

COPY --chown=node:node --from=build /usr/src/app/dist dist
COPY --chown=node:node --from=build /usr/src/app/node_modules node_modules
COPY --chown=node:node --from=build /usr/src/app/templates templates

USER node

CMD ["node", "dist/main.js"]