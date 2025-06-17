
# Sistema Hospitalario De Internaciones Proyecto De Web II



## Descripción general 

Este proyecto lo desarrollade durante la cursada de la materia **Programación Web 2** a lo largo del cuatrimestre, con el objetivo de construir una aplicación web orientada a la gestión de **Admisiones e Internaciones hospitalarias**.

## Estado del proyecto 

![Badge en Desarrollo](https://img.shields.io/badge/🚧%20ESTADO-EN%20DESARROLLO-yellow)


### Cómo ejecutar el proyecto 

Paso 1. Clona el repositorio
```
git clone https://github.com/Agustin-Benenatti/ProyectoWeb2.git
```
Paso 2. Ingresa al directorio del proyecto: 
```
cd ProyectoWeb2
```
Paso 3. Instala las dependencias con el siguiente comando en la consola:
```
npm install
```
Paso 4. Creá un archivo .env en la raíz del proyecto para configurar las variables de entorno de la base de datos. Te dejo un ejemplo abajo 👇
```
DB_NAME=hospital
DB_USER=root
DB_PASS=1234
DB_HOST=123.45.6
DB_PORT=3306
DB_DIALECT=mysql
```

Paso 5. Sincroniza la base de datos y carga datos de ejemplo para que puedas probar el funcionamiento de la app (paso opcional):
```
node config/dbSync.js
node seeders/seed.js
```
Paso 6. Inicia la aplicación ejecutando el siguente comando en la consola:
```
npm start
```

Paso 7. Accedé a la app de forma local en tu navegador en http://localhost:3000


## Funcionalidades requeridas 

- Creación, edición y borrado(logico) de pacientes.
- Lista de pacientes.
- Registro de admisiones, eliminación de admisiones(borrado logico) y registro de internaciones respetando el género del paciente a la hora de asignar una habitación y respetando el estado de higiene de la cama, asi tambien si el paciente registra una internacion activa no dejara internalo a menos que se registre su alta.
- Listado de internaciones.
- Listado de habitaciones con sus camas ocupadas y libres.
- Admision e Internacion para un paciente NN.

### Tecnologías utilizadas

Este proyecto fue desarrollado utilizando las siguientes tecnologías y herramientas:

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
**Node.js + Express**: Para el desarrollo del backend y la gestión de rutas.

![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)  
**Sequelize**: ORM para definir modelos, relaciones y ejecutar consultas SQL (MySQL).

![MySQL](https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white)  
**MySQL**: Sistema de gestión de bases de datos relacional.

![Pug](https://img.shields.io/badge/Pug-FFF?style=for-the-badge&logo=pug&logoColor=A86454)  
**PUG**: Motor de plantillas para renderizar vistas como formularios y listados dinámicos.

![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)  
**CSS**: Utilizado para estilizar las vistas renderizadas.

![Dotenv](https://img.shields.io/badge/Dotenv-8DD6F9?style=for-the-badge&logo=dotenv&logoColor=black)  
**Dotenv**: Permite cargar variables de entorno desde un archivo `.env`.

![Method-Override](https://img.shields.io/badge/Method--Override-gray?style=for-the-badge)  
**Method-Override**: Permite el uso de métodos PUT y PATCH desde formularios HTML.

![Express-Validator](https://img.shields.io/badge/Express--Validator-6C3483?style=for-the-badge)  
**Express-Validator**: Middleware para validaciones desde el backend.

![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)  
**Nodemon**: Reinicia el servidor automáticamente durante el desarrollo ante cambios en el código.

![DataTables](https://img.shields.io/badge/DataTable-1E90FF?style=for-the-badge)  
**DataTables**: Librería para mostrar tablas interactivas (como pacientes, internaciones, habitaciones, etc.).

![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)  
**Bootstrap**: Framework CSS para diseño responsivo y componentes estilizados.


###  -Estructura del proyecto


```
PROYECTOWEB2/
├── config/              # Configuración de base de datos y otros parámetros
├── controllers/         # Controladores con la lógica de las rutas
├── middlewares/         # Middlewares personalizados (validaciones)
├── models/              # Modelos Sequelize de la base de datos
├── node_modules/        # Dependencias instaladas con npm
├── public/              # Archivos estáticos (CSS, JS, imágenes)
├── route/               # Definición de rutas de la aplicación
├── seeders/             # Datos iniciales para la base de datos
├── validators/          # Validaciones para formularios o inputs
├── views/               # Vistas con motor de plantillas Pug
├── .env                 # Variables de entorno
├── .gitattributes       # Configuración de Git (atributos)
├── .gitignore           # Archivos/Carpetas ignorados por Git
├── app.js               # Archivo principal de arranque del servidor
├── package-lock.json    # Versiones exactas de dependencias
├── package.json         # Dependencias y scripts del proyecto
└── README.md            # Documentación del proyecto

```

## EndPoints 

### 🧍‍♂️🧍‍♀️ Pacientes

- **GET** `/`  
  Muestra todos los pacientes registrados en el hospital  
   Renderiza: `Paciente.pug`


- **GET** `/crear`  
  Muestra el formulario para la creación de un paciente  
   Renderiza: `CrearPaciente.pug`

- **POST** `/cargar`  
  Registra un nuevo paciente desde un formulario

- **GET** `/editar/:id`  
  Muestra el formulario para editar un paciente  
   Renderiza: `modificarPaciente.pug`

- **PUT** `/editar/:id`  
  Actualiza la información de un paciente especificado  
   Parámetros: ID del paciente

- **PATCH** `/baja/:id`  
  Actualiza el estado de un paciente especificado  
   Parámetros: ID del paciente

---

### 📖 Admisión

- **GET** `/`  
  Muestra el panel de admisión  
  Renderiza: `Admision.pug`

- **GET** `/nueva`  
  Muestra el formulario para registrar una nueva admisión  
   Renderiza: `/generarAdmision.pug`

- **POST** `/buscar-paciente`  
  Busca un paciente por el Dni  
  
- **POST** `/Crear`  
  Registra una nueva admisión desde el formulario  
  
- **GET** `/listaAdmisiones`  
  Muestra el formulario para registrar una nueva admisión  
   Renderiza: `/listaAdmisiones.pug`

- **GET** `/nn`  
  Muestra el formulario para registrar una admisión de un paciente NN  
   Renderiza: `/generarAdmisionNN.pug`

- **POST** `/nn`  
  Registra una nueva admisión desde el formulario para registrar una persona NN  
  

- **GET** `/baja/:id`  
  Muestra el borrado logico de la admisión  
  ↪ Redirecciona: `/listaAdmisiones.pug`

---

### 🩺 Internacion

- **GET** `/`  
  Muestra el panel principal  
   Renderiza: `/internacion.pug`

- **GET** `/lista`  
  Muestra la lista de pacientes internados  
   Renderiza: `/internacion.pug`

- **GET** `/generar-internacion/:id_admision`  
  Muestra el formulario para internar un paciente  
   Renderiza: `/GenerarInternacion.pug`

- **POST** `/crear`  
  Registra una nueva internacion desde el formulario 
  
- **PATCH** `/baja/:id`  
  Actualiza el estado de internacion del paciente para darle una alta  
   Parámetros: ID de internacion

---

### 🛏️ Habitaciones

- **GET** `/`  
  Muestra las habitaciones, el ala y las camas (se pueden ver que cama esta libre o ocupada)   
   Renderiza: `Habitacion.pug`


---


