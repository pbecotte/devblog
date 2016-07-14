FROM ubuntu:14.04

RUN apt-get update \
	&& apt-get install -y curl \
	&& curl -sL https://deb.nodesource.com/setup_6.x | bash - \
	&& apt-get install -y nodejs \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json typings.json /app/

RUN npm install --unsafe-perm

COPY tsconfig.json gulpfile.ts /app/

COPY src /app/src
VOLUME /app/dist
CMD npm run build
