<h1 align="center">
    PROYECTO DE TESIS
    </a>
    </a>
</h1>

<p align="center">
  <i align="center">HERRAMIENTA DE WEB SCRAPPING Y ANALÍTICA DE DATOS 🚀</i>
</p>

<img src='./.github/assets/screen-login.webp'>

<details open>
<summary>
 VISTA PREVIA
</summary> <br />

<p align="center">
    <img width="49%" src='./.github/assets/screen-profile.webp' alt="data-models"/>
&nbsp;
    <img width="49%" src='./.github/assets/screen-scrapping.webp' alt="apis"/>
</p>

<p align="center">
    <img width="49%" src='./.github/assets/screen-search.webp' alt="data-models"/>
&nbsp;
 <img width="49%" src='./.github/assets/screen-users.webp' alt="apis"/>
</p> 
</details>

## Tabla de contenido

- [Tabla de contenido](#table-of-content)
- [Introduccion](#introduction)
  - [Manual de nstalacion](#instalation-manual)
- [Produccion](#production)
  - [Configuracion de la Database](#database-setup)
  - [Seguridad](#security)

## Introduccion

Es un proyecto de desarrollo de código abierto diseñado para fines de scraping y permite una personalización del código sin esfuerzo, ofreciendo una amplia gama de capacidades de scraping meticulosamente adaptadas y siguiendo las mejores prácticas de la industria.

### Instalation Manual

Primero, es fundamental conocer algunos requisitos previos para ejecutar este proyecto y trabajar en su desarrollo.

<details close>
<summary>
Pre-requisitos
</summary> <br />
Para poder comenzar el desarrollo en esta aplicación, asegúrate de tener instalados los siguientes requisitos previos:

<br/>

- Node.js
- PostgresQL
- Git
</details>

<details close>
<summary>
Stacks
</summary> 

Algunas stacks que se han utilizado para este proyecto.
<br/>
<br/>

- [Recharts](https://recharts.org/en-US/api/RadarChart) - Charts.
- [Shadcn UI](https://ui.shadcn.com/docs) - **UI** Docs.
- [Lucia Auth](https://lucia-auth.com/) - **Authentication**.
- [Zustand](https://docs.pmnd.rs/zustand/guides/updating-state) - **State** Management.
- [NEXTJS](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes) - **Framework** (Parallel Routes).

</details>

Para configurar un entorno de desarrollo local, se pueden seguir los siguientes pasos:

<br/>

1.  Agrega variables de entorno en el proyecto raíz, como **.env**
```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/webscrapping?schema=public
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_1dh5zqW7U0xFDgEr_PK9m181RKqz7QfGdpKcJZF8oraLqjW"
# CLOUD DB
# DATABASE_URL=postgresql://makeapp_heroe:heroe17.@postgresql-makeapp.alwaysdata.net:5432/makeapp_webscrapping?schema=public

SECRET_HASH='ipnYi9wYv1vFhAev3ByNLkauZqaiDuKCowxJZ74brs8='
NEXTAUTH_SECRET='QjVD3Sf05NcmJtON1GSvkpp4IjacmvNT9seAilNm0LQ='
NEXTAUTH_URL=localhost:3000
APP_ENV='development'

OWNER='Johan Quinatoa'
PROXY_AND_PORT=23.26.236.11:3128

# PROXY_AND_PORT=190.97.238.91:999

# websites to scrype
AMAZON_ADDRESS=https://www.amazon.com
BOOKS_ADDRESS=https://books.toscrape.com/
BOT_DETECT_ADDRESS=https://bot.sannysoft.com/
MERCADO_LIBRE=https://www.mercadolibre.com.ec/
INSTAGRAM=https://www.instagram.com

```


2.  Luego, coloca todas las migraciones en la base de datos con este comando:
    <br/>

```bash
# Init database with all migrations pre-existing
npx prisma migrate reset

```

3. Iniciar el servidor

```bash
npm install
npm run dev
```

4. Ver la base de datos en prisma studio

```bash
npx prisma studio
```

<details close>
<summary>
Algunos comandos utilies
</summary>

```bash
# DB
# Reset DB
npx prisma migrate reset

# Make migrations to db
npx prisma migrate --name firstMigration

# Generate types to @prisma/client
npx prisma generate

# Push changes to the db without migrations
npx prisma db seed

# Seed db
npx prisma db seed

# Generate secret key (unix)
openssl rand -base64 32

# Delete cache env
git rm --cached -r .env*
```

</details>

## Produccion

Este proyecto esta desplegado utlizando [Vercel Docs](https://vercel.com/docs). Recomiendo seguir la documentacion [Deploy Docs](https://vercel.com/docs/getting-started-with-vercel/import) paso a paso para ejecutarla en NextJS

Protyecto en produccion [Produccion :rocket:](https://puppeteer-nextjs-blond.vercel.app/)

### Configuracion de la Database

Para establecer uniones entre tablas, fue necesario agregar algunas configuraciones en el archivo schema.prisma y, si se requiere, crear identificadores personalizados a través de PostgreSQL. Agrega la opción `previewFeatures` de la siguiente manera:

```prisma
 generator client {
  provider        = "prisma-client-js"
  // to unix
  binaryTargets   = ["native", "debian-openssl-1.1.x", "debian-openssl-3.0.x", "linux-musl", "linux-musl-openssl-3.0.x"]
  // joins tables
  previewFeatures = ["postgresqlExtensions", "relationJoins"]
}

datasource db {
  ...
  // joins tables
  relationMode = "prisma"
  // to generate ids with potsgresql (dbgenerated)
  extensions   = [pgcrypto]
}

model User {
  id String @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  ...
}
```

### Seguridad

Lucia gestiona la gestión de sesiones a través de cookies. De esta manera, es necesario agregar una capa adicional de seguridad, como Argon2, pero con una clave secreta para mayor seguridad. A pesar de esto, la sesión tiene una duración definida de 1 semana. En caso de que no haya una sesión disponible en la página de confirmación, se redirigirá a crear una nueva sesión con la página de inicio de sesión.

```typescript
export const lucia = new Lucia(adapter, {
    ...
    sessionExpiresIn: new TimeSpan(1, "w")
});
```

```typescript
export const SECRET_HASH_PASS = Buffer.from(SECRET_HASH, "utf8") as Buffer;

// code in route handler
export async function hashedPassword(password: string) {
  const hash = await argon2.hash(password, optionsArgon2);
  return hash;
}

// code in server actions
const hashedPassword = await new Argon2id({ secret: SECRET_HASH_PASS }).hash(
  password
);
```
