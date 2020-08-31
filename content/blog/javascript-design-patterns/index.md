---
title: JavaScript Design Patterns
date: "2020-08-27T00:00:00.284Z"
description: JavaScript Design Patterns
---

## JavaScript Design Patterns

EEeeee aí pessoal, blz?

Hoje vou trazer alguns Design Patterns com JavaScript. Vou trazer exemplos dos mais comuns e os que mais gosto de utilizar no meu dia-a-dia. Vou tentar trazer casos mais claros que possam te fazer pensar quando um determinado Design Pattern vai se aplicar a sua solução.

Esse artigo não é uma "receita de bolo" de quando utilizar o que, mas para que serve cada padrão e como ele pode te ajudar. Quero fazer você pensar a respeito e não traçar uma linha reta...

Então bora lá...

Mas antes de começar os exemplos, whatafuck is **Design Patterns na Engenharia de Software**?

Design Patterns ou Padrões de Desenho (em um sentido literal) nada mais é como a forma de descrever como resolver um problema. É a criação de um modelo/padrão de escrita. Como nós, desenvolvedores(as) trabalhamos diariamente para solucionar um determinado problema onde muita das vezes possui soluções/escritas semelhantes nada melhor do que criar um padrão com melhores práticas para formalizar como um determinado problema foi resolvido, criando assim convenção com quem está escrevendo/utilizando aquele pattern.

Dessa forma fica muita mais claro o que está sendo realizado, solucionado.

Resumidamente, um Design Pattern visa facilitar a reutilização e desenho da solução.

Pense em uma fábrica que produz veículos. Quando essa fábrica é "invocada" ela te devolve um veículo novinho em folha, com todos os seus atributos e características. Quando a fábrica é executada eu (que instanciei a fábrica, digamos assim) espero o retorno de um veículo (objeto) e não de uma função que some A + B. Como é uma fábrica de veículos eu sei que ela vai retornar um veículo, just it. Qualquer coisa diferente disto está errado :P

Os padrões podem ser categorizados em três principais grupos, são eles:

**Creational Design Patterns (Padrões Criacionais)**

Este padrão são mecanimos para criação de objetos. Um padrão criacional basicamente resolvem problemas controlando o processo de criação de um objeto.

Alguns deles:
* Constructor Pattern;
* Factory Pattern;
* Prototype Pattern;
* Singleton Pattern.

**Structural Design Patterns (Padrões Estruturais)**

Este padrões estão preocupados com a estrutura de classes e objetos. Eles ajudam a estruturar ou reestruturar um ou mais partes sem afetar o sistema inteiro, ou seja, eles ajudam a obter novas funcionalidades sem alterar as já existentes. Evitando assim problemas e efeitos colaterais e refatoração errada. Alguns deles:

* Adapter Pattern;
* Composite Pattern;
* Decorator Pattern;
* Facade Pattern;
* Flyweight Pattern;
* Proxy Pattern.


**Behavioral Design Patterns (Padrões Comportamentais)**

Estes padrões preocupam-se em melhorar a comunicação entre objetos diferentes.
Alguns deles:

* Chain of Responsibility Pattern;
* Command Pattern;
* Iterator Pattern;
* Mediator Pattern;
* Observer Pattern;
* State Pattern;
* Strategy Pattern;
* Template Pattern.

AAAAAAAAAgooooora vou demonstrar alguns exemplos de utilização para o nosso cotidiano de criadores de soluções e bugs (me enquadro aqui hahahah).

Hummm... só mais uma coisinha, os exemplos abaixo podem escritos com escopo de `Class` ou `function/const`. É claro a escrita muda... Escrevi com `function` por acreditar tornar a leitura mais simples. Mas fica a seu critério caso queira reproduzir.

## Constructor

Bom, este padrão, acredito eu, que seja um se não o mais simples.
`Constructor` é um método utilizado para inicializar um novo objeto que é alocado na memória.

