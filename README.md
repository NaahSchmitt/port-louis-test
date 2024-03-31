# API Teste Técnico Port Louis - Back end

O projeto foi desenvolvido utilizando TypeScript, Node.js na versão **20.11.0** e NPM na versão **10.2.4**. Ele segue uma arquitetura baseada no conceito de Hexagonal Architecture (Arquitetura Hexagonal) como referência.

## Sobre

O `package.json` contém dependências essenciais: 

-  **dotenv**: Utilizado para facilitar o gerenciamento de variáveis de ambiente.

-  **express**: Auxilia na execução da API REST.

-  **swagger**: Facilita a visualização e documentação das rotas da API REST.

-  **typescript**: Essencial para um desenvolvimento mais organizado, trazendo benefícios como tipagem estática e melhor manutenibilidade do código

## Opcional

A porta padrão para executar o projeto é a **7777**. No entanto, se desejar alterá-la, você pode simplesmente criar uma cópia do arquivo `.env.example` com nome `.env` e definir o valor de sua preferência para a variável `PORT`.

```bash

cp .env.example .env

```

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