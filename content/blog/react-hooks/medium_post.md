---
title: React Hooks
date: "2019-11-21T19:47:03.284Z"
description: Um pouco sobre api hooks do React
---


React HOOKs

Olá jovens gafanhotos, um vou falar um pouco sobre os HOOKs, como funcionam e quando utilizá-los.

![Referência: Pudge Dota 2](https://cdn-images-1.medium.com/max/2000/1*oSPc0wR1LX_DSNqvxFs5XA.png)*Referência: Pudge Dota 2*

Bom, Hooks foram adicionados no React na versão [16.8](https://reactjs.org/docs/hooks-reference.html).

Essas novas funcionalidades permitem que se utilize o estado da aplicação e outras features do React sem a necessidade de criar um escopo de classe. 

Um breve exemplo de componente com escopo de classe:

`gist:de66e05daa3aa5a29a63538e5fa38c56`

Pode ser escrito da seguinte maneira:

`gist:a386ae581337564c31eaef379692d630`

Bem simples, não é mesmo?!
É claro que o componente apresentado acima é algo extremamente simples e não reflete muito o que temos no nosso dia-a-dia. 
Mas o que quero apresentar é que o ciclo de vida e as funcionalidades do React continuam as mesmas, o seu código JSX vai sobrer poucas alterações, é muito fácil converter um componente que está escrito em classe para uma abordagem com hooks e vice-versa (salve algumas exções). 
Lembre-se, hooks não vão substituir o que você já conhece a respeito do React, é apenas uma ferramenta a mais.

A motivação da criação dos Hooks pelo time de engenheiros do Facebook foram as seguintes:

* É difícil a reutilização da lógica entre componentes

* Componentes complexos podem ser difícies de entender

* Classes confundem tanto pessoas quanto máquinas

**Hooks Básicos:**

* useState

* useEffect

* useContext


**Hooks Adicionais:**

* useReducer

* useCallback

* useMemo

* useRef

* useImperativeHandle

* useLayoutEffect

* useDebugValue



Referências:
[**Hooks API Reference - React**
*Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class. This…*reactjs.org](https://reactjs.org/docs/hooks-reference.html)
[**rehooks/awesome-react-hooks**
*Awesome React Hooks. Contribute to rehooks/awesome-react-hooks development by creating an account on GitHub.*github.com](https://github.com/rehooks/awesome-react-hooks)


