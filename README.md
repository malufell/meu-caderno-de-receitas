http://www.meucadernodereceitas.net

# Como criei minha página "em breve" com bootstrap e coloquei no ar com github

A ideia era colocar uma página no ar para ter o gostinho de que o projeto começou, mas sem perder muito tempo, já que é uma página temporária.

**Conteúdo**

1. [Domínio personalizado](#1-domínio-personalizado-computer)
2. [Buscando inspiração](#2-buscando-inspiração-heart_eyes)
3. [Configuração da Página](#3-configuração-da-página-wrench)
4. [Configuração do gh-pages no github](#4-configuração-do-gh-pages-no-github-wrench)
 
 
---

### 1. Domínio personalizado :computer:
Para ter uma experiência completa em meu primeiro projeto, optei por uma URL personalizada, que foi comprada através do [Super domínios](https://superdominios.org/). 
Existe o valor do primeiro pagamento e o "Valor Reincidente", pois a aquisição tem validade de um ano e depois deve ser renovada de acordo com o valor reincidente (este é o ponto de atenção para observar na compra).

Obs.: poderia ter utilizado o domínio do github mesmo, o endereço ficaria assim: [https://username.github.io](https://pages.github.com/).

---

### 2. Buscando inspiração :heart_eyes:

Uma busca por "coming soon template" no Google retornou uma infinidade de opções para inspiração 😵

Neste momento quero aprender bootstrap, então espiei na página de [exemplos](https://getbootstrap.com/docs/4.5/examples/) se existiria algum modelo legal e escolhi o [Cover](https://getbootstrap.com/docs/4.5/examples/cover/).  Existem diversos modelos do bootstrap para [download](https://getbootstrap.com/docs/4.5/examples/). Estes modelos não são um template fixo e sim um ótimo ponto de partida para o projeto.

O template que eu escolhi possui um fundo preto e bonito, mas eu acredito que a imagem de fundo é o que faz toda diferença, então dediquei um tempo para encontrar uma imagem que ficasse agradável 😍
 
Gosto de utilizar o site [Unsplash](https://unsplash.com/) para busca de imagens. Como [informado](https://unsplash.com/license) no próprio site:

- *All photos can be downloaded and used for free*
- *Commercial and non-commercial purposes*
- *No permission needed*

---

### 3. Configuração da Página :wrench:

O template do bootstrap vem com um arquivo HTML e um CSS (index.html e  cover.css) e as instruções sobre como iniciar o uso do bootstrap constam na [documentação](https://getbootstrap.com/docs/4.5/getting-started/introduction/).

A construção foi simples e realizada basicamente em 5 etapas:

**3.1 alterei o texto no HTML:**

Isto é autoexplicativo :stuck_out_tongue_winking_eye: 

<br>

**3.2 adicionei no HTML os links de referência aos arquivos do bootstrap (CSS e JS):**

**CSS**: *"Copy-paste the stylesheet <link> into your <head> before all other stylesheets to load our CSS."*
  
```javascript
<linkrel="stylesheet"href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
```

**JS**: *"Place one of the following `<scripts>` near the end of your pages, right before the closing `</body>` tag, to enable them. jQuery must come first, then Popper.js, and then our JavaScript plugins."*

```javascript
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
      integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
      crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
      integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
      crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
      integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
      crossorigin="anonymous"></script>
```

Estes links tratam-se do Bootstrap CDN, que inicialmente eu não sabia exatamente o que era!

> *"BootstrapCDN é uma rede pública de entrega de conteúdo. Ele permite que os usuários carreguem CSS, JavaScript e imagens remotamente de seus servidores. Utilizado por mais de 7,9 milhões de sites em todo o mundo, o BootstrapCDN atende a mais de 70 bilhões de solicitações por mês."* 

Obs.: outra possibilidade seria baixar os arquivos com o código fonte para não depender de links externos.

<br>

**3.3 limpei tudo o que não seria utilizado:** 

O bootstrap trabalha com classes prontas e em cada uma delas há um estilo atrelado. Eu optei por excluir alguns elementos do HTML que não seriam interessantes para mim e deixei no CSS somente as classes realmente utilizadas.

Arquivo `index.html`:

```html
<!doctype html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Meu caderno de receitas</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/cover.css" rel="stylesheet">
  </head>
  <body class="text-center">
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      
      <main role="main" class="inner cover">
        <h1 class="cover-heading">Em construção :]</h1>
        <p class="lead">Olá! Eu sou a Malu e estou em um processo de transição de carreira para TI! Este é o meu projeto,
          onde irei praticar o que estou estudando: JavaScript, HTML, CSS, Bootstrap, SQL, Node.js, Sequelize e por aí
          vai... \o/ </p>
        <p class="lead">
          <a href="https://github.com/malufell/" class="btn btn-lg btn-secondary">Veja o andamento no meu github!</a>
        </p>
      </main>
      <footer class="mastfoot mt-auto">
        <div class="inner">
          <p>Provavelmente eu estou estudando enquanto você lê isto. Contate-me para envio de mensagens motivacionais :P -
            ou apenas enviar um oi: <span class="contato">malufell@hotmail.com</span>.</p>
        </div>
      </footer>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
      integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
      crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
      integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
      crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
      integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
      crossorigin="anonymous"></script>
  </body>
</html>
```

Arquivo `cover.CSS` (apenas limpei as classes não utilizadas no HTML):

```css
a,
a:focus,
a:hover {
  color: #fff;
}
.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus {
  color: #333;
  text-shadow: none;
  background-color: #fff;
  border: .05rem solid #fff;
}
html,
body {
  height: 100%;
}
body {
  display: -ms-flexbox;
  display: flex;
  color: #fff;
  text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
}
.cover-container {
  max-width: 42em;
}
.cover {
  padding: 0 1.5rem;
}
.cover .btn-lg {
  padding: .75rem 1.25rem;
  font-weight: 700;
}
.mastfoot {
  color: rgba(255, 255, 255);
}
```

**3.4 incluí a imagem de fundo:**

Bem simples, só adicionei uma pasta "images" no diretório com a imagem. No HTML não coloquei nenhuma referência de `<img>`, pois como ela teria que cobrir  a tela, foi configurada como background (próximo tópico). 

![imagem-fundo](https://user-images.githubusercontent.com/62160705/98548263-0af23f00-2278-11eb-8c33-d5cb3493226b.png)

<br>

**3.5 criei um arquivo `style.css` para uma breve configuração personalizada:**

Apesar do Bootstrap possuir uma grande quantidade de recursos, é possível implementar configurações adicionais utilizando o CSS. 

Uma boa forma de trabalhar adicionando configurações no CSS é criando nosso próprio arquivo `style.css`, para declarar nele as propriedades desejadas para o elemento e "chamar" elas através de um seletor semântico - ou seja, damos ao seletor (normalmente uma classe) um nome facilmente identificável. 

Obs.: não é uma boa prática utilizar classes já existentes do bootstrap pra sobrescrever elas no meu arquivo de CSS.

As alterações que eu fiz basicamente se resumem a mudar algumas cores, margens e configurar a imagem como background. A configuração da imagem como background foi onde mais "sofri", mas após um tempo de stackoverflow, tudo se resolveu 😄 

Arquivo `style.css`:

```css
body {
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
  background-color: black;
}
body::after {
  content: "";
  background: url('../images/fundo.png');
  opacity: 0.5;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;   
}
.lead {
  font-weight: 400;
  margin-top: 8%;
}
.cover-heading {
  margin-top: 30%;
}
.contato { 
    color: rgb(255, 255, 255); 
    font-weight: 600; 
  }
```

Pronto! A base da página está pronta 😄 

---

### 4. Configuração do gh-pages no github :wrench:

Hora de colocar no ar, com o apoio do GitHub ❤️

Como pode ser lido nos excelentes [guias do GitHub](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/about-github-pages):
*"O GitHub Pages é um serviço de hospedagem de sites estáticos que obtém arquivos HTML, CSS e JavaScript diretamente de um repositório no GitHub, opcionalmente executa os arquivos por meio de um processo de construção e publica um site. **Você pode hospedar seu site no github.io - domínio do GitHub - ou em seu próprio domínio personalizado."***

Então, colocar uma página no ar pode ser muito mais fácil do que uma iniciante (eu o/) poderia imaginar! Eu segui estes tutoriais: ["Criação de um site de páginas GitHub"](https://docs.github.com/en/free-pro-team@latest/github/working-with-github-pages/creating-a-github-pages-site) e ["Gerenciar um domínio personalizado do seu site do GitHub Pages"](https://docs.github.com/pt/free-pro-team@latest/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain).

O processo aconteceu basicamente em 3 etapas:

**4.1 criação de um repositório público, que conterá os arquivos base para a página:**

<br>

![repositorio](https://user-images.githubusercontent.com/62160705/98548824-bf8c6080-2278-11eb-95ab-714549486488.png)
   
<br>
  
**4.2 configuração da base da página no gh-pages - onde também fiz o direcionamento para o meu domínio personalizado:**

<br>

![base_gh_pages](https://user-images.githubusercontent.com/62160705/98548833-c31fe780-2278-11eb-887c-ddbef9e72331.png)


Em "Source" eu selecionei a branch "gh-pages", ela foi criada por mim para conter os arquivos da página temporária, visto que na branch "master" estarão os arquivos da aplicação que estou desenvolvendo 😄 

<br>

**4.3 configuração do domínio no [Superdomínios](https://www.superdominios.org/):**

Foi onde eu criei um registro apontando o meu domínio para o GitHub.

(o gh-pages aponta para o meu domínio, e o meu domínio aponta para o gh-pages :point_right: :point_left:)

![superdominios](https://user-images.githubusercontent.com/62160705/98548840-c4e9ab00-2278-11eb-811c-ebf79a5261e5.png)

-----

### Enfim o desfecho :star2:

![pagina_no_ar](https://user-images.githubusercontent.com/62160705/98548852-c6b36e80-2278-11eb-9a47-10befe76066d.png)

-----

### Onde senti dificuldade :punch:

Lembrando pra mim mesma que sou iniciante :sweat_smile: 

- configurar a imagem de fundo da página como background: tive que investir um tempinho buscando referências, tentei diversas opções que não funcionaram, até chegar nessa solução mostrada acima em `style.css`;
- configurar meu domínio: os tutoriais do github são muito bons, mas eu fiquei na dúvida sobre qual das duas configurações deveria ser (subdomínio ou apex). Ainda bem que existe a página [Solução de Problemas](https://docs.github.com/pt/free-pro-team@latest/github/working-with-github-pages/troubleshooting-custom-domains-and-github-pages#cname-errors) e no final tudo funcionou certinho o/

-----
PS: esse é o meu primeiro texto sobre programação!

![high_five_stephen_colbert](https://user-images.githubusercontent.com/62160705/98553400-560f5080-227e-11eb-9a1d-4c59457ba40a.gif)







