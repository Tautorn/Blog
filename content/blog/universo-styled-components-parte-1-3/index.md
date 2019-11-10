---
title: Universo Styled Components — Parte 1/3
date: "2017-11-28T00:00:00.284Z"
description: Universo Styled Components — Parte 1/3
---

# Universo Styled Components — Parte 1/3

Faaala jovens gafanhotos, como comentei em outro artigo, hoje vou me aprofundar um pouco mais nessa maravilhosa lib que é o Styled Components. 
Vou dividir esta matéria em três artigos, sendo que neste abordarei um pouco sobre as features do styled, no segundo falarei sobre testes (não leve em conta esta ordem na hora de criar uma aplicação) e no último, explicarei sobre boas práticas de desenvolvimento (voltado pra style componentes, é claro).

Vamos para a primeira parte, Styled Components :)

![](https://cdn-images-1.medium.com/max/2000/1*N0XV3gco7Ed4brMoxwdjVg.png)

Round 1 — Fight!

### **Instalação**

    npm install --save styled-components

Mais fácil que painel de Jeep.

Styled componentes cria marcadores literais para estilizar o seu componente, isto significa que estamos definindo nosso style e em consequência disso criando nosso componente React, isso é lindo :)

À grosso modo, é uma lib que utiliza o poder do CSS com JS para a criação de componentes primitivos em React!

Elementos primitivos:
> </h1>, </span>, </form>, </input>

Exemplo de componente criado:

<iframe src="https://medium.com/media/fadb826b6d11c1794a20ee560c11138e" frameborder=0></iframe>

Depois é só fazer o import e utilizar o component

<Button />, <Icon />, <Modal opened size="500px" />

Simples, não!?

### Props

Agora que a “magia” começa… É possível passar todas as props de componentes React para dentro do styled \o/. É JS, lembra!? ;)

Segue um exemplo:

<iframe src="https://medium.com/media/be0fc4b58407e5496973c6c6cd2e0af6" frameborder=0></iframe>

**Qual é a vantagem disso?**

Você simplesmente tem todo o poder do JS nas suas mãos, podendo criar funções, condições, realizar merge de propriedades, utilizar defaultProps, propTypes e habilitar o lint do próprio [styled](https://www.styled-components.com/docs/tooling#stylelint) :) .Tudo o que o JS oferece em seu CSS, unindo o poder de ambos.

Outra coisa muito boa é a diminuição de código, antes era necessário criar inúmeras classes mudando pouca coisa, isso acontecia muito com variações de cor, era terrível. Um exemplo bem simples é a criação de um botão com variações, se o time de desenvolvimento não estiver bem alinhado podemos ter situações bastante peculiares, como abaixo:

<iframe src="https://medium.com/media/2c2128523e2e40cf59c0e75572b303a3" frameborder=0></iframe>

Isso pode ser evitado, basta passar props, realizando todo o controle e criando as variações necessárias. Com isso temos um *bundle* menor e uma lógica clara do que o componente faz.

Imagine projetos de médio e grande porte, com equipes multidisciplinares, a criação e manutenção do CSS podem tornar-se bastante complexas.

*Co-creator Max Stoiber says:*
> # **The basic idea of styled-components is to enforce best practices by removing the mapping between styles and components.**

### Criando componentes

Como já citei acima, é possível criar componentes primitivos, informando todas as props do html, como onClick, id, name, etc…

Para criar um componente, basta importar o styled e informar o componente que será criado, exemplo:

* **input**

    import styled from 'styled-components'

    export const Input = styled.input`
      // code
    `

* **div**

    import styled from 'styled-components'

    export const Wrapper = styled.div`
      // code
    `

Easy ;)

### Tema

A criação de tema é uma das coisas que eu acho mais incrível, eu posso passar um tema e todos os elementos filhos vão receber esta propriedade. O styled componente possui full suporte de tema exportando oThemeProvider, permitindo multi levels de profundidade.

