# Use official Node.js image as the base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./ 

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your app runs on
EXPOSE 3001

# Command to run your application
CMD ["npm", "run", "dev"]
