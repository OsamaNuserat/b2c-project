FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm ci || npm install
COPY tsconfig*.json ./
COPY src ./src
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start"]
