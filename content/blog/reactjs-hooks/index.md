---
title: ReactJS Hooks - useState
date: "2021-10-17T00:00:00.284Z"
description: ReactJS - Hooks
---

ReactJS Hooks

Olá jovens gafanhotos, hoje vou falar um pouco sobre os HOOKs, como funcionam e quando utilizá-los

![](https://i.ibb.co/2q6Lh5j/pudge-hook.png)
<center><small>Referência: Pudge Dota 2</small></center>
</br>
</br>

<div style="display: flex">
<img src="../../assets/document-alert.png" height="25px" />&nbsp;Conheça também como funciona o hook &nbsp; <a href="https://blog.tautorn.com.br/reactjs-hooks/" target="_blank"> useEffect </a>
</div>
<br />

A funcionalidade de Hooks foi adiciona no React na versão 16.8, onde foi criado a possibilidade de utilizar o estado da aplicação e outras features do React sem a necessidade de criar um escopo de *classe*. 
Um breve exemplo de componente com escopo de classe:


`gist:de66e05daa3aa5a29a63538e5fa38c56`

Pode ser escrito da seguinte maneira:

`gist:a386ae581337564c31eaef379692d630`


Bem simples, não é mesmo?!

É claro que o componente apresentado acima é algo extremamente simples e não reflete muito o que temos no nosso dia-a-dia. 

Mas o que quero apresentar é que o ciclo de vida e as funcionalidades do React continuam as mesmas, o seu código JSX vai sofrer poucas alterações, é muito fácil converter um componente que está escrito em classe para uma abordagem com Hooks e vice-versa (salve algumas exceções).
 
Lembre-se, os Hooks não vão substituir o que você já conhece a respeito do React, é apenas uma ferramenta a mais.

A motivação da criação dos Hooks pelo time de engenheiros do Facebook foram as seguintes:
* É difícil a reutilização da lógica entre componentes;
* Componentes complexos podem ser difícies de entender;
* Classes confundem tanto pessoas quanto máquinas.

Abaixo está a lista completa dos Hooks nativos existentes no React:

Hooks Básicos:
* useState
* useEffect
* useContext

Hooks Adicionais:
* useReducer
* useCallback
* useMemo
* useRef
* useImperativeHandle
* useLayoutEffect
* useDebugValue

## No entanto, o que é um Hook?
Hook nada mais é que uma função que permite utilizar recursos do React sem a necessidade transformar o seu componente em classe. 

Imagine que você precise adicionar um state (estado) na sua página, como gravar o retorno de um Api para que os dados sejam renderizado na tela, ao invés de criar uma classe utilizando o [setState](https://pt-br.reactjs.org/docs/faq-state.html) você pode simplesmente utilizar o Hook `useState`. 

Abaixo vou aprensentar exemplos de como funcionam o `useState`. `useEffect` e o `useContext` que são os Hooks Básicos e por sua vez mais utilizados.

## useState
Com o useState é possível criar um estado no componente para que sejam aplicadas alterações no mesmo toda vez que o estado é alterado (ciclo de vida do React), conforme abaixo:

```jsx
import { useState } from 'react'

function Gallery() {
  const [picture, setPicture] = useState('250')

  console.log("Re-render", picture)

  const changeDogPicture = (dog) => setPicture(dog)

  return (
    <div>
      <h1> Hey, look at me! </h1>
      <img src={`https://placedog.net/${picture}`} alt="dog-picture" />

      <h2>Click below to choose another picture</h2>
      <button onClick={() => changeDogPicture(250)}>
        Super Dog
      </button>
      <button onClick={() => changeDogPicture(100)}>
        Dog 100
      </button>
      <button onClick={() => changeDogPicture(200)}>
        Dog 200
      </button>
      <button onClick={() => changeDogPicture(300)}>
        Dog 300
      </button>
    </div>
  )
}

