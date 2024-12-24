FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:80/api/
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
