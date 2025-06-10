
# Sistema Hospitalario De Internaciones Proyecto De Web II



## Descripción general 

Este proyecto lo desarrollade durante la cursada de la materia **Programación Web 2**, con el objetivo de construir una aplicación web orientada a la gestión de **Admisiones e Internaciones hospitalarias**.

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
DB_HOST=111.11.1
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
- **Node.js + Express:** para el desarrollo del backend y gestión de rutas.
- **Sequelize:** ORM para definir los modelos, relaciones y ejecutar consultas a la base de datos.
- **SQL:** comprensión del modelo relacional. Mediante **MySQL**
- **PUG:** motor de plantillas para renderizar vistas (formularios y listados).
- **CSS:** estilización de vistas.
- **Dotenv:** carga de variables de entorno desde archivos `.env`
- **Method-Override:** permite el uso de métodos HTTP como PUT y PATCH desde los formularios.
- **Express-Validator:** permite la validación desde el lado del backend.
- **Nodemon:** herramienta para reiniciar el servidor durante el desarrollo.
- **DataTable:** Para mostrar informacion del paciente, admisiones, Internaciones,habitaciones, etc

## EndPoints 

### 🧍‍♂️🧍‍♀️ Pacientes

- **GET** `/`  
  Muestra todos los pacientes registrados en el hospital  
  🖼️ Renderiza: `Paciente.pug`


- **GET** `/crear`  
  Muestra el formulario para la creación de un paciente  
  🖼️ Renderiza: `CrearPaciente.pug`

- **POST** `/cargar`  
  Registra un nuevo paciente desde un formulario

- **GET** `/editar/:id`  
  Muestra el formulario para editar un paciente  
  🖼️ Renderiza: `modificarPaciente.pug`

- **PUT** `/editar/:id`  
  Actualiza la información de un paciente especificado  
  🧾 Parámetros: ID del paciente

- **PATCH** `/baja/:id`  
  Actualiza el estado de un paciente especificado  
  🧾 Parámetros: ID del paciente

---

### 📖 Admisión

- **GET** `/`  
  Muestra el panel de admisión  
  🖼️ Renderiza: `Admision.pug`

- **GET** `/nueva`  
  Muestra el formulario para registrar una nueva admisión  
  🖼️ Renderiza: `/generarAdmision.pug`

- **POST** `/buscar-paciente`  
  Busca un paciente por el Dni  
  
- **POST** `/Crear`  
  Registra una nueva admisión desde el formulario  
  
- **GET** `/listaAdmisiones`  
  Muestra el formulario para registrar una nueva admisión  
  🖼️ Renderiza: `/listaAdmisiones.pug`

- **GET** `/nn`  
  Muestra el formulario para registrar una admisión de un paciente NN  
  🖼️ Renderiza: `/generarAdmisionNN.pug`

- **POST** `/nn`  
  Registra una nueva admisión desde el formulario para registrar una persona NN  
  

- **GET** `/baja/:id`  
  Muestra el borrado logico de la admisión  
  ↪ Redirecciona: `/listaAdmisiones.pug`

---

### 🩺 Internacion

- **GET** `/`  
  Muestra el panel principal  
  🖼️ Renderiza: `/internacion.pug`

- **GET** `/lista`  
  Muestra la lista de pacientes internados  
  🖼️ Renderiza: `/internacion.pug`

- **GET** `/generar-internacion/:id_admision`  
  Muestra el formulario para internar un paciente  
  🖼️ Renderiza: `/GenerarInternacion.pug`

- **POST** `/crear`  
  Registra una nueva internacion desde el formulario 
  
- **PATCH** `/baja/:id`  
  Actualiza el estado de internacion del paciente para darle una alta  
  🧾 Parámetros: ID de internacion

---

### 🛏️ Habitaciones

- **GET** `/`  
  Muestra las habitaciones, el ala y las camas (se pueden ver que cama esta libre o ocupada)   
  🖼️ Renderiza: `Habitacion.pug`


---