```js
/* Com function */
function Hero(name, power, color) {
  this.name = name;
  this.power = power;
  this.color = color;

  return {
    info:  () => `Hello my friend, my name is ${this.name}, my costume color is ${this.color} and my super power is ${this.power}`
  };
}

const Comics = new Hero("Big D", "Fireball", "purple")
console.log(Comics.info())
// Hello my friend, my name is Big D, my costume color is purple and my super power is Fireball

// Importante: Como estou em uma função e quero retornar métodos privados então preciso colocá-los dentro de um objeto e fazer o `return`.

/* Com Class */
class Hero {
  constructor(name, power, color) {
    this.name = name;
    this.power = power;
    this.color = color;
  }

  info() {
    return `Hello my friend, my name is ${this.name}, my costume color is ${this.color} and my super power is ${this.power}`
  }
}

const Comics = new Hero("Big D", "Fireball", "purple")
console.log(Comics.info())
// Hello my friend, my name is Big D, my costume color is purple and my super power is Fireball
```
[Sandbox](https://codesandbox.io/s/nice-shockley-k33oq?file=/src/index.js:0-914)

Ambos os casos são equivalentes, mas em um eu utilizei `class` e no outro `function`. No JavaScript é possível escrever das duas maneiras, mas é claro que cada um possui suas particularidades.

Ao longo deste artigo utilizei mais a criação com `functions` por questão de preferência. Mas nada impede em converter pra Class. O resultado final precisa ser o mesmo.
A bicicleta é a mesma, só mudou a cor...

## Factory
Peeensa na fábrica (factory)...

Bom, no spoiler da fábrica de veículos, aqui espero um método que retorne um determinado "objeto".

```js
function Tesla() {
  const motor = "eletric"
  const color = "black"

  function getInfo() {
    return `I'm a Tesla car with ${motor} motor and ${color}`
  }

  return {
    getInfo
  }
}

function GM() {
  const motor = "combustion"
  const color = "red"

  function getInfo() {
    return `I'm a GM car with ${motor} motor and ${color}`
  }

  return {
    getInfo
  }
}


function Factory() {

  function getModel(model) {
    const models = Object.freeze({
      GM,
      Tesla,
    })

    return models[model]
  }

  this.createVhicle = (model) => {

    try {
      return getModel(model)()
    } catch (e) {
      console.error(e)
    }
  }
}

const factory = new Factory()
const newCarA = factory.createVhicle("Tesla")
const newCarB = factory.createVhicle("GM")
console.log(newCarA.getInfo())
//I'm a Tesla car with eletric motor and black
console.log(newCarB.getInfo())
//I'm a GM car with combustion motor and red
```
[Sandbox](https://codesandbox.io/s/blissful-euclid-8kq3u?file=/src/index.js)

No exemplo acima criei uma fábrica de carros. Onde tenho a classe `Tesla` e `GM`, que são "modelos" de carros.

Aí que vem a lógica do `Factory` que uma fábrica de outras classes, onde eu posso instanciar uma nova fábrica `const factory = new Factory()` e criar um veículo `const newCarA = factory.createVhicle("Tesla")`, com isso temos todos os atributos de cada modelo de veículo, sem precisar controlar a lógica de criação deles, passando todo o controle pra `Factory`.

A ideia aqui é centralizar a lógica na `Factory` e ela ter o controle do que criar e do **por que**. Isso permite você se importar somente com o objeto que você precisa utilizar e deixando o resto pra factory.

Ah... O [Object.freeze](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) é só porque eu não quero que o objeto seja alterado, ele congela o objeto e impede qualquer alteração no mesmo. Não é uma obrigatoriedade da Factory.

## Singleton

O pattern Singleton limita o número de instâncias de uma classe, criando assim una única instância chamada, advinhe, Singleton \o/

Este padrão pode ser útil quando o sistema precisa que um o controle de alguma regra, por exemplo, seja realizado em um único ponto. Isso evita efeitos colaterais e sobrecarga de métodos. Um exemplo disso é uma conexão com banco de dados, na maioria dos casos você só deve ter um que conecta, atualiza, salva, destrói todas as conexões com o banco.
Este padrão também reduz a necessidade de variáveis globais, que podem causar uma grande dor de cabeça com side effects.

Exemplo:

```js
function Clock() {
  this.timer = new Date();

  function WhatTimeIsIt() {
    return this.timer;
  }

  return {
    WhatTimeIsIt
  };
}

var instance;

const Singleton = (function () {
  function createInstance() {
    return new Clock();
  }

  function getInstance() {
    if (!instance) {
      instance = createInstance();
    }
    return instance;
  }

  return {
    getInstance
  }
})()

function init() {
  const instance1 = Singleton.getInstance()
  const instance2 = Singleton.getInstance()
  const instance3 = new Clock()

  console.info(`Same instance1 === instance2 ? ${instance1 === instance2}`)
  // true
  console.info(`Same instance1 === instance3 ? ${instance1 === instance3}`)
  // false
}

