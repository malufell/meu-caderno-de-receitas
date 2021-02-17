<p align="left">
  <img src="https://img.shields.io/github/deployments/malufell/meu-caderno-de-receitas/meu-caderno-de-receitas"/>
  <img src="https://img.shields.io/github/issues/malufell/meu-caderno-de-receitas?style=flat-square"/>
  <img src="https://img.shields.io/github/last-commit/malufell/meu-caderno-de-receitas"/>
</p>

### :wave: Bem vindo ao projeto Meu Caderno de Receitas! 

Olá! Eu sou a Malu e este é o meu primeiro projeto autoral, onde coloco em prática o que estou estudando em programação!

Meu projeto já está no ar! Veja o resultado: http://www.meucadernodereceitas.net/

"Meu caderno de receitas": uma aplicação web para registro e gestão de receitas culinárias. Inspirado nos costumes antigos, onde um caderno na cozinha continha as relíquias gastronômicas da família. 

Aproveite e cadastre-se para organizar suas receitas! :smile:

---

### :computer: Sobre o projeto:

Estou utilizando até o momento: node.js, sequelize, postgres, EJS e bootstrap!

Algumas das diversas bibliotecas do node.js que estou utilizando: bcrypt, body-parser, cloudinary, connect-flash, dotenv, express, method-override, multer, multer-storage-cloudinary, nodemon, passport, uuid.

<details>
<summary>Saiba como executar o projeto</summary>

<br>

Como pré-requisito, é necessário ter o [Node.js](https://nodejs.org/en/) e o [Postgres](https://www.postgresql.org/) instalados no PC.

1. No terminal, clonar o projeto: `git clone https://github.com/malufell/meu-caderno-de-receitas.git`
2. Entrar na pasta do projeto: `cd meu-caderno-de-receitas`
3. Instalar as dependências: `npm install`
4. Configurar o postgres: no arquivo `config.json` da pasta "config" é necessário atualizar as informações abaixo conforme o postgres instalado no seu PC
```javascript
{
  "development": {
    "username": "postgres",
    "password": "admin",
    "database": "tutorial",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```
5. Rodar a migração do Sequelize para criar as tabelas no banco de dados: `npx sequelize-cli db:migrate`
6. Rodar a aplicação: `npm start`

</details>

<details>
<summary>Veja as funcionalidades</summary>
<br>

- Usuário realiza um cadastro com e-mail e senha e é redirecionado para a página de Login (a senha é criptografada antes de ser armazenada no banco de dados );
- Ao passar pelo processo de autenticação, o usuário é redirecionado para página com o seu Caderno de Receitas, onde visualiza os cards com o nome e a imagem das receitas cadastradas;
- Na página do Caderno de Receitas é possível ordenar as informações de diferentes formas: data de inclusão, data de atualização e ordem alfabética. Também há um campo de busca, que localiza as receitas pelo nome e é possível filtrar por categoria!
- É possível cadastrar uma nova receita através de duas formas:
  - a mais simples: através de até duas fotos do texto da receita (para os casos onde o usuário possui receitas anotadas e/ou um caderno físico e deseja backup);
  - preenchendo um formulário, que além das informações da receita (lista de ingredientes, modo de preparo, dicas) permite a inclusão de até duas imagens e a inclusão de link do youtube com o vídeo da receita;
  - ambas as formas de cadastro permitem a seleção de categorias para receita, ex.: lowcarb, vegetariana, doce, salgado, FIT e etc. Além disso, apenas nome e categoria são informações obrigatórias para um cadastro.
- Ao visualizar uma receita cadastrada, é possível assistir ao vídeo do youtube caso tenha sido cadastrado, junto com as demais informações inseridas pelo usuário;
- O usuário também pode realizar a edição e exclusão da receita;
- As informações são privadas, portanto somente o próprio usuário visualiza as suas receitas.

<br>
:pushpin: Ah! tenho várias ideias para deixar este projeto ainda mais legal e completo! A lista pode ser [consultada aqui.](https://github.com/malufell/meu-caderno-de-receitas/issues)!

</details>

---

### :books: Meu processo de aprendizado

Meu foco nesse projeto é aprimorar a minha capacidade de aprendizado, pesquisa e resolução de problemas. Gosto de escrever e aprendo melhor quando tento explicar o conteúdo para alguém, por isso compartilho alguns registros com base no que aprendi!

Meus textos estão [aqui na wiki](https://github.com/malufell/meu-caderno-de-receitas/wiki) e nestes links também:

- [Métodos build e create em tabela many-to-many](https://github.com/malufell/meu-caderno-de-receitas/wiki/d.-Create-em-tabela-many-to-many,-com-upload-de-imagem-e-inclus%C3%A3o-de-v%C3%ADdeo-do-youtube)
- [Como criar relacionamentos entre tabelas - Sequelize (many-to-many e one-to-many)](https://github.com/malufell/meu-caderno-de-receitas/wiki/c.-Tabelas-com-relacionamentos-many-to-many-e-one-to-many)
- [Criando índice no modelo (sequelize e postgres)](https://github.com/malufell/meu-caderno-de-receitas/wiki/b.-Criando-%C3%ADndice-no-modelo-(sequelize-e-postgres))
- [Ajustando os tipos de dados e limite de caracteres no modelo Sequelize](https://github.com/malufell/meu-caderno-de-receitas/wiki/a.-Atualizando-um-modelo-Sequelize)
- [Como implementei o método de busca (sequelize)!](https://github.com/malufell/meu-caderno-de-receitas/wiki/9.-Implementando-o-m%C3%A9todo-de-busca) 
- [Como implementei o cadastro de usuários com validação de dados no back-end (com sequelize)!](https://github.com/malufell/meu-caderno-de-receitas/wiki/8.-Cadastro-de-usu%C3%A1rios-com-valida%C3%A7%C3%A3o-de-dados-no-back-end)
- [Autenticação de usuários com passport e express-session](https://github.com/malufell/autenticacao-com-passport-express-session) :heart: 
- [Interagindo com o usuário - método POST e findOne (sequelize)](https://github.com/malufell/meu-caderno-de-receitas/wiki/6.-Interagindo-com-o-usu%C3%A1rio,-POST-e-findOne)
- [EJS e Sequelize juntos!](https://github.com/malufell/meu-caderno-de-receitas/wiki/5.-EJS-e-Sequelize-juntos)
- [Configurações para uso do Sequelize com o PostgreSQL](https://github.com/malufell/meu-caderno-de-receitas/wiki/4.-Sequelize-com-PostgreSQL)
- [Meus primeiros passos com EJS](https://github.com/malufell/meu-caderno-de-receitas/wiki/3.-Primeiros-passos-com-EJS)
- [Como criei minha página "em breve" com bootstrap e coloquei no ar com github](https://github.com/malufell/meu-caderno-de-receitas/wiki/2.-Cria%C3%A7%C3%A3o-da-p%C3%A1gina-tempor%C3%A1ria-%22em-breve%22)
- [Definindo o caminho do meu projeto: análise de negócio, análise técnica, wireframe](https://github.com/malufell/meu-caderno-de-receitas/wiki/1.-Definindo-o-caminho)

---

### O que está em andamento

Neste momento estou refatorando o meu código, para deixar cada coisa no seu devido lugar! Também estou escrevendo novos textos para registrar as coisas mais interessantes que aprendi :nerd_face:

![gif](https://media.giphy.com/media/10FwycrnAkpshW/giphy.gif)
