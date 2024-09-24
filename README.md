# Omega Backend

## Tabla de Contenidos

- [Introducción](#introduction)
- [Tecnologias usadas](#used-technologies)
- [Variables de Entorno](#environment-variables)
- [Guia de instalacion](#installation-guide)
  - [Desarrollo](#installation-guide-dev)
  - [Produccion](#installation-guide-prod)
- [Directorios](#directory-structure)
- [Modulos](#module-documentation)
- [Patrones y Practicas](#patterns-and-practices)
  - [Nomenclatura](#patterns-and-practices-naming)
- [Pruebas de Software](#testing)
  - [Ejecucion de pruebas](#run-tests)
- [Recursos adicionales](#additional-resources)

<div id='introduction'/>

## Introduccion

Aplicacion enfocada en la administracion de reportes y resultados medicos. Asi mismo, provee una interface que permite la conexion con aplicaciones externas de modo que pueda compatir y recibir informacion con otras aplicaciones.

La aplicacion hace uso de la naturaleza modular de NestJS para su construccion de modo que cada modulo actue de forma independiente del resto del aplicativo.

<div id='used-technologies'/>

## Tecnologias usadas

|          |                   |            |            |         |         |
| -------- | ----------------- | ---------- | ---------- | ------- | ------- |
| NestJS   | class-transformer | ExcelJS    | JsDom      | PdfMake | Swagger |
| Archiver | class-validator   | Handlebars | Winston    | Typeorm | Docker  |
| Axios    | Dayjs             | Joi        | Nodemailer | Uuid    |         |
| Bcrypt   | Dotenv            | MySql      | Passport   | Winston |         |

<div id='environment-variables'/>

## Variables de Entorno

Crea un archivo `.env` en la raiz del proyecto y añade las siguientes variables

```env
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

Para el despliegue en produccion existen dos alternativas, ambas con docker.

<details>
  <summary><b>Metodo 1: </b><i>Dockerfile</i></summary></br>

En el presente repositorio se puede encontrar un archivo `Dockerfile`, con el cual puede crear la imagen del proyecto. En este archivo se detalla la contruccion de la aplicacion y define un comando para que esta se inicialice.

Con ello en mente, solo hay que seguir los presentes pasos

1. Clonar el repositorio.

```bash
git clone https://github.com/davidbalance/OmegaBack.git
```

2. Ingresar al directorio.

```bash
cd OmegaBack
```

3. Crear una imagen de docker.

```bash
docker build -t OmegaBack:latest .
```

4. Ejecutar la imagen.

```bash
docker run OmegaBack:latest -e <variables de entorno>
```

</details>

<details>
  <summary><b>Metodo 2: </b><i>Github workflow</i></summary></br>

En el directorio `.github/workflow` encontrara el workflow del despliegue de la aplicacion, nombrado como `node.yml`. Este archivo ejecuta una serie de pasos para asegurarse que el sistema funcione sin problemas al mismo tiempo que crea una imagen de docker y la despliega en el servidor.

Los trabajos que corre este workflow son:

1. **test**: Ejecuta las pruebas unitarias del sistema, si fallan no se ejecuta el siguiente trabajo
2. **build_and_push_docker_image**: Crea una imagen de docker usando el dockerfile presente en el repositorio y lo sube a dockerhub.
3. **deploy**: Entra al servidor, accede al directorio indicado, apaga el contenedor de la aplicacion, lo elimina, descarga la nueva imagen, y corre el nuevo contendor.

Al observar el workflow se podra identificara que usa variables de entorno, esta pueden ser encontradas en github en `settings > Security > Secrets and variables > Actions`

#### Github secrets

- `SERVER_HOST`: Servidor donde se aloja la aplicacion
- `SERVER_USERNAME`: Usuario del servidor
- `SERVER_PASSWORD`: Contraseña del servidor
- `DOCKER_IMAGE`: Nombre de la imagen
- `DOCKERHUB_USERNAME`: Usuario de dockerhub
- `DOCKERHUB_TOKEN`: Token que provee docker hub
- `DOCKER_COMPOSE_DIRECTORY`: Directorio donde se aloja el archivo docker-compose.yml detro del servidor

#### Ejecutar el worflow

El workflow de despliegue se ejecutara automaticamente una vez se haga un cambio en la rama `main`

</details>

<div id='directory-structure'/>

## Directorios

Todos los directorios comparten la siguiente estructura:

```bash
src
├───module
    ├───submodule
        ├───controllers
        ├───dtos
        │   ├───request
        │   └───response
        ├───entities
        ├───repositories
        ├───listeners
        ├───services
        └───stub
```

- **module**: es un modulo padre, sirve como contenedor, solo define un archivo `.module.ts`
  - **submodule**: modulo de la aplicacion, contiene toda la logica de negocio
    - **controllers**: directorio donde seran almacenados todos los controladores
    - **dtos**: directorio donde se almacenan los dtos
      - **request**: se colocan todos los dtos que son usados para obtener el cuerpo de la peticion
      - **response**: se colocan todos los dtos que son usados para devolver un valor
    - **entities**: directorio donde se almacenan las entidades
    - **repositories**: directorio donde se almacenan los repositorios
    - **listeners**: directorio donde se almacenan los listeners del modulo
    - **services**: directorio donde se almacenan los servicios
    - **stub**: directorio donde se almacenan los datos para realizar pruebas

<div id='module-documentation'/>

## Modulos

Cada modulo expone una serie de endpoints, pero la documentacion de estos puede ser accedida en desarrollo en la direccion `/docs`.

Los modulos se pueden distiguir en los siguientes grandes grupos:

|                |         |
| -------------- | ------- | ---------- |
| Authentication | Disease | Laboratory |
| Location       | Medical | Omega Web  |
| Session        | User    |            |

Estos grandes grupos poseen submodulos, con excepcion de `Session`. Estos submodulos contienen la logica de negocio para la realizacion de procesos y exponen endpoints para que otras aplicaciones consuman.

<details>
  <summary><b>Authentication</b></summary>

Este modulo expone metodos de autenticacion, creacion de usuarios, y proteccion de rutas

- **Api key**: Modulo centrado en la administracion de api keys.
- **Token**: Modulo centrado en la administracion y validacion de tokens de autorizacion y refrescamiento
- **User credential**: Modulo centrado en la administracion de las credenciales de acceso de un usuario

</details>

<details>
  <summary><b>Disease</b></summary>

Este modulo agrupa datos asociados a las morbilidades y grupos de morbilidades. Por nomenclatura, se opto por llamar a la morbilidad como 'disease' en lugar de 'morbidity' pues esta palabra tambien puede ser traducida o percibida como 'morbosidad'.

- **Disease group**: Modulo centrado en la administracion de grupos de morbilidades.
- **Disease**: Modulo centrado en la administracion de morbilidades.

</details>

<details>
  <summary><b>Laboratory</b></summary>

Este modulo agrupa datos asociados a los examenes medicos. Un examen medico se pertenece a un subtipo de examenes, que a su vez pertenece a un tipo de examen.
Los submodulos asociados exponen endpoints para permitir la entrada de datos desde fuentes externas como Labint u Orion.

- **Exam type**: Modulo centrado en la administracion de tipos de examenes.
- **Exam subtype**: Modulo centrado en la administracion de subtipos de examenes
- **Exam**: Modulo centrado en la administracion de examenes.

</details>

<details>
  <summary><b>Location</b></summary>

Este modulo agrupa datos asociados a grupos de empresas y sus respectivos campos o grupos internos.
Los submodulos asociados exponen endpoints para permitir la entrada de datos desde fuentes externas como Labint u Orion.

- **Corporative group**: Modulo centrado en la administracion de grupos corporativos.
- **Company**: Modulo centrado en la administracion de empresas.
- **Branch**: Modulo centrado en la administracion de sucursales.
- **City**: Modulo centrado en la administracion de ciudades.
- **Management**: Modulo centrado en la administracion de gerencias.
- **Area**: Modulo centrado en la administracion de areas de empresariales.
- **Job position**: Modulo centrado en la administracion de posiciones de trabajo.

</details>

<details>
  <summary><b>Medical</b></summary>

Este modulo agrupa datos asociados a los procesos medicos.
Los submodulos asociados exponen endpoints para permitir la entrada de datos desde fuentes externas como Labint u Orion.

- **File downloader**: Modulo centrado en la obtencion de archivos medicos almacenados en el sistema.
- **Medical client**: Expone los datos del paciente como referencia para la orden medica.
- **Medical order**: Modulo centrado en la administracion de ordenes medicas.
- **Medical order result**: Modulo construido con el unico fin de proporcionar una capa intermedia entre la orden y el resultado durante la conexion con una aplicacion externa.
- **Medical result**: Modulo centrado en la administracion de resultados medicos. En otras aplicaciones este modulo puede ser considerado como el modulo de examenes o el modulo de pruebas.
- **Medical report**: Modulo centrado en la reporteria medica generada por un doctor.

</details>

<details>
  <summary><b>Omega Web</b></summary>

Este modulo funge como una capa de abstracion que proporciona datos y relacionados al frontend de la aplicacion, como el logo que debe mostrarse, las rutas a las que un usuario puede acceder, entre otras.

- **Web client**: Referencia del usuario que va a usar el sistema, a este se le asocian los datos como rutas y logo.
- **Web logo**: Modulo que almacena el logo que sera mostrado en la aplicacion web.
- **Web resource**: Modulo que administra las rutas de la aplicacion web.

</details>

<details>
  <summary><b>Session</b></summary>

Debido a temas relacionados al servidor, se opto por crear un modulo de 'Session' dentro del servidor, en lugar de crearlo en conjunto al frontend. Este se encarga de almacenar la sesion de un usuario y asociarla con un token de acceso y un token de refrescamiento, con el fin que no sean expuestos en el cliente, ya sea en el localstorage o en las cookies, pues dentro solo sera almacenada una sesion entregada por NextAuth.

</details>

<details>
  <summary><b>User</b></summary>

Este modulo agrupa datos asociados a los usuarios del sistema.

- **Doctor**: Modulo que administra a los medicos de la aplicacion, ademas de llevar un registro de las firmas cargadas.
- **Patient**: Modulo que administra a los pacientes.
- **Web resource**: Modulo que administra a los usuarios del sistema.

</details>

<div id='patterns-and-practices'/>

## Patrones y Practicas

<div id='patterns-and-practices-naming'/>

### Nomenclatura

Los archivos son nombrados usando un guion medio en cada espacio y con minisculas:

- `file`: file.ts
- `My file`: my-file.ts

Las variables se nombran con **_camel case_**:

- `My variable`:

```javascript
const myVariable = 'data';
```

Las clases y tipos de datos se nombran con **_pascal case_**:

- `My class`:

```javascript
class MyClass {}
```

<div id='testing'/>

## Pruebas de Software

Las pruebas son realizadas usando `jest`. Para el momento de redaccion de este archivo, no se han elaborado pruebas de e2e, por lo que es un tema que falta por realizar. Para estas pruebas igual puede hacer uso de jest.

Para crear una prueba unitaria, debe crear un archivo con la sigueinte extension `.spec.ts`, de esta forma jest podra reconocer al archivo como una prueba unitaria y la agregara a la ejecucion de las pruebas.

<div id='run-tests'/>

### Ejecucion de pruebas

Para la ejecucion de las pruebas debe correr el comando

```bash
npm run test
```

Este comando correra todas las pruebas del sistema.

De igual manera, dentro del worflow de despligue de la aplicacion, el primer paso que ejecuta antes de enviar a produccion al sistema son las pruebas, si una falla el sistema no permitira el despliegue de la aplicacion.

<div id='run-tests-e2e'/>

### Ejecucion de pruebas end-to-end

<div id='additional-resources'/>

## Recursos Adicionales

- [Documentacion NestJS](https://docs.nestjs.com/)
- [Documentacion TypeORM](https://typeorm.io/)
- [Documentacion Swagger](https://swagger.io/docs/)
