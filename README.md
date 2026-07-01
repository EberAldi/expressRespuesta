# expressRespuesta — API REST con Express + MongoDB

API REST construida con Express 5 y MongoDB (vía Mongoose), con tres colecciones: **Usuario**, **Articulo** y **Cliente**. Cada una expone operaciones CRUD completas (GET, POST, PUT, DELETE).

## Stack

- Node.js
- Express 5
- MongoDB (local, Community Edition)
- Mongoose (ODM)
- dotenv (variables de entorno)
- nodemon (solo en desarrollo)

---

## 1. Requisitos previos

Antes de levantar el proyecto, la máquina donde va a correr necesita tener instalado:

- **Node.js** y **npm**
- **Git**
- **MongoDB Community Edition**, corriendo como servicio local (en `localhost:27017`)

> Este proyecto está pensado para correr con Express y MongoDB **en la misma máquina**. No usa MongoDB Atlas ni ninguna base de datos externa.

---

## 2. Instalar MongoDB en Ubuntu Server

MongoDB no viene en los repositorios por default de Ubuntu, así que hay que agregar el repositorio oficial de MongoDB antes de instalarlo con `apt`. A grandes rasgos, el proceso es:

1. Importar la llave GPG oficial de MongoDB.
2. Agregar el repositorio oficial de MongoDB a las fuentes de `apt` (la URL exacta depende de la versión de Ubuntu — 22.04, 24.04, etc. — y de la versión de MongoDB que se instale).
3. Actualizar la lista de paquetes (`apt update`) e instalar el paquete `mongodb-org`.
4. Iniciar el servicio de MongoDB y **habilitarlo para que arranque automáticamente** cuando la VM se reinicie (usando `systemctl enable --now mongod`, o equivalente).
5. Confirmar que el servicio está activo y escuchando en el puerto **27017**.

📖 Consultar la documentación oficial para los comandos exactos según la versión de Ubuntu Server que se esté usando: https://www.mongodb.com/docs/manual/administration/install-on-linux/

No hace falta configurar usuario/contraseña de MongoDB para este proyecto — se usa sin autenticación, ya que la base de datos solo es accesible desde `localhost` (Express corre en la misma máquina).

---

## 3. Clonar el repositorio

```bash
git clone <URL-del-repositorio>
cd expressRespuesta
```

---

## 4. Instalar dependencias del proyecto

```bash
npm install
```

Esto instala Express, Mongoose, dotenv y demás dependencias listadas en `package.json`.

---

## 5. Configurar variables de entorno

El proyecto necesita un archivo `.env` en la raíz (este archivo **no viene en el repositorio** por seguridad — hay que crearlo manualmente). Usa `.env.example` como referencia de qué variables se necesitan:

```bash
cp .env.example .env
```

Y edita `.env` con estos valores:

```
MONGO_URI=mongodb://localhost:27017/expressRespuesta
PORT=3000
```

> `localhost:27017` porque MongoDB corre en la misma máquina que Express. No se necesita cambiar nada más, salvo que se quiera usar otro puerto para el servidor.

---

## 6. Levantar el servidor

Para pruebas rápidas (se detiene si se cierra la terminal):

```bash
npm start
```

### ⚠️ Importante: dejar el servidor corriendo de forma permanente

Si el servidor se levanta con `npm start` directo en una sesión SSH, **se cae en cuanto se cierra esa sesión**. Para que quede corriendo de forma persistente en la VM (aunque se cierre la terminal o se desconecte el SSH), hay que usar un gestor de procesos. Dos opciones comunes:

- **PM2** (más simple, se instala como paquete de npm): mantiene la app corriendo en segundo plano, la reinicia sola si truena, y puede configurarse para levantarse automáticamente si la VM se reinicia.
- **systemd** (nativo de Linux): crear un archivo de servicio (`.service`) para que Ubuntu administre el proceso como cualquier otro servicio del sistema (igual que hace con MongoDB).

Cualquiera de las dos opciones funciona — la elección no afecta el código del proyecto, es solo cómo se administra el proceso en la VM.

Una vez levantado (por cualquiera de los métodos), en consola debería aparecer:

```
✅ Conectado a MongoDB
Servidor corriendo en http://localhost:3000
```

---

## 7. Exponer el servidor para pruebas externas

Las pruebas con Postman se van a hacer **desde otra máquina**, no desde la VM. Para que eso funcione:

- El **puerto de Express** (por default `3000`) debe estar accesible desde la red donde está la VM — revisar el firewall de Ubuntu (`ufw` u otro) y permitir ese puerto si está bloqueado.
- El **puerto de MongoDB** (`27017`) **no necesita exponerse** a la red — Mongo solo es consultado por Express internamente vía `localhost`, nadie externo necesita hablarle directo.
- Se necesita conocer la **IP de la VM** dentro de la red (o su IP accesible desde la máquina de pruebas) para armar las URLs en Postman, por ejemplo:
  ```
  http://IP-DE-LA-VM:3000/usuarios
  ```

---

## 8. Endpoints disponibles

### Usuarios
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/usuarios` | Lista todos los usuarios |
| GET | `/usuarios/:id` | Obtiene un usuario por id |
| POST | `/usuarios` | Crea un usuario (`usuario`, `password`, `rol`, `email`) |
| PUT | `/usuarios/:id` | Actualiza un usuario |
| DELETE | `/usuarios/:id` | Elimina un usuario |

### Articulos
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/articulos` | Lista todos los artículos |
| GET | `/articulos/:id` | Obtiene un artículo por id |
| POST | `/articulos` | Crea un artículo (`nombre`, `descripcion`, `precio`, `stock`, `categoria`) |
| PUT | `/articulos/:id` | Actualiza un artículo |
| DELETE | `/articulos/:id` | Elimina un artículo |

### Clientes
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/clientes` | Lista todos los clientes |
| GET | `/clientes/:id` | Obtiene un cliente por id |
| POST | `/clientes` | Crea un cliente (`nombre`, `apellido`, `email`, `telefono`, `direccion`) |
| PUT | `/clientes/:id` | Actualiza un cliente |
| DELETE | `/clientes/:id` | Elimina un cliente |

---

## 9. Estructura del proyecto

```
expressRespuesta/
├── config/
│   └── db.js               # Conexión a MongoDB
├── models/
│   ├── usuario.model.js
│   ├── articulo.model.js
│   └── cliente.model.js
├── Controller/
│   ├── usuario.controller.js
│   ├── articulos.controller.js
│   └── clientes.controller.js
├── Service/
│   ├── usuario.service.js
│   ├── articulos.service.js
│   └── clientes.service.js
├── .env                     # NO se sube al repo (contiene datos sensibles)
├── .env.example              # Plantilla de variables de entorno
├── index.js                  # Punto de entrada
└── package.json
```