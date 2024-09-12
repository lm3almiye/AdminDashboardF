# Step 1: Build the Angular application
FROM node:20.14.0-alpine as build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular app in production mode
RUN npm run build 
# Step 2: Serve the Angular app using Nginx
FROM nginx:1.27.1-alpine

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular app from the previous stage to the Nginx HTML directory
COPY --from=build /app/dist/kanban-proj /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
