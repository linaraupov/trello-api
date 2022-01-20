FROM node:14.17-alpine

WORKDIR /app

RUN apk add bash
RUN apk add fontconfig ttf-dejavu
RUN apk add --no-cache curl && cd /tmp && curl -Ls https://github.com/dustinblackman/phantomized/releases/download/2.1.1/dockerized-phantomjs.tar.gz | tar xz && cp -R lib lib64 / && cp -R usr/lib/x86_64-linux-gnu /usr/lib && cp -R usr/share /usr/share && cp -R etc/fonts /etc && curl -k -Ls https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 | tar -jxf - && cp phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin/phantomjs && rm -fR phantomjs-2.1.1-linux-x86_64 && apk del curl

COPY package.json /app
COPY yarn.lock /app

RUN yarn install

COPY . /app/

RUN yarn run build

COPY ./tsconfig.json /app
COPY ./tsconfig-paths-bootstrap.js /app

ENTRYPOINT ["sh", "-c"]

CMD ["node -r ./tsconfig-paths-bootstrap.js dist/src/main.js"]