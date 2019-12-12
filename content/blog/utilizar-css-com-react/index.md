---
title: Como utilizar CSS com React
date: "2019-12-11T05:11:03.284Z"
description: Neste artigo falo sobre como utilizar CSS com React
---

Hello =D

Bom, neste post vou falar um pouco sobre como utilizar CSS com React.

Neste exemplo, vou utilizar a lib [create-react-app](https://github.com/facebook/create-react-app) para construir a base inicial do projeto.

Obs.: Todo o projeto você pode conferir no meu [github](https://github.com/Tautorn/using-css-with-reactjs)

Para começar, digite os comandos abaixo:

```shell
npx create-react-app using-css-with-reactjs
cd using-css-with-reactjs
npm start

```

Será criada a seguinte estrutura:

```shell
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

Mantenha a estrutura de arquivos da seguinte maneira:


```shell
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.js
    ├── index.js
```

> App.js

```
import React from 'react';

function App() {
  return (
    <div>
      Hello =D
    </div>
  );
}

export default App;

```

> index.js

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'))
```

Agora execute `npm run start` para subir a aplicação =D

Certo, uma aba do seu navegador irá abrir com a aplicação sendo executada. 
`http://localhost:3000/`

Tudo certo, agora vamos ao que interessa, CSS in JS \o/

Vou demonstrar como criar uma página de login do Spotify.

Primeiro, vou montar a estrutura HTML do nosso JSX

`gist:974518027e432bbed6ba0f77df2fc990`

Ficando desta maneira: 
<br />
<span style="display:block;text-align:center">![init](https://res.cloudinary.com/tautorn-com-br/image/upload/v1576148723/utilizar-css-com-react/init-01_t8x9o1.png)</span>

Obs.: Deixei bem simples, para poder criar uma estrutura e aplicar o estilo na página. Deixei inclusive os links sem href, é só um exemplo ;)

Blz, agora, é o momento de darmos vida à página \o/ 
Yuhuuuuuuuu

> Mas como fazer isso!? Já sei, INLINE!!!!!
```html
  <div style={{ width:'30px', color: 'red' }}>
```
![badass](https://res.cloudinary.com/tautorn-com-br/image/upload/v1576148723/utilizar-css-com-react/badass_gjvzvi.png)

Nãaao, jovens gafanhotos!! Nunca faça inline, mantenha sempre um código conciso, de fácil manutenção e previsibilidade. As boas práticas vão continuar, não importa o ano ou as ferramentas que serão utilizadas.

Já imaginaram a "tripa" que viraria!? Sem contar no trabalho que seria giganteeeesco, fora a quantidade de bugs e a total despadronização do código.

E ainda a renderização inline é mais lenta do que utilizar classes.

Tá... blz, e agora, como aplicar o meu maravilhoso CSS com React? 

Vamos criar as boas e "velhas" classes! CSS Stylesheet =P

![explosion mind](https://res.cloudinary.com/tautorn-com-br/image/upload/v1576148723/utilizar-css-com-react/explosion-mind_yx02fo.png)

Só que o React utiliza a nomenclatura `className` para utilizar uma classe em um componente. Exemplo:

```jsx
<span className="button-link">Cadê o onclick!?</span>
```

Então para estilizar a página de login eu vou simplesmente criar um arquivo **.css** e fazer a chamada no **App.js**

O `src/App.js` ficou assim:

```jsx
import React from 'react';
import Logo from './logo.png';
import './style.css';
```

E o `style.css` (criei na raíz do `src`) ficou assim:

```css
html, body {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background:#2E3034;
}
```

Basta criar os arquivos, salvar e ver a página sendo alterada ;D. Tudo o que for escrito no seu arquivo CSS vai funcionar normalmente dentro dos arquivos JS.

> Importante, essa abordagem funciona "magicamente" porque utilizei o `create-react-app` para montar toda a estrutura do projeto e por padrão o compilador do código já vem todo configurado, que no caso é o [`webpack`](https://webpack.js.org/), que é um module bundler e faz todo o "trabalho sujo" pra gente, não apenas de css, são várias outras coisas (dariam outro artigo hehehe) ;D 

> Se por acaso você preferir configurá-lo manualmente você vai precisar adicionar o [`css-loader`](https://github.com/webpack-contrib/css-loader) para que os arquivos css sejam chamados dentro dos seus arquivos JS.

> Existem outros modules bundlers também, como o [Rollup](https://rollupjs.org/guide/en/) e o [Parcel](https://parceljs.org/), cada um tem suas características e se adequam melhor a cada cenário.

Blz, agora voltando ao css :P

Adicionei algumas classes no arquivo `src/style.css`, ficando desta maneira: 

`gist:b8dce84b5063694d45de33ab15b2b718`

Reparem que a criação do CSS continua a mesma, nada mudou. 

Agora, basta alterar o App.js, adicionando as classes conforme abaixo:

`gist:1b397f84e176f291d3b4b48bfcbde3b6`

Salve os arquivos e veja o resultado na sua página, ficou lindo, não!? =D

<span style="display:block;text-align:center">![login](https://res.cloudinary.com/tautorn-com-br/image/upload/v1576148723/utilizar-css-com-react/login_gn67os.png)</span>

> O conteúdo está no meu [using-css-with-reactjs](https://github.com/Tautorn/using-css-with-reactjs)


É bem simples a utilização de CSS com React, mas essa não é a única maneira. É muito comum classes dependerem de `props` ou `state` da página.
Exemplo:

```jsx
render() {
  let className = 'menu';
  if (this.props.isActive) {
    className += ' menu-active';
  }
  return <span className={className}>Menu</span>
}
```
Referência: [react](https://pt-br.reactjs.org/docs/faq-styling.html)

No exemplo acima a `classe` atribuída muda de acordo com o estado do menu, podendo estar ativo `isActive` ou não. 
Isso é muito utilizado para fazer alterações nos elementos, lembrando que o React funciona de forma **declarativa**.

## Contatenação de classes
Caso precise adicionar uma classe que é alterada (igual foi feito com o `menu-active`) a um elemento que já possui estilo é possível fazer assim:
```jsx
<span className={`menu ${className}`}>
```

Utilizei `template-string` pra facilitar a "concatenação" dos estilos, bem simples ;D

## Pré-processadores de CSS
Bom, SASS e LESS são muito utilizados para ajudar a criar CSS. Auxiliam no reúso de código, manutenção, efeitos e muito mais.

Mas como utilizar SASS com React? "Não" é possível. 

### É importante lembrar que **ReactJS** é uma BIBLIOTECA para criação de UI.

Caso queira utilizar SASS no seu projeto vai ser preciso configurar um plugin no seu bundler-size ou no CRA.
Caso queira fazer um teste com CRA: [usando-sass-com-create-react-app-sem-ject](https://medium.com/tableless/usando-sass-com-create-react-app-sem-eject-56686c7f4e77)

## Styled-components
Existe outra maneira de criar CSS, que é com bibliotecas que permitem usar código CSS para estilizar seus components, como é o caso do [styled-components](https://www.styled-components.com/)

Essa é a maneira que mais gosto de utilizar css para estilizar meus componentes. A escrita do CSS continua a mesma, inclusive é possível utilizar SASS \o/, já vem no "pacote" yuhuuuuu.

Escrevi dois artigos a respeito de styled-components:

* [o-basico-de-styled-components](https://tautorn.com.br/o-basico-de-styled-components/)

* [styled-components-parte-1-3](https://tautorn.com.br/styled-components-parte-1-3)


Bom, por hoje é isso. Espero que este artigo possa lhe ajudar.
Cadastre na minha news letter para receber conteúdo atualizado.
Também deixe seu comentário com sua opnião para que eu possa sempre melhorar o conteúdo.

E que ta melhorar o formulário? Adicionar validações, enviar para api do Spotify, tem muita coisa para ser feitao ;D

Abraço e até mais!


**Fontes:**

* [faq-styling.html)](https://pt-br.reactjs.org/docs/faq-styling.html)

* [usando-sass-com-create-react-app-sem-ject](https://medium.com/tableless/usando-sass-com-create-react-app-sem-eject-56686c7f4e77)

* [4-four-ways-to-style-react-components](https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822)

* [github/using-css-with-reactjs](https://github.com/Tautorn/using-css-with-reactjs)
