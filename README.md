# Como iniciar a aplicação

## Iniciando a API da ghibli

**Atenção!** Devido ao fato de que a API da ghibli ter sido desativada por conta da decisão da `heroku` que passou a cobrar pelas aplicações, teremos que subir essa API localmente para realizer o seed do banco!

- Clone o repositorio da api
  `git clone git@github.com:janaipakos/ghibliapi.git`

- Abra a pasta e instale as dependências
  ```cd ghibliapi/```
  ```npm i``` ou ```yarn```

- Inicie o projeto
  ```npm start```

## Iniciando a film-api

- Clone este repositório

- Crie um arquivo na raiz do projeto com o nome `.env`
- Copie o conteúdo do arquivo `.env.example` para o arquivo `.env` criado no passo anterior

- Abra a pasta e instale as dependências
  ```npm i``` ou ```yarn```

- Inicie o banco de dados com docker
  ```docker compose up --build -d```

- Inicie a aplicação
  ```yarn start:dev```

- Acesse a documentação através do path `/docs`
  ```http://localhost:4000/docs```
