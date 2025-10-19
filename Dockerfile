FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm i -g pnpm
RUN pnpm install
COPY . .
RUN ls -R src
RUN pnpm build
EXPOSE 8080
CMD ["npm", "start"]