Segue abaixo um exemplo que eu tirei do próprio site do [styled componente](https://www.styled-components.com/docs/advanced#theming) onde está sendo criado um botão com as props de tema vindo do ThemeProvider:

<iframe src="https://medium.com/media/71244862dc9a18d58376e0ba7f4efb2a" frameborder=0></iframe>

Também é possível passar as propriedades de forma contextual, como funções. Estas funções vão receber o tema pai, um outro ThemeProvider, que está acima no contexto da árvore.

O exemplo abaixo renderiza um botão estilizado e um segundo invertendo as cores. A função inverte o tema recebido, criando um novo botão, o exemplo também é do [site](https://www.styled-components.com/docs/advanced#theming) oficial:

<iframe src="https://medium.com/media/f781ec672cb72a0a11eebe4bdfabe3d1" frameborder=0></iframe>

**Tema com HOC**

Se necessário, também é possível utilizar o tema com HOC (higher order component), sem a necessidade do styled, exemplo retirado do [site](https://www.styled-components.com/docs/advanced#theming):

<iframe src="https://medium.com/media/2de722b0b4f4a7ce56cb602c184a3da1" frameborder=0></iframe>

Esse é melhor aproveitado em grandes componentes ;). Realmente repense a necessidade desta abordagem.

**A props THEME**

O tema também pode ser passado utilizando a prop theme

Isto pode ser feito nos casos em que não existir o ThemeProvider, conforme abaixo:

<iframe src="https://medium.com/media/5a5454f269dcad89c68e9f9f846de218" frameborder=0></iframe>

### Helpers

Helpers, como o próprio nome diz, são ajudas para melhorar o desenvolvimento do seu CSS, alguns existentes no styled componente:

* CSS

* Keyframes

* injectGlobal

* witheme

Eles são muito importantes e bastante utilizados, como é o caso do css, onde é possível criar um template literal utilizando interpolação, exemplo:

<iframe src="https://medium.com/media/3966486e4e8a0ed1f6d00bf2b28280ea" frameborder=0></iframe>

Para ver os demais, [clique aqui ;)](https://www.styled-components.com/docs/api#helpers)

### Suporte a CSS

Bom, deixei o suporte para o final porque acredito que muitos que estão iniciando com styled component tem essa dúvida “e o suporte ao css”?

Caaalma jovens gafanhotos, o suporte continua o mesmo, é tudo CSS, *bunitin!*

Logo, todas as features que possuem no CSS também existem no styled componente, uma vez que é criado uma folha de estilo e não um css inline.

Segue nota da equipe de desenvolvimento quanto a esse assunto:
> # Within a styled component, we support all of CSS plus nesting. Since we generate an actual stylesheet and not inline styles, whatever works in CSS works in styled-components!

Bom, falei mais um pouco a respeito desta poderosa ferramenta que é o Styled Component, abordando algumas de suas features e criação de componentes, bem como seu comportamento.

Agora, como havia prometido, no próximo artigo da trilha de Styled Component eu irei falar sobre testes!

Ah… Antes de terminar esta parte, eu só quero deixar uma *dica, *é possível criar e utilizar os mesmos componentes no [REACT NATIVE](https://www.styled-components.com/docs/basics#react-native)! Mas esse é assunto para outro artigo…

**Fontes:**

* [https://www.styled-components.com/](https://www.styled-components.com/)

* [https://github.com/styled-components/jest-styled-components](https://github.com/styled-components/jest-styled-components)

* [https://github.com/styled-components/styled-components](https://github.com/styled-components/styled-components)

* [https://medium.com/styled-components/announcing-primitives-support-for-truly-universal-component-systems-5772c7d14bc7
](https://medium.com/styled-components/announcing-primitives-support-for-truly-universal-component-systems-5772c7d14bc7)[https://medium.freecodecamp.org/a-5-minute-intro-to-styled-components-41f40eb7cd55](https://medium.freecodecamp.org/a-5-minute-intro-to-styled-components-41f40eb7cd55)

* [https://medium.com/dipeex/styled-components-544112ae367e](https://medium.com/dipeex/styled-components-544112ae367e)
