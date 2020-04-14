---
title: As Maravilhas da Composição com React HOCs
date: "2019-11-02T15:46:00.284Z"
description: Criando seus próprios Higher Order Components com React
---

Olá, jovens gafanhotos! Vou trazer um pouco mais de conteúdo a respeito de React. Acredito que vai ajudar bastante, principalmente os iniciantes. E hoje, vou explicar um pouquinho sobre HOC (Higher-Order Component).

![https://cdn-images-1.medium.com/max/800/1*GLadRVRithwk8OI1g-j9NA.jpeg](https://cdn-images-1.medium.com/max/800/1*GLadRVRithwk8OI1g-j9NA.jpeg)


### O que são Higher-Order Components?

Em resumo, um HOC é uma função que recebe um componente e retorna outro componente. 😕
São como HOF (Higher-Order Functions), que é uma função que recebe outra função e retorna uma função (agora piorou) hehehe.

Eu sei, pode parecer estranho, mas vai fazer sentido.

HOCs são muito comuns em libs como Redux (connect), Relay (createFragmentContainer), Mobx (observer) e outros. Além de ser possível criar o seu próprio HOC (é claro 🍭)

Obs.: HOCs não são parte do React e sim um pattern para desenvolvimento utilizando composição e herança.

A principal proposta dos HOCs é o compartilhamento de funcionalidades comuns entre componentes sem duplicação de código, basicamente.

Com isso, é possível criar um componente que possui um estado interno para controlar os seus "filhos".

Imagine uma situação onde temos uma página que recebe notícias e que possui vários componentes. Onde a comunicação entre eles é feita via props. Só que cada componente possui a sua própria renderização e comportamento, e que dependem do componente pai para apresentar o conteúdo. Mas enquanto os dados do pai não terminaram o carregamento, os filhos não podem ser apresentados. Poderia ser adicionado um loader em cada componente até finalizar o carregamento dos dados. Isso vai funcionar, mas pode ser um problema na manutenção, sem contar na duplicidade do código. Não é algo que vai ficar bom, então definitivamente não é o que queremos.

### O que eu posso fazer com HOCs?
* Reúso de código, lógica e abstração;
* Controle de renderização;
* Abstração de estado e manipulação;
* Manipulação de props.

### Existem dois tipos de HOCs, são eles:

#### Proxy

São HOCs que passam propriedades para os seus filhos. Inclusive é o tipo que utilizei para criar o exemplo deste artigo.

`gist:3c643d1d57d3bd9d2e3dc803be2b4ad0`
<small>Referência: https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e</small>

Quando devo utilizar um proxy?

* Manipulação de propriedades
* Acessar a instância via referência
* Abstrair estado
* Encapsular um componente com outros elementos

#### Inheritance Inversion (Herança Inversa)

Este tipo de HOC estende a sua classe a partir do componente que lhe é enviado, tendo assim acesso a instância, estado, lifecycle, hooks e ao render props.

`gist:3709df5fc98a054f0431420b23ac651d`
<small>Referência: https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e</small>

Quando devo utilizar uma Herança Inversa?

* Render Hijacking
* Manipulação de estado

### Agora vamos criar o nosso HOC =D

Utilizei o create-react-app para facilitar a inicialização do projeto.

Não vou entrar em detalhes sobre como o create-react-app funciona e quando utilizá-lo, isso é assunto para um outro artigo. Mas a instalação e utilização dele é bem simples, como veremos abaixo.

Caso você possua npm 5.2+ é possível fazer a instalação da seguinte maneira:

```shell
npx create-react-app hoc-react-example
```

Se não tiver, você pode instalar conforme abaixo:
```shell
npm i -g create-react-app && create-react-app hoc-react-example
```

Logo após a instalação, execute o projeto:

Com NPM:
```shell
npm start
```

ou com YARN:
```shell
yarn start
```

Feito isto, uma aba do browser será aberta. **http://localhost:3000/**

Bom, como sou um apaixonado por cerveja, eu vou criar um HOC que "fabrica cerveja". Para isto deixei o projeto o mais simples possível, somente com alguns arquivos, e a estrutura ficou assim:

```
hoc-react-example
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│ ├── favicon.ico
│ ├── index.html
│ └── manifest.json
└── src
├── components
│ └── Cup.js
├── containers
 │ ├── Ale.js
 │ ├── Lager.js
 │ └── Wise.js
 ├── App.js
 ├── index.css
 ├── index.js
 ├── logo.svg
 └── serviceWorker.js
```

Onde `components` são os componentes do projeto e `containers` as <i>páginas</i>.

A página inicial que contém todos os HOCs ficou da seguinte forma:

`gist:ea3dda4f16cdd310962c9ae6d9a359c5`

Para que a nossa fábrica de cervejas funcione, eu fiz a criação de 3 tipos de cervejas, Ale, Wise e Lager. Elas são os containers (linhas 2, 3 e 4 do exemplo acima).


> Ignorem o css inline, fiz dessa forma porque não estou utilizando um pré-processador de css e também não quis criar uma folha de estilo para este caso, tendo em vista que é um exemplo bem rápido e o objetivo final é demonstrar a funcionalidade dos HOCs.

Para simular a criação das cervejas eu adicionei um `timeout`, que ao ser finalizado altera o estado de cada cerveja para `true` (linhas 14, 15, 16). Isso pode ser uma chamada de serviço, o resultado final é o mesmo. 
E o estado de cada cerveja é enviado via `props` (linhas 28, 29 e 30).

O conteúdo de cada cerveja ficou assim:

**./src/containers/Ale.js**

`gist:3080fc8c80947bccf95c87476a1007e9`
<small>Ale container</small>

**./src/containers/Wise.js**

`gist:9ceac0a2155799fae5cdc985499e48a8`
<small>Wise container</small>

**./src/containers/Lager.js**

`gist:f835a5d9830308d96dd0bd52c8d89343`
<small>Lager container</small>

Beleza, agora temos o nosso App com três cervejas prontas para serem produzidas.

Mas e o HOC?! 😐

Repare que na exportação de cada container existe uma função chamada `withDrink` enviando duas propriedades, que é o próprio container e a receita de cada cerveja. É justamente nesse ponto que a magia da abstração começa a acontecer, como veremos abaixo, com a criação do HOC que irá se encarregar de fabricar a cerveja.

**./src/hoc.js**

`gist:5854229e0a63de24c40d39d49cd564a5`
<small>HOC.js</small>

Pronto, agora temos o HOC criado =D

Como ele funciona?!

Linha 5 - criação de uma função que recebe um componente e a receita (aqui é apenas um objeto, pode ser qualquer parâmetro).

Linha 6 - criação de uma função que tem como parâmetro `props`.

Linha 9 - Lembra que em App.js, eu passei como `props` o parâmetro `completed`?! Dentro do método `withDrink` eu tenho todas as `props` que são enviadas para dentro de cada container no arquivo ./src/App.js.

Linha 11 - Retorno de um novo elemento.

Linha 12 - Adição de um Fragmento no React (pode ser feito de duas formas, importando `Fragment` do React ou simplesmente declarando igual na linha 11 e 31.

Linha 14 - Fiz uma validação para saber se a cerveja está pronta ou não. Enquanto o valor for `false` apresento a receita que é enviada por cada container e retorno um `loading`, para indicar que a cerveja está em processo de fabricação =D.

Assim que o timeout do App.js é finalizado para cada container, e o valor de `completed` é alterado para true, então o HOC retorna um novo `component` com todas as propriedades que lhe foram enviadas e um componente `cup`, que é a cerveja bem gelada sendo servida em um copo, para ser apreciada enquanto come alguns salgadinhos e assiste ao jogo do verdão! =D

E na linha 39 apenas retorno o HOC.

O resultado final ficou assim:

![HOC Beer](https://cdn-images-1.medium.com/max/800/1*J176Rw45Q5AC7wejw5o1uw.gif)

Lindo, não?! E bem simples!

#### O projeto completo se encontra no meu github: [HOC React Example](https://github.com/Tautorn/hoc-react-example)

Este exemplo é uma forma bem resumida da utilização de um HOC. O intuito é apenas demonstrar como é possível conectá-lo a outros componentes e fazer todo um reaproveitamento de código. Do jeito que foi criado eu tenho certeza que a receita de cada cerveja vai ser sempre apresentada (desde que recipe seja enviado, é claro) e o controle se ela foi concluída vai ser sempre o mesmo. Do contrário eu teria que copiar o código e enviar para cada container (Ale.js, Wise.js e Lager.js), o que dificultaria a manutenção do código e poderia gerar comportamentos diferentes em cada página. 

Com a utilização de um HOC todo o controle fica bem mais fácil.

#### Quando utilizar?

Bom, como já mencionado, HOCs são muito úteis para criar composição de componentes, tendo um grande reaproveitamento de código.

HOCs são muito comuns para proteção de rotas, validação de formulários, controle de carregamento, gerenciamento de estado e props e muito mais.
São muitos os casos em que podemos utilizar um HOC, mas faça isso se for necessário.
É muito comum querermos utilizar algo em um projeto para aprendizado, mas devemos sempre levar em consideração se o sistema realmente precisa dessa implementação.

### Dicas importantes
**Não crie mutações do componente original, use composição.**

HOCs não devem utilizar mutação, porque pode gerar vários problemas. Ao invés disso, se deve utilizar composição.

**Não use HOCs dentro de um método render.**

> "React usa a identidade do componente para determinar se deve atualizar a subárvore existente ou descartá-la e montar uma nova. Se o componente retornado da renderização for idêntico (===) ao componente da renderização anterior, o React atualizará recursivamente a subárvore, diferenciando-a com a nova. Se eles não forem iguais, a subárvore anterior será completamente desmontada." [React Docs](https://reactjs.org/docs/higher-order-components.html#dont-use-hocs-inside-the-render-method)

### Outra forma de criar um HOC - Enhanced-style HOCs
Esta é uma outra forma de criar um Higher Order Componente. Ele tem como principal característica o retorno de uma função, ao invés de um componente. Assim, o componente encapsulado é recebido na função que irá retorná-lo, não sendo necessário passar o componente como parâmetro. Isso pode tornar o código mais limpo.

Bibliotecas como **Relay** e **Redux** utilizam essa abordagem.

A vantagem disso é quando temos vários HOCs fazendo a chamada entre eles. Podemos utilizar a composição do React para poder compartilhar a lógica entre todos os componentes, podendo tornar o código eficiente e reaproveitável.

> Outra maneira de melhorar a utilização de HOCs é com [render props](https://reactjs.org/docs/render-props.html).

> Também recomendo que deem uma lida em [decorators patterns](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841).

Gostou do artigo? Então compartilhe e deixe suas palminhas (não menos que 50 hahaha 😚). Deixe o seu comentário logo abaixo, críticas construtivas são sempre bem vindas e vão me ajudar a trazer conteúdos cada vez melhores. 
Quer que eu escreva a respeito de algum tema? Então é só me deixar uma mensagem que vou falar a respeito :D
Estou sempre disposto a ajudar e para mim é um prazer poder trazer um pouco de conhecimento.

Espero ter ajudado, valeu e abraço!

**Referências:**
O component cup é a animação da cerveja sendo servida, retirei o CSS deste exemplo: [https://codepen.io/mikegolus/pen/jJzRwJ](https://codepen.io/mikegolus/pen/jJzRwJ)

Todo o conteúdo do copo e sua animação foi criada por [Mike Golus](https://codepen.io/mikegolus/)

https://reactjs.org/docs/higher-order-components.html

https://medium.com/reactbrasil/meu-primeiro-higher-order-component-a376efc654a8

https://blog.rocketseat.com.br/higher-order-components-hocs-no-react-e-react-native/

https://www.robinwieruch.de/gentle-introduction-higher-order-components/

https://blog.wgbn.com.br/react-higher-order-components-hocs-para-iniciantes-ae888120b50

https://medium.freecodecamp.org/how-to-develop-your-react-superpowers-with-the-hoc-pattern-61293651d59

https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e

https://eloquentjavascript.net/05_higher_order.html
