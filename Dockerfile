FROM node:20-alpine

WORKDIR /app

# Build frontend
COPY client/package*.json ./client/
RUN cd client && npm install

COPY client/ ./client/
RUN cd client && npm run build

# Setup backend
COPY server/package*.json ./server/
RUN cd server && npm install

COPY server/ ./server/

EXPOSE 5000

CMD ["node", "server/index.js"]
