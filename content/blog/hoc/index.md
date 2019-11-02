---
title: As Maravilhas da Composição com React HOCs
date: "2019-11-02T15:46:00.284Z"
description: Criando seus próprios Higher Order Components com React
---

Olá, jovens gafanhotos! Vou trazer um pouco mais de conteúdo a respeito de React. Acredito que vai ajudar bastante, principalmente os iniciantes. E hoje, vou explicar um pouquinho sobre HOC (Higher-Order Component).


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

https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e