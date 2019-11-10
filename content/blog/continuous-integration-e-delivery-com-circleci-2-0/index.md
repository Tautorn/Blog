---
title: Continuous Integration e Delivery com CircleCI 2.0
date: "2018-05-26T00:00:00.284Z"
description: Realizando uma integração com CircleCI 2.0
---

Faaala jovens dinâmicos!

Milhões de anos depois e estou de volta \o/

Neste artigo vou falar de uma ferramenta incrível para CI/CD, que é o CircleCI.

Bom, para quem não sabe, CI/CD é basicamente isso aqui:

**Continuous Integration (CI):**
Manter todo o código desenvolvido em um local onde se possa realizar build e testes do projeto, além de identificar mudanças nele realizadas. Um exemplo é manter o código em um repositório (github, gitlab, codecommit, outros) com testes, build automatizado, e outras funcionalidades.

**Continuous Delivery (CD):**
É uma extensão do Continuous Integration que pode ter passos de pipeline para certificar que a geração de uma release pode ir para produção. É a entrega contínua (sério!?) do produto em produção, a qualquer momento.
Sendo assim, é possível fazer o build do projeto, realizar testes automatizados e fazer o deploy para produção, ou pular tudo e ir fazendo direto e seja o que gódi quiser… (hahaha 🙊).

Exemplo de pipeline com ❤️AWS ❤️.

![](https://cdn-images-1.medium.com/max/2048/1*g7U4Z7P5MFdLmVeEd1lTnw.jpeg)

Beleza champs… Mas onde entra o CircleCI?

Bom, CircleCI é uma ferramenta de CI/CD que visa automatizar o seu pipeline deploy. 
E ela é incrível, muito fácil de configurar e possui muitos recursos que vou mostrar ao longo do artigo.

CircleCI integra com Github, Github Enterprise e Bitbucket, e sempre que o código é commitado em uma branch o build é gerado (de acordo com a configuração, é claro).

Também é possível testar automaticamente o seu build em um container separado ou em uma VM.

Após realização dos passos do Workflow (vou explicar mais adiante) o time pode ser notificado, em caso de falha ou sucesso.

Então todo o deploy é automatizado :)

Grandes possibilidades que existem no CircleCI:

* Workflows para orquestração de Jobs (cara, isso é lindo).

* Escolher a CPU/RAM de acordo com a sua necessidade (fast and furious).

* Cache para acelerar o seu build =D

* Support a Docker Containers

