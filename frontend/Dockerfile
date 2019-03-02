FROM node:slim

WORKDIR /app
COPY package.json typings.json /app/

RUN npm install --unsafe-perm

COPY tsconfig.json gulpfile.ts /app/

COPY src /app/src
VOLUME /app/dist
CMD npm run build
