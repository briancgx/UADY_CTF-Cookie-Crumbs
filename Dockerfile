# Usar la imagen oficial de Node.js
FROM node:14-alpine

# Establecer el directorio de trabajo en /var/app
WORKDIR /var/app

# Copiar los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Exponer el puerto en el que la aplicación correrá
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "app.js"]