* Agnóstico a linguagens (support a qualquer linguagem que se baseie em Linux ou macOS, incluindo C++, Javascript, .NET, PHP, Python, and Ruby.

* SSH ou Build Local para debbuger

* Insights

* Muita segurança =D 🔐

Blz, então como começar?
Faça o cadastro no [https://circleci.com/](https://circleci.com/dashboard) e inicie o projeto selecionando o seu repositório (github ou bitbucket).

Bom, para explicar melhor alguns passos eu criei um projeto no github, onde você pode fazer um fork dele para então fazer a integração com o CircleCI ou criar um projeto próprio.

https://github.com/Tautorn/cicd-circleci.git

Utilizei o creat-react-app para gerar o aplicativo.

Certo, agora acesse a dashboard do circle e clique em adicionar projeto.

![](https://cdn-images-1.medium.com/max/2732/1*J2B3haJ45v5x6S9TuTHZVQ.png)

Agora escolha o SO e a linguagem.

![Utilize linux e Node.](https://cdn-images-1.medium.com/max/2732/1*9-juW30_LU-S1QFqYZ1F2A.png)*Utilize linux e Node.*

Agora é configurar o nosso arquivo ./circleci/config.yml para podermos criar todo o nosso workflow para que o CircleCI possa então capturar alterações realizadas no projeto.

Abaixo uma primeira versão do projeto onde informei um job chamado build utilizando uma imagem com node 8.0.

Nos jobs, eu posso descrever meus steps, no exemplo abaixo é feito um checkout no projeto, download e cacheamento das dependências e execução de testes.

`gist:8d84fccb146185204452689d09abbedb`

Mas somente o pipeline acima não é o suficiente para *buildar *e subir o projeto em produção, sem contar que não estou *escutando* minhas branchs que esse job seja executado, é aí que entram Workflows.

**Orchestrating Workflows**

Em termos simples, Workflows é uma coleção de regras para definir passos para executar seus jobs. Com isso é possível orquestrar tarefas complexas com passos simples.

Sem contar que é possível definir as branchs que vão triggar algum job, aprovação, geração de reports, insights e muito mais. Para saber mais:
[https://circleci.com/docs/2.0/workflows/](https://circleci.com/docs/2.0/workflows/)

Agora vamos adicionar o workflow no final do arquivo config.yml

`gist:4750b74ac8bfa1d3b0bf2d451988c127`

Esse workflow executa dois jobs, build e test, com isso vamos ter o seguinte workflow:

![](https://cdn-images-1.medium.com/max/2732/1*XamHrOQV_qWdLoB9jG1cHA.png)

Pronto, nosso primeiro workflow está pronto, mas está muito simples e não temos grandes vantagens com isso. Reparem que temos dois passos, test e build e eles acontecem juntos, o que não é bom, porque se um quebrar o outro vai ser executado do mesmo jeito. A melhor forma é se fosse por etapas.

Sem contar que o Workflow está triggando todas as branchs, ou seja, um commit em qualquer branch do projeto vai disparar um job, o que pode atrasar a verificação do projeto, causando fila.

Para melhorar esse flow vou adicionar algumas etapas, separar o test do build, uma aprovação e filtros por branchs, em um deploy para dois ambientes, (development e produção) ficando assim:

`gist:e12dff4ca95188b19716c36811636ea0`

Reparem que na linha 21 e 29 eu adicionei dois passos que serão executados em branchs separadas, um deploy para o ambiente de development e outra para o ambiente de produção.

Mas perceba que a linha 33 tem como item obrigatório um hold , que nada mais é que um passo de aprovação, ou seja, o job deploy-prod só vai ser executado se alguém for lá e aprovar manualmente o mesmo, enquanto isso não acontecer o step vai ficar parado, ele não continua o Workflow. Uma maravilha, não é mesmo!?

A saída é essa aqui:

![](https://cdn-images-1.medium.com/max/2376/1*62f41BbRMHOUSUl-jGMfQg.gif)

Isso cria uma organização e uma visibilidade muito grande do que está acontecendo no meu CI/CD. Sem contar que em cada step é possível saber o que está acontecendo, bem como identificar e tratar erros durante o Workflow. Para saber se as etapas deram certo é possível ativar notifications.

Com o CircleCI temos grandes possibilidades, é uma ferramenta fantástica e aqui eu demonstrei só um pouco, do contrário esse artigo ficaria gigante hahahah.

Além do mais, é possível inserir arquivos shell para organizar o seu código, criar rotinas de teste, fazer um deploy, executar comandos diretamente, persistir arquivos e muitas outras coisas.

Nesse primeiro exemplo o job do deploy eu deixei vazio, mas no meu próximo artigo eu vou mostrar uma configuração de uma aplicação para subir em produção utilizando s3 e cloudfront.

Toda a configuração final está no meu repositório:
[https://github.com/Tautorn/cicd-circleci/blob/master/.circleci/config.yml](https://github.com/Tautorn/cicd-circleci/blob/master/.circleci/config.yml)

Só lembrando que este foi um exemplo para demonstrar como integrar com o github e criar um workflow extremamente simples, onde possui praticamente 3 steps válidos e o deploy de fato não foi implementado.

**Referências**:

* [https://circleci.com/](https://circleci.com/)

* [https://www.youtube.com/watch?v=otBELDgOo3o](https://www.youtube.com/watch?v=otBELDgOo3o)

* [https://blog.cloudboost.io/react-with-circleci-aws-s3-and-aws-cloudfront-844a1b2c75c9](https://blog.cloudboost.io/react-with-circleci-aws-s3-and-aws-cloudfront-844a1b2c75c9)

* [https://medium.freecodecamp.org/how-to-set-up-continuous-deployment-to-aws-s3-using-circleci-in-under-30-minutes-a8e268284098](https://medium.freecodecamp.org/how-to-set-up-continuous-deployment-to-aws-s3-using-circleci-in-under-30-minutes-a8e268284098)

* [https://medium.freecodecamp.org/our-journey-for-using-circleci-2-0-to-build-and-deploy-an-angular-app-to-aws-s3-8e7ea3f51503](https://medium.freecodecamp.org/our-journey-for-using-circleci-2-0-to-build-and-deploy-an-angular-app-to-aws-s3-8e7ea3f51503)

* [https://medium.com/assertqualityassurance/um-pouco-de-integra%C3%A7%C3%A3o-cont%C3%ADnua-workflow-de-testes-com-circleci-9929904789ef](https://medium.com/assertqualityassurance/um-pouco-de-integra%C3%A7%C3%A3o-cont%C3%ADnua-workflow-de-testes-com-circleci-9929904789ef)
