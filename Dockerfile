# Use the official Node.js 20 Alpine image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists) to the working directory
COPY package.json .
COPY package-lock.json* .

# Install application dependencies
RUN npm install

# Copy all files from the current directory to the working directory in the container
COPY . .

# Expose port 3004 (the port your application will run on)
EXPOSE 3004

# Command to run your application when the container starts
CMD ["npm", "start"]

