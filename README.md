
# Desafio Final do Processo de Estágio Pitang 2024

Esta API faz parte da solucação para o desafio final do processo de estágio da Pitang 2024, seu objetvo é gerenciar agendamentos, permitindo criar, ler e atualizar. A API é construída usando Node.js e Prisma, com suporte para um banco de dados relacional como PostgreSQL, MySQL, ou SQLite.


## Funcionalidades


- Agendamento: Permite que os usuários agendem horários com as seguintes restrições:
  - Máximo de 2 agendamentos por hora.
  - Intervalo mínimo de 1 hora entre agendamentos.
  - Limite de 20 agendamentos por dia.

- Consulta de Horários: Permite a visualização da listagem de todos os agendamentos feitos, agrupados por dia e hora.
  - Permite informir se o agendamento foi realizado ou não.
  - Permite detalhar conclusão do atendimento (se foi realizado).


## Instalação

Clone o repositório:

```bash
  git clone
  cd desafio-pitang-api
```
Instale as dependências:

```bash
  npm install 
  #ou
  yarn install

```



    
## Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto e adicione suas variáveis de ambiente. Use o arquivo .env.example como referência se disponível.

Exemplo para um banco de dados SQLite:

```bash
DATABASE_URL="file:./dev.db"
```

- Configurar o Banco de Dados

```
npx prisma migrate dev
#ou
yarn prisma migrate dev
```



## Uso

Para iniciar a aplicação, use o comando:
```
npm start
#ou
yarn start

```
## Testes

Para rodar os testes, use o comando:

```
yarn test
#ou
npm test

```
