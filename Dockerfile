FROM node:20-alpine

WORKDIR /app

COPY package.json .
COPY . .

# Install dependencies
RUN npm install

# Build the Next.js application
RUN npm run build

EXPOSE 3004

CMD ["npm", "start"]