init()
```

[Sandbox](https://codesandbox.io/s/serverless-cherry-mrx19?file=/src/index.js)

No exemplo acima eu criei uma classe `Clock`, uma variável pra guardar as instâncias  `var instance` e a classe Singleton.

Mas antes, precisamos de algumas informações adicionais, são elas:

Para que esta classe seja considera um Singleton ela precisa ter só uma instância (`var instance;`), e ser executado com um Immediately Invoked Function Expressions (IIFE), `(function () {` and  `})()`

Todos essas obrigatoriedades estão ok.

Voltando a explicação...

Reparem que ao comparar as variáveis `instance1` e `instance2` elas são iguais, mas ao criar uma `instance3` a partir de `Clock` ela é diferente de `instance1`, porque ao gerar o `Clock` uma nova instância é alocada na memória, diferente de quando chamado pela nossa classe `Singleton` que faz essa validação.

```js
function getInstance() {
    if (!instance) {
      instance = createInstance();
    }
    return instance;
  }
```

## Immediately Invoked Function Expressions (IIFE)

Muitos acreditam que este não é um padrão e sim algo nativo do JavaScript, devido ao escopo do JS permitir que uma função anônima seja criada e executada imediatamente. Mas este é um padrão muito utilizado por outros patterns, assim como vimos no Singleton.

Exemplo de IIFE:
```js
(function(a, b) {
   const sum = a + b
   console.log(sum)
})(123, 44)
```

Reparem que é o recebimento de uma função anônima (não possui nome para poder executar de novo, é criada só naquele escopo) e a execução da mesma `(function(){ })()`.
Também é possível passar argumentos `(123, 44)` para serem executados dentro da função `(function(a, b) {`

Ele também é muito utilizado para simular [variáveis estáticas](https://en.wikipedia.org/wiki/Static_variable)

```js
let autoIncrement = (function () {
  let number = 0
  return function () {
    number++
    return number
  }
})()
console.log(autoIncrement())
// 1
console.log(autoIncrement())
// 2
```
[Sandbox](https://codesandbox.io/s/dazzling-merkle-fdhpq?file=/src/index.js:0-183)

Toda vez que `autoIncrement` for chamado ele vai incrementar um com o valor anterior do mesmo. Isso é possível graças ao uso de [closure](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Closures) em uma variável privada.
Estamos basicamente retornando uma nova função que vai ser atribuída a variável do `autoIncrement`, e com o mecanismo de escopo do JS a função vai sempre ter acesso a variável `number`.

Também é possível simular uma variável privada no JS, da seguinte maneira:

```js
let autoIncrement = (function() {
  let number = 0

  return {
    incr() {
      number++
    },
    get number() {
      return number
    }
  }
})()

autoIncrement.incr()
console.log(autoIncrement.number) // 1
autoIncrement.incr()
console.log(autoIncrement.number) // 2
autoIncrement.number = 5 // TypeError: Cannot set property number of #<Object> which has only a getter

```
[Sandbox](https://codesandbox.io/s/nifty-northcutt-vv31i?file=/src/index.js:0-368)

Dessa maneira declaro que number é privado e que posso apenas receber o valor através da leitura da variável `number` e incrementá-lo através do método `incr`

## Conclusão

Bom pessoal, esses são alguns padrões de desenvolvimento de engenharia de software. Coloquei somente alguns exemplos mais comuns mas com o tempo vou adicionando mais.
Acredito que vocês puderam perceber como eles podem nos ajudar no nosso dia-a-dia, tanto na melhora da escrita quanto no entendimento e resolução dos problemas.
Espero que este artigo tenha te ajudado um pouco no entendimento e quem sabe até ajudou a melhorar o seu código.

Caso queira conhecer mais padrões [Software Design Patterns](https://en.wikipedia.org/wiki/Software_design_pattern)

Por ora é só e até mais ;)


### Referências

* https://addyosmani.com/resources/essentialjsdesignpatterns/book/
* https://blog.logrocket.com/design-patterns-in-node-js/
* https://www.dofactory.com/javascript/design-patterns/observer
* https://pt.wikipedia.org/wiki/Padr%C3%A3o_de_projeto_de_software
* https://www.opus-software.com.br/design-patterns/
* https://medium.com/better-programming/javascript-design-patterns-25f0faaaa15
* https://imasters.com.br/devsecops/design-patterns-com-javascript-typescript
* https://en.wikipedia.org/wiki/Software_design_pattern