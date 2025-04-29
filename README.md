# Omega App

## Introducción

Omega App es una aplicación enfocada en la administración de reportes y resultados médicos. Asimismo, provee una WebAPI que permite la conexión con aplicaciones externas, facilitando el intercambio de información con otros sistemas.

La aplicación aprovecha la arquitectura modular de NestJS, permitiendo que cada módulo funcione de manera independiente del resto de la aplicación.

## Tecnologías usadas

| Category                        | Package(s)                                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Core Framework**              | `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`, `@nestjs/config`, `@nestjs/event-emitter` |
| **Authentication**              | `@nestjs/jwt`, `@nestjs/passport`, `passport`, `passport-local`, `bcryptjs`                             |
| **ORM / Database**              | `@prisma/client`                                                                                        |
| **API Documentation (OpenAPI)** | `@nestjs/swagger`, `@scalar/nestjs-api-reference`                                                       |
| **Validation**                  | `class-validator`, `zod`                                                                                |
| **Transformation**              | `class-transformer`                                                                                     |
| **PDF Generation**              | `pdfmake`, `html-to-pdfmake`, `handlebars`, `jsdom`                                                     |
| **File Handling**               | `archiver`, `exceljs`                                                                                   |
| **Email**                       | `nodemailer`                                                                                            |
| **Reactive Programming**        | `rxjs`                                                                                                  |
| **Logging**                     | `winston`, `nest-winston`, `winston-transport`                                                          |
| **Metadata Support**            | `reflect-metadata`                                                                                      |
| **Deployment**                  | `Docker`                                                                                                |

### Instalación

Para iniciar el entorno local de desarrollo:

```bash
npm install
npx prisma generate
npm run start:dev
```

### Modulos

Para una mejor gestión de la información y del flujo de los procesos, la aplicación se ha dividido en cinco grandes grupos, cada uno enfocado en características específicas:

- **Morbilidades**: Gestiona las operaciones CRUD relacionadas con las morbilidades.
- **Laboratorio**: Administra las operaciones CRUD sobre la estructura de pruebas de laboratorio (tipo, subtipo, prueba).
- **Localidades**: Maneja las operaciones CRUD de los grupos corporativos o empresas que tienen contratos con Omega.
- **Área médica**: Enfocada en la administración de pacientes, órdenes/pedidos, pruebas, resultados, fichas y reportes médicos. Es el módulo más extenso y donde ocurre la mayor parte del flujo operativo. Emite eventos para comunicar información a otros módulos cuando es necesario.
- **Perfiles**: Se encarga de las operaciones CRUD sobre los perfiles de usuario.

## Despliegue de la aplicación

A través de los _workflows_ de GitHub se han definido dos líneas de despliegue: una exclusiva para el entorno de pruebas y otra para el entorno de producción.

Cuando se realiza un merge a la rama `main`, se ejecuta el workflow de despliegue a producción. En cambio, si los cambios se realizan en la rama `development`, la aplicación se despliega en el servidor de pruebas. Es importante resaltar que todo cambio destinado a `main` debe pasar primero por un _pull request_ y ser aprobado. De lo contrario, no será posible hacer el merge ni el despliegue correspondiente.

La aplicación se ejecuta dentro de un contenedor. Por lo tanto, en ambos _workflows_ se dispara una acción que genera una imagen de Docker para el entorno requerido.

## Estrategia de pruebas

Los archivos de prueba están nombrados usando el sufijo `.spec.ts` y están excluidos del proceso de compilación. Para ejecutar las pruebas:

```bash
npm run test
```

## Nomenclatura

### Archivos

Todos los archivos deben nombrarse utilizando **kebab-case**.
Ejemplo: `this-my-file.ts`

### Clases

Las clases deben nombrarse utilizando **PascalCase**.
Ejemplo: `ThisIsMyClass`

### Variables y funciones

Las variables y funciones deben seguir el formato **camelCase**.
Ejemplo: **thisIsMyVariable**

Recuerda que las variables representan sustantivos y las funciones, acciones. Dado que el sistema trabaja con eventos, se recomienda utilizar verbos en pasado para nombrarlos, como `WrittenMessage`, lo que facilita su identificación.

## Variables de entorno

```bash
DATABASE_URL="schema://your-user:password@your-host:<port>/db"

NODE_ENV=production
PORT=3000
NETWORK=0.0.0.0

LOCAL_EMAIL_USER=user@email.com
LOCAL_EMAIL_PASS=your-email-password
LOCAL_EMAIL_DEFAULT_NAME=no-reply
LOCAL_DEFAULT_ADDRESS=default@email.com
LOCAL_EMAIL_HOST=your.smpt.host
LOCAL_EMAIL_PORT=465
LOCAL_EMAIL_SECURE=true

REDIRECT_URL_EMAIL=http://your-redirect-url.com

JWT_ACCESS_SECRET= your-secret
JWT_ACCESS_EXPIRES_IN= 300
JWT_REFRESH_SECRET=your-secret
JWT_REFRESH_EXPIRES_IN=86400

HTML_TEMPLATE_PATH=path/to/html-template.html
```

## Arquitectura

El sistema sigue una arquitectura hexagonal y aplica los principios de Domain-Driven Design (DDD), complementado con una base conceptual de CQRS para separar acciones, consultas y eventos. Esta implementación de CQRS es conceptual y no estrictamente técnica.

Cada módulo adopta su propia arquitectura hexagonal, organizada en tres capas principales:

- **Dominio**: Representa el núcleo del negocio, contiene toda la lógica empresarial y no depende de herramientas externas ni del framework.
- **Aplicación**: Define los contratos e interfaces que permiten la comunicación entre el dominio y las capas externas. Actúa como orquestador del flujo de datos.
- **Integración**: Maneja la interacción con NestJS, controladores y la inyección de dependencias. Esta capa contiene carpetas como nest o controllers, así como archivos `*.module.ts`, que encapsulan todo lo relacionado con el framework.

Dado que se utiliza una arquitectura hexagonal, también se identifican los actores **Driving** y **Driven**:

- En el directorio `adapters` se ubican los actores que dependen directamente del dominio, como la capa de persistencia.
- En la carpeta externa `libs` se encuentran los actores independientes del dominio, como la capa de envío de correos electrónicos.

Hay excepciones, como los manejadores de eventos (handlers) o controladores, que aunque son actores _Driven_, por motivos de organización se ubican dentro de los módulos, en la carpeta `nest`.

## Manejo de errores

El sistema define errores personalizados como:

- `InternalError`
- `BadRequestError`
- `ConflictError`
- `NotFoundError`
- `RepositoryError`

Todos los errores lanzados por la aplicación son capturados por un interceptor global que los transforma en respuestas HTTP con el código de estado correspondiente.

## Documentación de la API

Cualquier desarrollador puede acceder a la documentación de la API mediante Swagger en la ruta:

```bash
/reference
```

## Seguridad

La autenticación está basada en **JWT** (tokens de acceso y refresco), gestionados mediante **guards**.

Adicionalmente, ciertas rutas pueden ser aseguradas mediante **API Keys**, también mediante guards personalizados.