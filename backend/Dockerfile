FROM node:20-alpine

WORKDIR /app

# Инсталиране на зависимости
COPY package*.json ./
RUN npm install

# Копиране на останалия код
COPY . .

# Отваряне на порт 3000 (според Nginx конфигурацията ти)
EXPOSE 3000

# Стартиране на приложението
CMD ["npm", "start"]