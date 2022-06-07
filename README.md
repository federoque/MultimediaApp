#MultimediaAPP-(Basado en Netflix)

Clonar el Repositorio en un directorio local.

##BackEnd

*Crear archivo .env en la raiz de la carpeta /api
*Crear base datos en la consola de PostgreSQL mediante el comando:
   create database "NOMBRE_DE_TU_DB"
*En este colocar nuestras variables de entorno (tanto para la creación de la base de datos en Post)

  DB_USER="TU_USUARIO_POSTGRESQL"
  DB_PASSWORD="TU_PASSWORD_POSTGRESQL"
  DB_HOST="localhost"
  DB_NAME="NOMBRE_DE_TU_DB"
  SECRET = "TU_SECRETO_JWT"
  
En la consola (gitbash, powershell, etc) escribir los comandos: 
  npm install
  npm start

npm install --force en caso de que ocurra algun error a la hora de la instalación

##FrontEnd

*Parado en la raiz de la carpeta /client ejecutar:
  npm install
  npm start
  
Se abrirá la pestaña del navegador en http://localhost:3001

La base de datos ya está precargada con algunos contenidos.

Para ingresar con perfil de administrador:

  Usuario: admin
  Password: admin
