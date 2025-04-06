# Use Node.js image as base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app  

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 8000 to the outside world
EXPOSE 8800

# Command to run the gateway service
CMD ["npm", "run", "dev"]
