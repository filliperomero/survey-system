# Version of Node you want (https://hub.docker.com/_/node)
FROM node:14

# Where you want your docker to put the files (Root folder)
WORKDIR /usr/src/survey-system

# Copy package.json from machine to docker root
COPY ./package.json .

# Run npm (Only the production dependencies)
RUN npm install --only=prod

# Copy dist folder to dist folder in docker
COPY ./dist ./dist

ENV PORT=8080

# Open a port in the container
EXPOSE 8080

# Start the application
CMD npm start
