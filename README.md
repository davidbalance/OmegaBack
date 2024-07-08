# Omega Backend

## Tabla de Contenidos

1. [Introducción](#introduction)
1. [Tecnologias usadas](#used-technologies)
1. [Guia de instalacion](#installation-guide)
   1. [Desarrollo](#installation-guide-dev)
   1. [Produccion](#installation-guide-prod)
1. [Estructura de directorios](#directory-structure)
1. [Variables de Entorno](#environment-variables)
1. [Documentacion de Modulos](#module-documentation)
1. [Patrones y Practicas](#patterns-and-practices)
   1. [Nomenclatura](#patterns-and-practices-naming)
   1. [Manejo de errores](#patterns-and-practices-error-handling)
   1. [Logging](#patterns-and-practices-logging)
1. [Pruebas de Software](#testing)
   1. [Ejecucion de pruebas](#run-tests)
   1. [Ejecucion de pruebas end-to-end](#run-tests-e2e)
   1. [Estrategia de pruebas](#run-tests-strategy)
1. [Recursos adicionales](#additional-resources)

<div id='introduction'/>

## Introduccion

Aplicacion enfocada en la administracion de reportes y resultados medicos. Asi mismo, provee una interface que permite la conexion con aplicaciones externas de modo que pueda compatir y recibir informacion con otras aplicaciones.

La aplicacion hace uso de la naturaleza modular de NestJS para su construccion de modo que cada modulo actue de forma independiente del resto del aplicativo.

<div id='used-technologies'/>

## Tecnologias usadas

- NestJs
- Archiver
- Bcrypt
- class-transformer
- class-validator
- Dayjs
- Handlebars
- Joi
- MySql
- Nodemailer
- Passport
- Pupeteer
- Typeorm
- Uuid
- Winston
- Swagger
- Docker

<div id='installation-guide'/>

## Guia de instalacion

<div id='installation-guide-dev'/>

### Desarrollo

1. Clona el repositorio:

```bash
git clone https://github.com/davidbalance/OmegaFront.git
```

2. Ingresa al directorio del proyecto:

```bash
cd OmegaBack
```

3. Instala las dependencias:

```bash
npm install
```

4. Inicia el servidor de desarrollo:

```bash
npm run start:dev
```

<div id='installation-guide-prod'/>

### Produccion

Para el despliegue en produccion existen dos alternativas, ambas con docker. La primera es generar la imagen de forma manual haciendo uso del `Dockerfile` presente en el repositorio

#### Metodo 1

Despliegue en produccion mediante la creacion manual de la imagen e inicializacion de la misma

1. Clona el repositorio:

```bash
git clone https://github.com/davidbalance/OmegaBack.git
```

2. Ingresa al directorio del proyecto:

```bash
cd OmegaBack
```

3. Crea una imagen de docker usando `Dockerfile`

```bash
docker build -t OmegaBack:latest .
```

4. Ejecuta la imagen creada

```bash
docker run OmegaBack:latest -e <variables de entorno>
```

#### Metodo 2

Despliegue en produccion usando github workflow.

Se requiere de un archivo llamado `node.yml`, este archivo posee todo los pasos y conexiones de entre github y el servidor. El archivo puede ser encontrado en la siguiente ubicacion

```bash
/.github/workflows
```

El workflow se encarga de crear una imagen de docker publicarla, entrar al servidor, y actualizar la imagen de la aplicacion con la nueva creada haciendo uso de un `docker-compose.yml`

Para ejecutar el yml requiere de los siguientes secretos, estos pueden ser colocados/modificados/eliminados dentro de github en

```bash
settings > Security > Secrets and variables > Actions
```

##### Secretos de Github

- `SERVER_HOST`: Servidor donde se aloja la aplicacion
- `SERVER_USERNAME`: Usuario del servidor
- `SERVER_PASSWORD`: Contraseña del servidor
- `DOCKER_IMAGE`: Nombre de la imagen
- `DOCKERHUB_USERNAME`: Usuario de dockerhub
- `DOCKERHUB_TOKEN`: Token que provee docker hub
- `DOCKER_COMPOSE_DIRECTORY`: Directorio donde se aloja el archivo docker-compose.yml detro del servidor

##### Trabajos del workflow

- `build_and_push_docker_image`: Crea la imagen de docker de la aplicacion y la publica en dockerhub
- `deploy`: Se conecta al servidor, ingresa a la direccion donde se encuentra alojado el archivo `docker-compose.yml`, baja los contendores, descarga una nueva version de las imagenes indicadas por docker-compose y vuelve a construir la aplicacion

##### Ejecucion del workflow

1. Crear una nueva rama:

```bash
git checkout -b new-branch
```

2. Realizar cambios y modificaciones al codigo

3. Subir cambios al repositorio:

```bash
git add .
git commit -am "Your commit ..."
git push
```

4. Realizar un pull request y aceptar todos los cambios

5. Realizar un merge con la rama `main`

Cuando se sube un cambio a la rama `main` se ejecuta el workflow, creando una nueva imagen de la aplicacion.

Si gusta ver si se ha desplegado de forma correcta la aplicacion en el servidor entré al apartado de `Actions` de github ahi vera una lista de todos los workflows que se han ejecutado, si algo ha salido mal puede abrir el workflow, ahi encontrara los logs de la aplicacion donde podremos observar cual ha sido el error.

<div id='directory-structure'/>

## Estructura de directorios

```bash
├───authentication
│   ├───api-key
│   │   ├───dto
│   │   ├───entities
│   │   └───test
│   ├───dtos
│   ├───guards
│   ├───strategies
│   ├───token
│   │   ├───dto
│   │   ├───entities
│   │   ├───tests
│   │   │   └───stub
│   │   └───types
│   └───user-credential
│       ├───dtos
│       ├───entities
│       ├───listeners
│       └───tests
│           └───stub
├───disease
│   ├───disease
│   │   ├───controllers
│   │   ├───dtos
│   │   ├───entities
│   │   ├───services
│   │   └───tests
│   │       └───stub
│   └───disease-group
│       ├───controllers
│       ├───dtos
│       ├───entities
│       ├───services
│       └───tests
│           └───stub
├───laboratory
│   └───exam
│       ├───controllers
│       ├───dtos
│       ├───entities
│       ├───external-key
│       │   ├───entities
│       │   └───test
│       ├───listeners
│       ├───services
│       └───tests
│           └───stub
├───location
│   ├───branch
│   │   ├───controllers
│   │   ├───dtos
│   │   ├───entities
│   │   ├───external-key
│   │   │   ├───entities
│   │   │   └───test
│   │   ├───services
│   │   └───tests
│   │       └───stub
│   ├───city
│   │   ├───controllers
│   │   ├───dto
│   │   ├───entities
│   │   ├───services
│   │   └───tests
│   │       └───stub
│   ├───company
│   │   ├───controllers
│   │   ├───dtos
│   │   ├───entities
│   │   ├───external-key
│   │   │   ├───entities
│   │   │   └───test
│   │   ├───services
│   │   └───tests
│   │       └───stub
│   └───corporative-group
│       ├───controllers
│       ├───dtos
│       ├───entities
│       ├───external-key
│       │   ├───dto
│       │   ├───entities
│       │   └───test
│       └───services
├───medical
│   ├───file-downloader
│   │   └───dto
│   ├───medical-client
│   │   ├───dtos
│   │   ├───entities
│   │   └───repositories
│   ├───medical-order
│   │   ├───controllers
│   │   ├───dtos
│   │   ├───entities
│   │   ├───external-key
│   │   │   ├───entities
│   │   │   └───test
│   │   ├───services
│   │   └───test
│   ├───medical-report
│   │   ├───dtos
│   │   ├───entities
│   │   ├───send-attribute
│   │   │   ├───entities
│   │   │   └───test
│   │   └───test
│   │       └───stub
│   └───medical-result
│       ├───controllers
│       ├───dtos
│       ├───entities
│       ├───external-key
│       │   ├───entities
│       │   └───test
│       ├───send-attribute
│       │   ├───entities
│       │   └───test
│       └───services
├───omega-web
│   ├───web-client
│   │   ├───dto
│   │   ├───entities
│   │   ├───listeners
│   │   └───test
│   │       └───stub
│   ├───web-logo
│   │   ├───dto
│   │   ├───entities
│   │   └───test
│   │       └───stub
│   └───web-resource
│       ├───dto
│       ├───entities
│       └───test
│           └───stub
├───shared
│   ├───decorator
│   ├───enums
│   ├───events
│   ├───external-key
│   ├───extra-attribute
│   ├───guards
│   │   ├───api-key-guard
│   │   │   ├───guards
│   │   │   │   └───test
│   │   │   └───strategies
│   │   └───authentication-guard
│   │       ├───guards
│   │       │   └───test
│   │       └───strategies
│   ├───health-status
│   ├───interceptors
│   │   ├───dni
│   │   └───extra-attribute
│   ├───logger
│   │   ├───config
│   │   ├───interfaces
│   │   ├───log
│   │   │   ├───dtos
│   │   │   └───entities
│   │   └───transport
│   ├───mailer
│   ├───middleware
│   ├───pdf-manager
│   │   └───test
│   ├───pipes
│   │   └───file-type
│   ├───send-attribute
│   ├───shared-authentication
│   │   ├───local-jwt-authentication
│   │   └───types
│   ├───sql-database
│   ├───storage-manager
│   │   └───local-storage
│   ├───types
│   ├───utils
│   └───zipper
└───user
    ├───doctor
    │   ├───controllers
    │   ├───dtos
    │   ├───entities
    │   ├───listener
    │   └───services
    ├───patient
    │   ├───common
    │   │   └───enums
    │   ├───controller
    │   ├───dtos
    │   ├───entities
    │   ├───listeners
    │   └───service
    └───user
        ├───dtos
        ├───entities
        ├───listeners
        ├───repositories
        ├───services
        └───tests
            └───stub
```

<div id='environment-variables'/>

## Variables de Entorno

Crea un archivo `.env` en la raiz del proyecto y añade las variables de entorno necesarios

```bash
APP_PORT = 3001
APP_ENVIRONMENT = development
APP_TARGET_HOST = http://localhost:3000

DATABASE_SQL_TYPE = your_db_type
DATABASE_SQL_HOST = your_db_host
DATABASE_SQL_PORT = your_db_port
DATABASE_SQL_USERNAME = your_db_username
DATABASE_SQL_PASSWORD = your_db_password
DATABASE_SQL_DATABASE = your_db_database

JWT_DEFAULT_SECRET = your_authentication_secret
JWT_DEFAULT_EXPIRES_IN = your_authentication_expires_in_time
JWT_REFRESH_SECRET = your_refresh_secret
JWT_REFRESH_EXPIRES_IN = your_refresh_expires_in_time

APIKEY_EXPIRES_IN = your_apikey_expires_time

SMTP_MAIL_HOST=your_smtp_host
SMTP_MAIL_PORT=your_smtp_port
SMTP_MAIL_SECURE=false
SMTP_MAIL_AUTH_USER=your_smtp_user
SMTP_MAIL_AUTH_PASSWORD=your_smtp_password
SMTP_DEFAULT_APP_NAME=your_smtp_appname
SMTP_DEFAULT_MAIL_FROM=your_smtp_mail_from
```

<div id='module-documentation'/>

## Documentacion de Modulos

La documentacion de las APIs pueden ser consultada en `/docs` siempre y cuando el sistema se encuentre en desarrollo, en produccion esta opcion no se encuentra disponible.

### 1. Authentication Module

El modulo de autenticacion se encarga de gestionar las credenciales de los usuarios, validarlas y retornar tokens que autorizan el acceso de los usuarios. Asi mismo gestiona el acceso, creacion y validacion de API-KEYS.

#### Submodulos

- ApiKey
- Token
- UserCredential

#### Files

- `authentication.module.ts`: Definicion del modulo.
- `authentication.controller.ts`: Maneja peticiones HTTP relacionadas a la autenticacion.
- `api-key/`: Modulo de gestion de apikey.
- `token/`: Modulo de token.
- `user-credential/`: Modulo de credenciales.
- `guards/`: Contiene los guards relacionadas a la autenticacion.
- `strategies/`: Contiene las estretegias relacionadas a la autenticacion.

#### Controller

- `POST /auth/login`: Valida las credenciales de un usuario y retorna tokens de acceso.
- `POST /auth/refresh`: Refresca el token de acceso.
- `POST /auth/logout`: Elimina los valores de inicio de sesion del usuario.

#### 1.1. ApiKey Module

El modulo de apikey se encarga de la gestion de apikeys, ademas de ser el responsable de la validacion de las mismas

##### Files

- `api-key.module.ts`: Definicion del modulo.
- `api-key.controller.ts`: Maneja peticiones HTTP relacionadas al apikey.
- `api-key.repository.ts`: Gestiona el acceso a la entidad apikey en la base de datos.
- `api-key.service.ts`: Contiene la logica de negocio para la gestion de apikeys.
- `dtos/`: Objetos de transferencia de datos para apikeys.
- `entities/`: Entidades de la base de datos para apikeys.

##### Services

- `find`: Retorna todas las apikey asociadas a un usuario.
- `create`: Crea una nueva apikey.
- `findOneAndUpdate`: Encuentra un apikey dado su identificador unico y lo actualiza.
- `findOneAndDelete`: Encuentra un apikey dado su identificador unico y lo desactiva.
- `validate`: Verifica que el apikey exista y sea valido.
- `removeExpireKeys`: Remueve todos los apikey que se encuentren expirados.

##### Controller

- `GET /api/key`: Obtiene todas las apikeys de un usuario.
- `POST /api/key`: Crea una nueva apikey.
- `PATCH /api/key/:id`: Actualiza una apikey dado su identificador unico.

#### 1.2. Token Module

El modulo de token se encarga de la gestion de tokens, ademas de ser el responsable de la validacion de las mismas

##### Files

- `token.module.ts`: Definicion del modulo.
- `token.controller.ts`: Maneja peticiones HTTP relacionadas al token.
- `token.repository.ts`: Gestiona el acceso a la entidad token en la base de datos.
- `token.service.ts`: Contiene la logica de negocio para la gestion de tokens.
- `dtos/`: Objetos de transferencia de datos para tokens.
- `entities/`: Entidades de la base de datos para tokens.
- `test/`: Pruebas de codigo.
- `types/`: Tipos de datos.

##### Services

- `initToken`: Instancia un nuevo token de acceso y refrescamiento.
- `refreshToken`: Verifica la validez del token y lo refresca.
- `getExpiresTime`: Obtiene el tiempo de expiracion de los tokens.
- `generateToken`: Genera el token.
- `storeToken`: Almacena el token en la base de datos.
- `removeToken`: Elimina un token usando el sub.
- `removeExpireToken`: Elimina todos los token que han expirado.
- `canRefresh`: Verifica la validez del token de refrescamiento.

#### 1.3. UserCredential Module

El modulo de credenciales de usuario se encarga de la gestion y validacion de las credenciales.

##### Files

- `user-credential.module.ts`: Definicion del modulo.
- `user-credential.controller.ts`: Maneja peticiones HTTP relacionadas a las credenciales.
- `user-credential.repository.ts`: Gestiona el acceso a la entidad credenciales en la base de datos.
- `user-credential.service.ts`: Contiene la logica de negocio para la gestion de credenciales.
- `dtos/`: Objetos de transferencia de datos para credenciales.
- `entities/`: Entidades de la base de datos para credenciales.
- `listeners/`: Contiene la logica de ejecucion cuando es disparado un evento especifico.
- `test/`: Pruebas de codigo.

##### Services

- `create`: Crea credenciales para un usuario.
- `findOneCredentialAndUpdatePassword`: Busca una credencial y actualiza la contraseña.
- `validateCredentials`: Valida el usuario y contraseña.
- `findOneByUser`: Encuentra credenciales usando al usuario.
- `validatePassword`: Valida la contraseña.
- `hashPassword`: Encripta la contraseña antes de guardar o actualizarla.

##### Controller

- `POST /credentials`: Crea las credenciales de un usuario.
- `PATCH /credentials`: Actualiza la contraseña de un usuario.

### 2. Disease Module

El modulo de morbilidades se encarga de gestionar las morbilidades y grupos de morbilidades.

#### Submodulos

- Disease
- DiseaseGroup

#### Files

- `disease-group/`: Modulo de grupo de morbilidades.
- `disease/`: Modulo de morbilidades.

#### 2.1. DiseaseGroup Module

El modulo de grupos de morbilidaes encarga de la gestion de los mismos.

##### Files

- `disease-group.module.ts`: Definicion del modulo.
- `disease-group.repository.ts`: Gestiona el acceso a la entidad credenciales en la base de datos.
- `controllers/`: Contiene los controladores para manejar peticiones HTTP.
- `dtos/`: Objetos de transferencia de datos para grupos de morbilidades.
- `entities/`: Entidades de la base de datos para grupos de morbilidades.
- `services/`: Contiene la logica de negocio para la gestion de grupos de morbilidades.
- `test/`: Pruebas de codigo.

##### Services

**Disease Group**

- `create`: Crea grupos de morbilidades.
- `find`: Encuentra todos los grupos de morbilidades que se encuentren activos.
- `findOneById`: Encuentra un grupo de mobilidades por identificador unico.
- `findOneAndUpdate`: Encuentra un grupo de morbilidades y lo modifica.
- `findOneAndDelete`: Encuentra un grupo de morbilidades y lo elimina si no tiene morbilidades asociadas.

**Selector**

- `find`: Encuentra todos los grupos de morbilidades activos y solo retorna un key y label.

##### Controller

**Disease Group**

- `GET /diseases/groups`: Obtiene grupos de morbilidades activos.
- `POST /diseases/groups`: Crea grupos de morbilidades.
- `PATCH /diseases/groups/:id`: Modifica grupos de morbilidades.
- `DELETE /diseases/groups/:id`: Elimina grupos de morbilidades siempre y cuando no tenga morbilidades asociadas.

**Selector**

- `GET /selector/diseases/groups`: Retorna grupos de morbilidades para usar en selectores.

#### 2.2. Disease Module

El modulo de morbilidaes encarga de la gestion de las mismas.

##### Files

- `disease.module.ts`: Definicion del modulo.
- `disease.repository.ts`: Gestiona el acceso a la entidad disease en la base de datos.
- `controllers/`: Contiene los controladores para manejar peticiones HTTP.
- `dtos/`: Objetos de transferencia de datos para morbilidades.
- `entities/`: Entidades de la base de datos para morbilidades.
- `services/`: Contiene la logica de negocio para la gestion de morbilidades.
- `test/`: Pruebas de codigo.

##### Services

**Disease**

- `create`: Crea morbilidades.
- `find`: Encuentra todas las morbilidades activas.
- `findOneAndUpdate`: Encuentra una morbilidad y lo modifica.
- `findOneAndDelete`: Encuentra una morbilidad.

**Selector**

- `find`: Encuentra todas las morbilidades activas y solo retorna un key y label.

##### Controller

**Disease Group**

- `GET /diseases`: Obtiene morbilidades activas.
- `POST /diseases`: Crea morbilidades.
- `PATCH /diseases/:id`: Modifica morbilidades.
- `DELETE /diseases/:id`: Elimina morbilidades.

**Selector**

- `GET /selector/diseases`: Retorna grupos de morbilidades para usar en selectores.

### 3. Laboratory Module

El modulo de laboratorio se encarga de gestionar varios items de un laboratorio.

#### Submodulos

- Exam

#### Files

- `exam/`: Modulo de examenes medicos.

#### 3.1. Exam Module

El modulo de examenes medicos se encarga de la gestion de los mismos.

##### Files

- `exam.module.ts`: Definicion del modulo.
- `exam.repository.ts`: Gestiona el acceso a la entidad examenes en la base de datos.
- `controllers/`: Contiene los controladores para manejar peticiones HTTP.
- `dtos/`: Objetos de transferencia de datos para examenes medicos.
- `entities/`: Entidades de la base de datos para examenes medicos.
- `external-key/`: LLaves provenientes de sistemas externos de examenes medicos.
- `listeners/`: Objetos de transferencia de datos para examenes medicos.
- `services/`: Contiene la logica de negocio para la gestion de examenes medicos.
- `test/`: Pruebas de codigo.

##### Services

**External Connection**

- `create`: Crea un examen medico.
- `findOneOrCreate`: Encuentra un examen medico si no existe lo crea.
- `findOneAndUpdate`: Encuentra un examen medico y lo modifica.

**Selector**

- `find`: Encuentra todos los examenes medicos activos y solo retorna un key y label.

##### Controller

**External Connection**

- `POST /external/connection/exams/:source`: Crea un examen medico.
- `PATCH /external/connection/exams/:source/:key`: Encuentra un examen medico y lo modifica.

**Selector**

- `GET /selector/exams`: Retorna examenes medicos para usar en selectores.

### 4. Location Module

El modulo de locaciones se encarga de gestionar ciudades, sucursales, empresas y grupos corporativos.

#### Submodulos

- Corporative Group
- Company
- Branch
- City

#### Files

- `branch/`: Modulo de examenes medicos.
- `city/`: Modulo de examenes medicos.
- `company/`: Modulo de examenes medicos.
- `corporative-group/`: Modulo de examenes medicos.

#### 4.1. Corporative Group Module

El modulo de grupos corporativos se encarga de la gestion de los mismos.

##### Files

- `corporative-group.module.ts`: Definicion del modulo.
- `corporative-group.repository.ts`: Gestiona el acceso a la entidad Grupo Corporativos en la base de datos.
- `controllers/`: Contiene los controladores para manejar peticiones HTTP.
- `dtos/`: Objetos de transferencia de datos para grupos corporativos.
- `entities/`: Entidades de la base de datos para grupos corporativos.
- `external-key/`: LLaves provenientes de sistemas externos de grupos corporativos.
- `services/`: Contiene la logica de negocio para la gestion de grupos corporativos.
- `test/`: Pruebas de codigo.

##### Services

**Grupos Corporativos**

- `find`: Retorna todos los grupos corporativos activos del sistema.

**External Connection**

- `create`: Crea un grupo corporativo.
- `findOneOrCreate`: Encuentra un grupo corporativo si no existe lo crea.
- `findOneAndUpdate`: Encuentra un grupo corporativo y lo modifica.

**Selector**

- `find`: Encuentra todos los grupos corporativos activos y solo retorna un key y label.

##### Controller

**Grupos Corporativos**

- `GET /corporative/groups`: Retorna todos los grupos corporativos activos del sistema.

**External Connection**

- `POST /external/connection/corporative/groups/:source`: Crea un grupo corporativo.
- `PATCH /external/connection/corporative/groups/:source/:key`: Encuentra un grupo corporativo y lo modifica.

**Selector**

- `GET /selector/corporative/groups`: Encuentra todos los grupos corporativos activos y solo retorna un key y label.

#### 4.2. Company Module

El modulo de empresas se encarga de la gestion de los mismos.

##### Files

- `company.module.ts`: Definicion del modulo.
- `company.repository.ts`: Gestiona el acceso a la entidad Empresa en la base de datos.
- `controllers/`: Contiene los controladores para manejar peticiones HTTP.
- `dtos/`: Objetos de transferencia de datos para empresas.
- `entities/`: Entidades de la base de datos para empresas.
- `external-key/`: LLaves provenientes de sistemas externos de empresas.
- `services/`: Contiene la logica de negocio para la gestion de empresas.
- `test/`: Pruebas de codigo.

##### Services

**Company**

- `find`: Retorna todas las empresas activas del sistema.
- `findOne`: Retorna una empresa.

**External Connection**

- `create`: Crea una empresa.
- `findOneOrCreate`: Encuentra una empresa si no existe la crea.
- `findOneAndUpdate`: Encuentra una empresa y la modifica.

**Selector**

- `find`: Encuentra todas las empresas activas y solo retorna un key y label.

##### Controller

**External Connection**

- `POST /external/connection/company/:source`: Crea una empresa.
- `PATCH /external/connection/company/:source/:key`: Encuentra una empresa y la modifica.

**Selector**

- `GET /selector/companies/:group`: Encuentra todas las empresas activas y solo retorna un key y label.

#### 4.3. Branch Module

El modulo de sucursales se encarga de la gestion de las mismas.

##### Files

- `branch.module.ts`: Definicion del modulo.
- `branch.repository.ts`: Gestiona el acceso a la entidad Sucursal en la base de datos.
- `controllers/`: Contiene los controladores para manejar peticiones HTTP.
- `dtos/`: Objetos de transferencia de datos para sucursales.
- `entities/`: Entidades de la base de datos para sucursales.
- `external-key/`: LLaves provenientes de sistemas externos de sucursales.
- `services/`: Contiene la logica de negocio para la gestion de sucursales.
- `test/`: Pruebas de codigo.

##### Services

**Branch**

- `find`: Retorna todas las surcursales activas del sistema.
- `findByCompanyRuc`: Retorna todas las sucursales activas asociadas al ruc de una empresa.

**External Connection**

- `create`: Crea una sucursal.
- `findOneOrCreate`: Encuentra una sucursal si no existe la crea.
- `findOneAndUpdate`: Encuentra una sucursal y la modifica.

**Selector**

- `find`: Encuentra todas las sucursales activas y solo retorna un key y label.

##### Controller

**External Connection**

- `POST /external/connection/branch/:source`: Crea una surcursal.
- `PATCH /external/connection/branch/:source/:key`: Encuentra una sucursal y la modifica.

**Selector**

- `GET /selector/branches/:company`: Encuentra todas las sucursales activas y solo retorna un key y label.

#### 4.3. City Module

El modulo de ciudades se encarga de la gestion de las mismas.

##### Files

- `city.module.ts`: Definicion del modulo.
- `city.repository.ts`: Gestiona el acceso a la entidad Ciudad en la base de datos.
- `controllers/`: Contiene los controladores para manejar peticiones HTTP.
- `dtos/`: Objetos de transferencia de datos para ciudad.
- `entities/`: Entidades de la base de datos para ciudad.
- `services/`: Contiene la logica de negocio para la gestion de ciudad.
- `test/`: Pruebas de codigo.

##### Services

**City**

- `find`: Retorna todas las ciudades del sistema.
- `findOne`: Retorna una ciudad e base a su identificador unico.
- `findOneByName`: Retorna una ciudad en base a su nombre.

**Selector**

- `find`: Encuentra todas las ciudades y solo retorna un key y label.

##### Controller

**Selector**

- `GET /selector/cities`: Encuentra todas las ciudades activas y solo retorna un key y label.

### 5. Medical Module

El modulo medico se encarga de gestionar reportes, archivos, resultados y ordenes medicas.

#### Submodulos

- File Downloader
- Medical Client
- Medical Order
- Medical Result
- Medical Report

#### Files

- `file-downloader/`: Modulo de archivos medicos.
- `medical-client/`: Modulo de clientes medicas.
- `medical-order/`: Modulo de ordenes medicas.
- `medical-result/`: Modulo de resultados medicos.
- `medical-report/`: Modulo de reporteria medica.

#### 5.1. Medical Client Module

El modulo de clientes medicos se encarga de tener una referencia de los pacientes, agregando funcionalidades adicionales.

##### Files

- `medical-client.module.ts`: Definicion del modulo.
- `medical-client.controller.ts`: Contiene los controladores para manejar peticiones HTTP.
- `medical-client.service.ts`: Contiene la logica de negocio para la gestion de clientes medicos.
- `dtos/`: Objetos de transferencia de datos para clientes medicos.
- `entities/`: Entidades de la base de datos para clientes medicos.
- `repositories/`: Gestiona el acceso a la entidad Cliente Medico y Email Medico en la base de datos.
- `test/`: Pruebas de codigo.

##### Services

- `findOneOrCreate`: Encuentra un cliente medico sino lo crea.
- `findEmailByDni`: Encuentra correos electronico dado un dni de un cliente medico.
- `updateEmailDefault`: Actualiza un correo por defecto para un cliente medico.
- `deleteEmailById`: Elimina un correo electronico de un cliente medico.
- `assignEmail`: Añade un correo electronico a un cliente medico.

##### Controller

- `GET /medical/client/:dni/email`: Retorna todos los correos pertenecientes a un cliente medico.
- `POST /medical/client/:dni/email`: Añade un correo electronico al cliente medico.
- `PATCH /medical/client/:dni/email/:id`: Coloca a un correo electronico como correo por defecto para el cliente medico.
- `DELETE /medical/client/email/:id`: Elimina el correo electronico solicitado.

#### 5.2. Medical Order Module

El modulo de ordenes medicas se encarga de la gestion de las mismas.

##### Files

- `medical-order.module.ts`: Definicion del modulo.
- `medical-order.repository.ts`: Gestiona el acceso a la entidad Orden Medica en la base de datos.
- `controllers/`: Contiene los controladores para manejar peticiones HTTP.
- `dtos/`: Objetos de transferencia de datos para ordenes medicas.
- `entities/`: Entidades de la base de datos para ordenes medicas.
- `external-key/`: LLaves provenientes de sistemas externos de ordenes medicas.
- `services/`: Contiene la logica de negocio para la gestion de ordenes medicas.
- `test/`: Pruebas de codigo.

##### Services

**Medical Order**

- `findOrderFilesById`: Retorna una orden medica mediante el identificador unico.
- `findByPatient`: Retorna varias ordenes medicas dado el dni de un cliente medico.
- `sendMail`: Envia un correo electornico basandose en una orden medica.

**External Connection**

- `findOrdersByPatient`: Encuentra ordenes medicas dado un paciente medico.
- `findOrderBySourceAndKey`: Encuentra una orden medica dado una aplicacion de origen y una llave externa.
- `create`: Crea una orden medica.
- `findOneOrCreate`: Encuentra una orden medica sino la crea.
- `findOneAndUpdate`: Encuentra una orden medica y la modifica.

##### Controller

**Orden Medica**

- `GET /medical/orders/files/:id`: Obtiene una orden medica dado un identificador unico.
- `GET /medical/orders/patient/:dni`: Obtiene ordenes medicas dadas un paciente.
- `POST /medical/orders/mail`: Envia un correo electronico basado en la orden medica.

**External Connection**

- `GET /external/connection/medical/order/dni/:dni`: Encuentra ordenes medicas dado un paciente.
- `GET /external/connection/medical/order/:source/:key`: Encuentra una orden medica dada la fuente y una llave unica.
- `POST /external/connection/medical/order/:source`: Crea una orden medica.
- `PATCH /external/connection/medical/order/:source/:key`: Encuentra una orden medica y la modifica.

#### 5.3. Medical Result Module

El modulo de resultados medicos se encarga de la gestion de las mismas.

##### Files

- `medical-result.module.ts`: Definicion del modulo.
- `medical-result.repository.ts`: Gestiona el acceso a la entidad Resultado Medico en la base de datos.
- `controllers/`: Contiene los controladores para manejar peticiones HTTP.
- `dtos/`: Objetos de transferencia de datos para resutados medicos.
- `entities/`: Entidades de la base de datos para resutados medicos.
- `external-key/`: LLaves provenientes de sistemas externos de resutados medicos.
- `send-attribute/`: Atributo que identifica a donde se enviaron los datos de forma masiva.
- `services/`: Contiene la logica de negocio para la gestion de resutados medicos.
- `test/`: Pruebas de codigo.

##### Services

**Medical Result**

- `getpath`: Obtiene la direccion donde se aloja un archivo.
- `find`: Obtiene los resultados medicos presentes en el sistema.
- `findResultsByDoctor`: Obtiene los resultados medicos asociados a un doctor.
- `findOneResultAndUpdateDisease`: Encuentra un resultado medico y le asigna una morbilidad.
- `findOneResultAndUploadFile`: Encuentra un resultado medico y le asigna un archivo.
- `insertMedicalReport`: Añade un reporte medico a un resultado medico.
- `assignSendAttribute`: Añade un atributo de envio a un resultado medico.

**External Connection**

- `findBySourceAndKey`: Encuentra un resultado medico en base a su origen e identificador externo.
- `create`: Crea un resultado medico.
- `findOneResultAndUploadFile`: Encuentra un resultado medico y le asocia un archivo.

##### Controller

**Orden Medica**

- `GET /medical/results`: Obtiene todos los resultados medicos presentes en el sistema.
- `GET /medical/results/doctor`: Obtiene todos los resultados medicos asociados a un medico.
- `PATCH /medical/results/:id`: Encuentra un resultado medico y le asocia una morbilidad.
- `PATCH /medical/results/file/:id`: Encuentra un resultado medico y le asocia un archivo.
- `PATCH /medical/results/report/:id`: Asigna un reporte medico a un resultado medico.

**External Connection**

- `GET /external/connection/medical/result/:source/:key`: Encuentra un resultado medico basandose en su aplicacion de origen y su identificador unico.
- `POST /external/connection/medical/result/:source`: Crea un resultado medico.
- `PATCH /external/connection/medical/result/:source/file/:key`: Encuentra un resultado medico y le asocia un archivo.

#### 5.4. Medical Report Module

El modulo de reportes medicos se encarga de la gestion de las mismas.

##### Files

- `medical-report.module.ts`: Definicion del modulo.
- `medical-report.repository.ts`: Gestiona el acceso a la entidad Reporte Medico en la base de datos.
- `medical-report.services.ts`: Contiene la logica de negocio para la gestion de reportes medicos.
- `medical-report.controllers.ts`: Contiene los controladores para manejar peticiones HTTP.
- `dtos/`: Objetos de transferencia de datos para reportes medicos.
- `entities/`: Entidades de la base de datos para reportes medicos.
- `send-attribute/`: Atributo que identifica a donde se enviaron los datos de forma masiva.
- `test/`: Pruebas de codigo.

##### Services

- `getpath`: Obtiene la direccion donde se aloja un archivo.
- `create`: Crea un reporte medico.
- `recreateReport`: Recrea un reporte medico dado un dni.
- `processReportPdf`: Procesa los datos del reporte medico para generar un pdf.
- `createPdf`: Crea el pdf y lo almacena en la memoria de la computadora.
- `getContent`: Genera el contenido requerido para generar el pdf.
- `assignSendAttribute`: Añade un atributo de envio a un resultado medico.

##### Controller

- `GET /medical/report/recreate/pdf`: Recrea todos los reportes medicos presentes en la base de datos.
- `GET /medical/report/recreate/pdf/:dni`: Recrea todos los reportes medicos presentes asociados a un paciente.

#### 5.5. File Downloader Module

El modulo de descarga de archivos.

##### Files

- `file-downloader.module.ts`: Definicion del modulo.
- `file-downloader.services.ts`: Contiene la logica de negocio para la descarga de archivos medicos.
- `file-downloader.controllers.ts`: Contiene los controladores para manejar peticiones HTTP.
- `dtos/`: Objetos de transferencia de datos para descargar archivos medicos.

##### Services

- `downloadFile`: Retorna un archivo pdf dado su tipo e identificador.
- `downloadMultipleFiles`: Retorna un archivo zip con todos los archivos especificados.

##### Controller

- `GET /medical/file`: Retorna un archivo pdf dado su tipo e identificador.
- `GET /medical/file/multiple`: Retorna un archivo zip con todos los archivos especificados.

### 6. OmegaWeb Module

El modulo encargado de gestionar los recursos web como clientes, paginas, logos, entre otros.

#### Submodulos

- Web Client
- Web Logo
- Web Resource

#### Files

- `web-client/`: Modulo de clientes web.
- `web-logo/`: Modulo de logos.
- `web-resource/`: Modulo de recursos web.

#### 6.1. Web Client Module

El modulo de clientes web se encarga de tener una referencia de los usuarios que usan el sistema, agregando funcionalidades para el manejo de la aplicacion web.

##### Files

- `web-client.module.ts`: Definicion del modulo.
- `web-client.controller.ts`: Contiene los controladores para manejar peticiones HTTP.
- `web-client.service.ts`: Contiene la logica de negocio para la gestion de clientes web.
- `web-client.repository.ts`: Gestiona el acceso a la entidad Web Client en la base de datos.
- `dtos/`: Objetos de transferencia de datos para clientes web.
- `entities/`: Entidades de la base de datos para clientes web.
- `listeners/`: Contiene la logica de ejecucion cuando es disparado un evento especifico.
- `test/`: Pruebas de codigo.

##### Services

- `findWebClient`: Encuentra un cliente web.
- `findWebResources`: Encuentra todas las paginas/recursos web asociados a un cliente web.
- `updateWebLogoFromClient`: Actualiza un logo de un cliente web dado.
- `updateWebResourcesFromClient`: Actualiza los recursos/paginas asociadas a un cliente web dado.

##### Controller

- `GET /omega/web/clients`: Retorna un cliente web dado un usuario.
- `GET /medical/client/email/resource/:user`: Retorna un recursos/paginas pertenecientes a un usuario.
- `PATCH /omega/web/clients/logo/:user`: Actualiza el logo de un cliente web.
- `PATCH /medical/client/email/resource/:user`: Actualiza los recursos/paginas de un cliente web.

#### 6.2. Web Logo Module

El modulo de logo web se encarga de gestionar los logos disponibles para la aplicacion.

##### Files

- `web-logo.module.ts`: Definicion del modulo.
- `web-logo.controller.ts`: Contiene los controladores para manejar peticiones HTTP.
- `web-logo.service.ts`: Contiene la logica de negocio para la gestion de logos.
- `web-logo.repository.ts`: Gestiona el acceso a la entidad Web Logo en la base de datos.
- `dtos/`: Objetos de transferencia de datos para logos.
- `entities/`: Entidades de la base de datos para logos.
- `test/`: Pruebas de codigo.

##### Services

- `findOne`: Encuentra un logo.

#### 6.3. Web Resource Module

El modulo de recursos web se encarga de gestionar las paginas pertenecientes al sistema web.

##### Files

- `web-resource.module.ts`: Definicion del modulo.
- `web-resource.controller.ts`: Contiene los controladores para manejar peticiones HTTP.
- `web-resource.service.ts`: Contiene la logica de negocio para la gestion de recursos/paginas.
- `web-resource.repository.ts`: Gestiona el acceso a la entidad Web Resource en la base de datos.
- `dtos/`: Objetos de transferencia de datos para recursos/paginas.
- `entities/`: Entidades de la base de datos para recursos/paginas.
- `test/`: Pruebas de codigo.

##### Services

- `findInNames`: Encuentra una serie de recursos web en base al arreglo de nombres solicitado.
- `findInIds`: Encuentra una serie de recursos web en base al arreglo de identificadores unicos proporcionado.
- `findShowAndActiveResources`: Encuentra todos los recursos del sistema.
- `findAll`: Encuentra los recursos web marcados como visibles.
- `create`: Crea un recurso web.
- `update`: Actualiza un recurso web.
- `delete`: Elimina un recurso web.

##### Controller

- `GET /omega/web/resources/all`: Retorna todos los recursos web del sistema.
- `GET /omega/web/resources`: Retorna unicamente aquellos recursos web marcados como observables.
- `POST /omega/web/resources`: Crea un recurso web.
- `PATCH /omega/web/resources/:id`: Actualiza un recurso web.
- `DELETE /omega/web/resources/id`: Elimina un recurso web.

### 7. User Module

El modulo usuarios, encargado de gestionar usuarios, pacientes y medicos del sistema.

#### Submodulos

- User
- Patient
- Doctor

#### Files

- `doctor/`: Modulo de archivos medicos.
- `patient/`: Modulo de clientes medicas.
- `user/`: Modulo de ordenes medicas.

#### 7.1. User Module

El modulo de usuarios del sistema, permite la gestion de los usuarios provee una capa de administracion en base a operaciones y CRUD, y actua como base para los modulos de pacientes y medicos.

##### Files

- `user.module.ts`: Definicion del modulo.
- `user.controller.ts`: Contiene los controladores para manejar peticiones HTTP.
- `user.service.ts`: Contiene la logica de negocio para la gestion de usuarios del sistema.
- `dtos/`: Objetos de transferencia de datos para usuarios del sistema.
- `entities/`: Entidades de la base de datos para usuarios del sistema.
- `listeners/`: Contiene la logica de ejecucion cuando es disparado un evento especifico.
- `repositories/`: Gestiona el acceso a la entidad Usuario en la base de datos.
- `services/`: Contiene la logica de negocio para la gestion de usuarios.
- `test/`: Pruebas de codigo.

##### Services

**User Service**

- `create`: Crea un usuario.
- `find`: Encuantra todos los usuarios activos menos el usuario con el identificador unico indicado.
- `findOne`: Encuentra un usuario en base a su identificador unico.
- `findOneByDni`: Encuentra un usuario en base a su dni.
- `findOneAndUpdate`: Encuentra un usuario y lo modifica.
- `findOneAndDelete`: Encuentra un usuario y lo desactiva.
- `findExtraAttribute`: Encuentra un atributo extra dentro de un usuario usando su identificador unico.
- `assignExtraAttribute`: Crea un atributo unico y lo asocia al usuario.

**User Extra Attribute Service**

- `create`: Crea un atributo extra.
- `update`: Actualiza un atributo extra.
- `delete`: Elimina un atributo extra.

##### Controller

- `GET /users`: Retorna todos los usuarios activos del sistema.
- `GET /users/:user`: Retorna un unico usuario del sistema.
- `POST /users`: Crea un usuario.
- `PATCH /users/:id`: Modifica un usuario en base a su identificador unico.
- `DELETE /users/:id`: Elimina un usuario en base a su identificador unico.
- `GET /users/look/for/company/:id`: Crea un atributo `look_for_company` y lo asocia a un usuario.
- `PATCH /users/look/for/company/:id`: Actualiza un atributo `look_for_company`.
- `GET /users/employee/:id`: Crea un atributo `employee_of` y lo asocia a un usuario.
- `PATCH /users/employee/:id`: Actualiza un atributo `employee_of`.
- `GET /users/doctor/of/:id`: Crea un atributo `doctor_of` y lo asocia a un usuario.
- `PATCH /users/doctor/of/:id`: Actualiza un atributo `doctor_of`.

#### 7.2. Patient Module

El modulo de pacientes del sistema, permite la gestion de los pacientes. Cabe destacar que un paciente es considerado como un usuario del sistema, por lo tanto comparte metodos y funciones con el modulo de usuarios.

##### Files

- `patient.module.ts`: Definicion del modulo.
- `patient.repository.ts`: Gestiona el acceso a la entidad Paciente en la base de datos.
- `common/`: Recursos y codigo que es compartido dentro del mismo modulo.
- `controller/`: Contiene los controladores para manejar peticiones HTTP.
- `dtos/`: Objetos de transferencia de datos para pacientes.
- `entities/`: Entidades de la base de datos para pacientes.
- `listeners/`: Contiene la logica de ejecucion cuando es disparado un evento especifico.
- `services/`: Contiene la logica de negocio para la gestion de usuarios.
- `test/`: Pruebas de codigo.

##### Services

**Patient Service**

- `find`: Encuentra todos los pacientes activos del sistema.
- `findByExtraAttribute`: Encuentra a todos los pacientes que compartan un atributo externo.
- `findOneByDni`: Encuentra un paciente por su dni.

**External Connection**

- `create`: Crea un paciente.
- `findOneOrCreate`: Encuentra un paciente si no existe lo crea.
- `findOneAndUpdate`: Encuentra un paciente y lo modifica.

##### Controller

**Patient Service**

- `GET /patients`: Retorna todos los usuarios activos del sistema.
- `GET /patients/look/company`: Retorna todos los pacientes que poseean el atributo `employee_of` y el mismo valor del atributo `look_for_company` del usuario que realiza la consulta.

**External Connection**

- `POST /external/connection/patients/:source`: Crea un paciente.
- `PATCH /external/connection/patients/:source/:key`: Encuentra un paciente y lo modifica.

#### 7.3. Doctor Module

El modulo de medicos, permite la gestion de los mismos. Cabe destacar que un medico es considerado como un usuario del sistema, por lo tanto comparte metodos y funciones con el modulo de usuarios.

##### Files

- `doctor.module.ts`: Definicion del modulo.
- `doctor.repository.ts`: Gestiona el acceso a la entidad Doctor en la base de datos.
- `controllers/`: Contiene los controladores para manejar peticiones HTTP.
- `dtos/`: Objetos de transferencia de datos para medicos.
- `entities/`: Entidades de la base de datos para medicos.
- `listeners/`: Contiene la logica de ejecucion cuando es disparado un evento especifico.
- `services/`: Contiene la logica de negocio para la gestion de usuarios.
- `test/`: Pruebas de codigo.

##### Services

**Doctor Service**

- `find`: Encuentra todos los medicos activos del sistema.
- `findOne`: Encuentra un medico por su identificador unico.
- `findOneByDni`: Encuentra un medico por su dni.
- `uploadSignature`: Carga una imagen como firma del medico.

**External Connection**

- `create`: Crea un paciente.
- `findOneOrCreate`: Encuentra un paciente si no existe lo crea.
- `findOneAndUpdate`: Encuentra un paciente y lo modifica.

##### Controller

**Doctor Service**

- `GET /doctors`: Retorna todos los medicos activos del sistema.
- `POST /doctors/signature/:id`: Carga una imagen al sistema.

**External Connection**

- `POST /external/connection/doctor/:source`: Crea un medico.
- `PATCH /external/connection/doctor/:source/:key`: Encuentra un medico y lo modifica.

<div id='patterns-and-practices'/>

## Patrones y Practicas

<div id='patterns-and-practices-naming'/>

### Nomenclatura

<div id='patterns-and-practices-error-handling'/>

### Manejo de errores

<div id='patterns-and-practices-logging'/>

### Logging

<div id='testing'/>

## Pruebas de Software

<div id='run-tests'/>

### Ejecucion de pruebas

<div id='run-tests-e2e'/>

### Ejecucion de pruebas end-to-end

<div id='run-tests-strategy'/>

### Estrategia de pruebas

<div id='additional-resources'/>

## Recursos Adicionales

- [Documentacion NestJS](https://docs.nestjs.com/)
- [Documentacion TypeORM](https://typeorm.io/)
- [Documentacion Swagger](https://swagger.io/docs/)
