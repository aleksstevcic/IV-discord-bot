#https://nodejs.org/en/docs/guides/nodejs-docker-webapp

FROM oven/bun:distroless

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN bun init
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

CMD [ "node", "." ]