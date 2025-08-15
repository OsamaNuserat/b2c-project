FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm ci || npm install
COPY tsconfig*.json ./
COPY src ./src
EXPOSE 3002
RUN npm run build
CMD ["npm", "run", "start"]