```
<small>Código completo para execução: [Code Sandbox](https://codesandbox.io/s/reacthook-usestate-example-9n1pj?file=/src/App.js)
</small>

O **useState** possui o seguinte formato:
```js
const [picture, setPicture] = useState('250')
```

Ele retorna dois parâmetros, sendo o primeiro `picture` contendo o estado atual e o segundo `setPicture` com a função para poder alterar o valor de `picture` (com isso disparando o ciclo de vida do React e renderizando novamente o componente).

Repare que é possível iniciar o estado de `picture` com um valor padrão `useState('250')`, mas isso é opcional. Podendo ser iniciado somente executando o Hook `const [picture, setPicture] = useState()`, nesse caso o valor inicial de `picture` é **undefined**.

Desse modo toda vez que for informado um novo valor utilizando o método `setPicture` o React vai entender que o estado da aplicação foi alterado e com isso é necessário renderizar a página novamente, respeitando é claro as regras de [renderização de elementos](https://pt-br.reactjs.org/docs/rendering-elements.html#react-only-updates-whats-necessary).

![](https://i.ibb.co/qggpj6Q/usestate-dogs.gif)

Quem já trabalhou com classe utilizando React isso é praticamente a mesma coisa que utilizar `setState` para alterar o estado de um componente.

Dessa maneira mudanças em um componente React ficaram muito mais fáceis, sendo possível até mesmo criar vários hooks com `useState`. 

> Mas atenção, toda vez que um hook (useState) é disparado o componente que possui o estado do Hook vai ser renderizado novamente, podendo gerar renderizações desnecessárias se não for bem utilizado. 

Imagine que uma função é executada e dentro dela existem vários hooks alterando algum estado da aplicação:

```jsx
const [user, setUser] = useState()
const [value, setValue] = useState()
const [payments, setPayments] = useState()
const [notifcation, setNotifcation] = useState()

const handleBilling = (values) => {
  setUser(values.user)
  setValue(values.value)
  setPayments(['values'])
  setNotifcation('anything')
}

```
No exemplo acima 4 renderizações ocorrem na página, ao invés disso podemos escrever o resultado do código acima desta maneira:

```jsx
const [state, setState] = useState() // Pode ser qualquer nome, mas chamei de state por ficar mais claro que é o estado do componente. É uma mera semelhança ao nome utilizado quando utilizamos classe com React

const handleBilling = (values) => {
  // utilizando apenas um Hook e realizando uma única renderização na página
  setState({
    user: values.user,
    value: values.value,
    payments: ['values'],
    notifcation: 'anything'
  })
}

```

Mas é claro que cada caso é um caso e a forma que utilizei acima não deve ser aplicado de qualquer maneira ou obrigatoriedade. Disparar mais de uma renderização no componente nem sempre é prejudicial pra aplicação e o React está preparado para isso. Muitas pessoas possuem receio de gerar um estouro de memória mas cada caso deve ser pensado e analisado isoladamente.

Leve sempre em consideração boas práticas, análise de performance da página (pode ser feito com o [React Dev Tools](https://pt-br.reactjs.org/blog/2019/08/15/new-react-devtools.html)), legibilidade do código, manutenção...

Não há uma regra, mas sempre analise o que você está desenvolvendo :)

Bom, este é um pequeno exemplo de aplicação do Hook `useState`, abaixo estão algumas referências onde podem ser encontrados exemplos com os outros Hooks.

Para saber sobre o [useEffect](https://blog.tautorn.com.br/reactjs-hooks-use-effect)

***Em breve vou atualizar esta página com exemplos do `useContext`***

Referências:

[ReactJS - Hooks Reference](https://reactjs.org/docs/hooks-reference.html)
[Awesome React Hooks](https://github.com/rehooks/awesome-react-hooks)
[Enmascript](https://enmascript.com/articles/2018/10/26/react-conf-2018-understanding-react-hooks-proposal-with-simple-examples)