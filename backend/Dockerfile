FROM node:16

# Create app directory
WORKDIR /src

# Install app dependencies
COPY package.json /tmp/package.json
RUN cd /tmp && npm install --quiet

# Copy app source code
COPY . /src

# Move node_modules to working directory
RUN rm -rf /src/node_modules && cp -a /tmp/node_modules /src/

# Build the application
RUN npm run build

# Expose port
EXPOSE 4003

# Start the application
CMD [ "npm", "run", "dev" ]
