O projeto foi contruido em TypeScript com Node 20.11.0 e NPM 10.2.4

Primeiro instale as dependências

## Instalação

```bash

npm install

```

## Execute em modo desenvolvimento

Se você não tiver definido PORT no .env, então será http://localhost:7777

```bash

npm run start:dev

```

## Execute em modo produção

O modo produção faz o build e executa (Porta padrão 7777)

Se você não tiver definido PORT no .env, então será http://localhost:7777

```bash

npm run start:prod

```

![Swagger](documentation/printscreen/swagger.png)

## Resultado

O resultado da http://localhost:7777/process-orders fica salvo em assets/result.txt

![Resultado](documentation/printscreen/result.png)