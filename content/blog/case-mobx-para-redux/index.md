---
title: Case — Mobx para Redux
date: "2018-02-21T00:00:00.284Z"
description: Case de mudança de Mobx para Redux
---

Hoje vou contar um case de uma migração de Mobx para Redux e os motivos que eu e a minha equipe levamos em consideração para tomar esta decisão.

Vejo muitos questionamentos a respeito de qual é o melhor, o que utilizar em um projeto de grande escala, prós e contras de cada tecnologia. Foram muitas perguntas e após muito estudo realizamos a migração.

A seguir, contarei alguns pontos que ajudaram nesta tomada de decisão.

Ah… só adiantando, não existe receita de bolo. Cada projeto possui sua necessidade e isso deve ser avaliado por todo o time.

![](https://cdn-images-1.medium.com/max/2000/1*WS7o6kfbDa5sRjOHNeW6Jg.png)

Em um projeto no qual trabalhei na [Zup](http://www.zup.com.br/) e o nosso produto estava em produção há cerca de 1 ano, e para controlar seus estados, utilizávamos Mobx.

Com Mobx é possível criar uma store e controlar o estado da sua página por meio de @observables , segue abaixo o flow:

![](https://cdn-images-1.medium.com/max/2814/1*W30WDoSgLxkJ-104IRy0Eg.png)

É extremamente simples como o Mobx trabalha, é quase que um plug and play.
Como diz o próprio @Michel Weststrate, React + Mobx é uma mistura poderosa. 
Realmente a ferramenta oferece muitas funcionalidades para controlarmos nossas páginas.

Com observables podemos manter a seguinte estrutura:

index.js (view)
store.js (onde vai toda a lógica e controle da página, mudanças de estado e etc.).

`gist:95746388033e5a658768d6648bfeb087`

Veja que é bem simples: contendo TodoView com um HOC observer controlando a página TodoListView , para receber as props da Store (TodoView) basta inserir um decorator observer na view. Para que a view receba a store é só passar como propriedade ( todoList={store} ), lindo!

Complicou? A grosso modo é isso aqui:

![](https://cdn-images-1.medium.com/max/2000/1*QFYNfl8omzAlfxkafhE7Hg.png)

É claro que, cada evento tem todo o seu Life Cycle, conforme o flow que representei acima.

Mobx possui poucos conceitos para facilitar sua utilização e escalabilidade.

Bom, estava tudo indo bem, até que… A equipe começou a crescer muito e o projeto também, e então começamos a nos deparar com alguns problemas.

1 — Dispatch Global 😢
2 — Propagar a store entre componentes 😢
3 — Métodos Mágicos 😢
4 — Stores muito grandes 😢
5 — Problemas com separações de camadas 😢
6 — Imutabilidade 😢
7 — Escalabilidade 😢

Sem sombra de dúvidas, o nosso maior problema foi disparar algo em um componente e propagar para outro, sem muita dor de cabeça. O problema é que com Mobx é necessário ficar trafegando a Store entre os componentes, por props, não sendo possível simplesmente fazer um dispacth e um componente, e em outra ponta ouvir e receber os valores, como em uma arquitetura baseada em evento.
Queríamos enviar valores do container A para o B, mas sem passar para os demais, como abaixo:

![](https://cdn-images-1.medium.com/max/2000/1*fiOFf3mCQ0vQsTJmYLOVZA.png)

Isso estava gerando muita dor de cabeça, o código virava um espaguete (se não bem estruturado). Tínhamos nossos controladores que ficavam todos nas stores de cada componente, e com isso tornou-se um grande problema.

Outro grande problema é que o estado com Mobx é **mutável**, ou seja, toda vez que alterarmos nossa store, estaremos alterando diretamente o nosso estado, o que pode gerar muitos efeitos colaterais.

Foi aí que estudamos uma solução e nos deparamos com o Redux, visto que o flow dele é diferente e, para os nossos problemas, cairia bem.

Com Redux conseguimos resolver alguns problemas =D

1 — Dispatch Global 👌
2 — Propagar a store entre componentes 👌
3 — Métodos Mágicos (no more) 👌
4 — Stores muito grandes 👌
5 — Problemas com separações de camadas 👌
6 — Imutabilidade 👌
7 — Escalabilidade 👌

Redux trata os eventos com programação funcional, o que é ótimo, proporcionando mais controle da aplicação e dos resultados esperados, evitando métodos mágicos.

Agora nosso Flow ficou assim:

![](https://cdn-images-1.medium.com/max/2000/1*FfCSBwBh2S6cVE_7d19rKw.jpeg)

Temos uma única store no sistema, o que é uma grande vantagem, pois podemos simplesmente fazer um connect em qualquer component/container e acessar as props que estão na store.

![](https://cdn-images-1.medium.com/max/2000/1*CmIZ7BQvBuyljQHr1xZ2SA.png)

E sem contar que a separação das responsabilidades ficou melhor, como por exemplo: temos as reducers, types e actions pra separar a lógica, deixando a view mais simples. 
É claro que o sistema ficou mais verboso, mas conseguimos deixar as coisas mais simples e de melhor manutenção. Mas, assim como Mobx ou qualquer outra arquitetura, precisamos deixar as coisas bem definidas, se não o sistema vai virar uma bagunça.

Uma frase bem famosa do Dan Abramov é:
> You Might Not Need Redux

Isso mesmo, você pode não precisar de Redux. Se fizer sentido para o seu sistema e for necessário, então utilize, do contrário você terá uma grande dor de cabeça :)

Bom, além do nosso fluxo que mudou, agora temos a imutabilidade ao nosso lado. Diferente do Mobx, redux cria um novo estado para a nossa aplicação, sem mexer no anterior, e com isso podemos saber exatamente o que aconteceu.

Além disto, possuímos ferramentas de debbuger **redux-devtools,** com redux temos gravado cada passo de alteração.** **Isso é uma grande vantagem, uma vez que redux trabalha com programação funcional e não altera o estado da sua aplicação diretamente.

Bom, mas como nem tudo são flores, lembra que falei no começo que a nossa aplicação já estava em produção há mais ou menos 1 ano?
Então, da-lhe refactory :)

Não foi simplesmente com a inserção do Redux que melhorou a nossa aplicação, como teríamos que refatorar muita coisa aproveitamos para rever nossa arquitetura e para não cometermos erros que cometemos com Mobx, que é achar que se coloca tudo na store, sendo que apenas com React nós conseguimos resolver a maioria de nossos problemas, pense no Flux.

Quase 100% da aplicação já foi migrada para Redux e os benefícios foram muitos. Mas ressalto, não foi o simples fato de migrar de lib que nossos problemas foram resolvidos, foi uma quebra de paradigma e uma reorganização do projeto.

As ferramentas que utilizamos ajudam e muito, mas se não forem aplicadas de forma adequada só teremos problemas.

Optamos por esta migração por causa de uma necessidade que tínhamos.

Mas antes de qualquer mudança, veja se realmente é necessário, pois muitas pessoas optam por um ou outro apenas por modismo, sem realmente conhecer a fundo as ferramentas e suas propostas, muita das vezes sem ter um problema.

Mas então, qual é o melhor, Mobx ou Redux?
Os dois! Cada um com sua forma de solucionar problemas. Como coloquei anteriormente, escolha algo que irá resolver as suas necessidades, não adianta mudar por mudar, isso só vai te causar mais problemas. O conhecimento do time também é um fator muito importante na hora dessa escolha.

Isso vale para qualquer lib/framework, não caia no “isso está morto, tal coisa é melhor, saiu hoje :)”.

Referências:

[https://github.com/mobxjs/mobx](https://github.com/mobxjs/mobx)
[https://github.com/reactjs/redux](https://github.com/reactjs/redux)
[https://reactjs.org/](https://reactjs.org/)
[https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)
[https://codeburst.io/mobx-vs-redux-with-react-a-noobs-comparison-and-questions-382ba340be09](https://codeburst.io/mobx-vs-redux-with-react-a-noobs-comparison-and-questions-382ba340be09)
