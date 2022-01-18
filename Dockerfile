#Use and existing docker image as a base
#FROM node:12-alpine
#RUN apk add --no-cache font-noto-thai && apk add --no-cache chromium --repository=http://dl-cdn.alpinelinux.org/alpine/v3.10/main
FROM node:alpine

RUN apk add --no-cache \
    udev \
    ttf-freefont \
    font-noto-thai && \
    apk add chromium --update-cache --repository http://nl.alpinelinux.org/alpine/edge/community
    
WORKDIR '/app'
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
COPY . .
CMD ["npm","run","dev"]
