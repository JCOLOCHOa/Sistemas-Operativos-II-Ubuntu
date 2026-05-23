# Usa una imagen oficial de Node.js basada en Alpine Linux (versión 20) como imagen base
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor en /app
WORKDIR /app

# Copia los archivos package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala únicamente las dependencias de producción para reducir el tamaño de la imagen
RUN npm install --production

# Copia todo el contenido del código fuente del backend al directorio de trabajo del contenedor
COPY . .

# Expone el puerto 3000 para que sea accesible desde fuera del contenedor
EXPOSE 3000

# Define el comando predeterminado para iniciar la aplicación
CMD ["npm", "start"]