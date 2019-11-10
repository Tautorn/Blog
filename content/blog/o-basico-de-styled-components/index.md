---
title: O Básico de Styled Components
date: "2017-10-11T22:12:03.284Z"
description: O Básico de Styled Components
---


# O Básico de Styled Components

Criando CSS com JS ò.ó

Bom, este é o meu primeiro artigo e estou muito empolgado, quem me incentivou a criá-lo foi o meu amigo [Isac](https://medium.com/@isacjunior), espero que gostem =D

Algo que eu gosto bastante é de CSS, me divirto muito, mas nem tudo são flores… Há momentos em que tudo parece desabar, corrige de um lado, estraga do outro.

É muito fácil criar efeitos colaterais com CSS, sobrescrever valores de atributos e classes, quebrar páginas inteiras com a simples alteração de alguns valores.

Se não houver padrões bem definidos no projeto, se o time de desenvolvimento não estiver bem alinhado, a manutenibilidade dos estilos das páginas pode-se tornar caótica. Isso especialmente em projetos de grande porte.

Até mesmo projetos com metodologias bem definidas podem enfrentar grandes problemas, por mais que sigam boas práticas de desenvolvimento, arquivos de CSS tendem a ser muito grandes, complexos e de difícil escalabilidade, sem contar na variação de nomes de classes fazendo a meeeesma coisa :’(

![](https://cdn-images-1.medium.com/max/2000/1*L8yI7Krtxxn7L3M5tP3trw.gif)

**Tá… Mas onde diabos entra Styled Components?! Vamos lá, jovem gafanhoto…**

Com styled components é possível definir todo um estilo e criar um componente normal com React. **COM JAVASCRIPT!**

![Fonte: [https://www.styled-components.com/](https://www.styled-components.com/)](https://cdn-images-1.medium.com/max/2000/1*ReDdV49w6Hz-IYdzO7DJiA.png)*Fonte: [https://www.styled-components.com/](https://www.styled-components.com/)*

No exemplo acima temos a criação de um componente do tipo âncora, equivalente a tag <a href="">link</a> . Veja que ele possui todo o seu estilo de CSS e possui uma verificação se existe ou não uma propriedade chamada primarye css, essas que, se existirem, vão aplicar um background e uma color diferente do default.

Certo, mas não seria mais do mesmo? **Não**!

Escrevendo CSS diretamente no JS eu elimino vários problemas, um deles é a criação de classes, o styled-componente já faz isso, é criado uma classe hash que fica antes no head,contendo todos os atributos que foram inseridos em um determinado componente. Se inspecionarmos vamos ver isso melhor, como abaixo:

![Componente com estilo definido](https://cdn-images-1.medium.com/max/2000/1*Dkyap1egkPOpaB_JmpBKOg.png)*Componente com estilo definido*

![Classes criadas](https://cdn-images-1.medium.com/max/2000/1*fcgoXSpefWFbPD915yqWww.png)*Classes criadas*

Isso é feito em tempo de execução, é uma maravilha :)

Vou listar abaixo mais benefícios e é claro, coisas não tão boas :’(

**Prós**:
Criação de classes em tempo de execução;
Manipulação no JS, podendo adicionar regras e validações;
Código acoplado ao componente, sem riscos de classes duplicadas ou efeitos colaterais, uma vez que cada classe criada é única;
Otimizações inteligentes;
Escalabilidade; 
Componentização (gerenciamento de pacotes)

**Contras**: 
Mais uma lib :)
Rastreabilidade;
Um processo a mais para ser executado;
Dificulta testes e2e;

Bom pessoal, sei que falei muuuuuuuuito resumidamente, ficou bem superficial o poder que o styled-components possui, mas vou deixar para me aprofundar mais no assunto em outro tópico, onde eu possa explicar melhor a ferramenta.

Mas antes de finalizar, eu queria dizer que é possível escrever testes automatizados com [Jest](https://github.com/styled-components/jest-styled-components)! Oloooko.

![](https://cdn-images-1.medium.com/max/2000/1*61lnA61wYkioBxSjXGHa9w.gif)

Vlw e abraço!

**Fontes:**
[https://www.styled-components.com/](https://www.styled-components.com/)
[https://medium.com/tableless/uma-linguagem-de-estilos-unificada-1e5976fa383e](https://medium.com/tableless/uma-linguagem-de-estilos-unificada-1e5976fa383e)
[https://github.com/styled-components/jest-styled-components](https://github.com/styled-components/jest-styled-components)
