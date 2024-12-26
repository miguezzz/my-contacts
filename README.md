# My Contacts

API para armazenamento de contatos. Nela utilizaremos tecnologias como Docker, Node e PostgreSQL. Futuramente, seu front-end será implementado com React e React Native (para mobile).

## Requisitos

- yarn (ou npm)
- Node.js
- Docker

## Instalação

1. Clone o repositório
```bash
git clone https://github.com/miguezzz/my-contacts.git
cd mycontacts
```

2. Instale as dependências
```bash
yarn install (ou npm install)
```
3. Execute o container do postgres
```docker
docker run --name pg -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres
```

4. Entre no cliente do postgres
```bash
docker exec -it pg bash
```

5. Dentro do cliente do postgres, acesse o banco de dados
```bash
psql -U root
```

6. Crie a base de dados e insira os comandos (disponíveis no arquivo `schema.sql`) a seguir:
```sql
CREATE DATABASE mycontacts;
```
Conecte-se à base de dados criada
```sql
\c mycontacts
```
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```
```sql
CREATE TABLE IF NOT EXISTS categories (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);
```
```sql
CREATE TABLE IF NOT EXISTS contacts (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  phone VARCHAR,
  category_id UUID,
  FOREIGN KEY(category_id) REFERENCES categories(id)
);
```


