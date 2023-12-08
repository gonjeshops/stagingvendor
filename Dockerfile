FROM node:20-alpine

WORKDIR /app

COPY package.json .
COPY . .

# Install dependencies
RUN yarn 

# Build the Next.js application
RUN yarn build

EXPOSE 3004

CMD ["yarn", "start"]
