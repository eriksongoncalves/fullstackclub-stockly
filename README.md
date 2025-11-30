## Settings

Duplicate and rename the `.env.example` file to `.env`.

In the terminal, at the root of the project, install the dependencies:

```bash
pnpm install

docker-compose up -d

npx prisma migrate dev
npx prisma generate
```

## Starting the application:

```bash
docker-compose up -d # If containers are not running
pnpm dev
```
