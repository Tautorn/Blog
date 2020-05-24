---
title: Node.JS está "morto", longa vida ao Deno!
date: "2020-05-22T00:00:00.284Z"
description: A nova runtime do mesmo criador do NodeJS!
---

![Deno](https://i.ibb.co/rmV2TZ0/1-j-PBtd4-GQBj-J0-Kcy-Fyqcp-Bg.png)
### Hoje vou falar da nova delícia que está surgindo, o Deno!! console.log("Welcome to Deno 🦕");

**Bom, antes de começar, o título pode causar estranheza. Mas ao longo do artigo explico e deixo a minha opnião a respeito.**


#### Deno é a nova runtime segura para Javascript e TypeScript <3

Whatafuck is that?!

Deno é um executável  para JavaScript e TypeScript que utiliza o motor [V8](https://v8.dev/) e foi construído utilizando a linguagem [Rust](https://www.rust-lang.org/)

OOUuuu seja, um negocinho pra rodar os trem que escrevemos :P

Deno é do mesmo criador do NodeJS [Ryan Dahl](https://en.wikipedia.org/wiki/Ryan_Dahl).
O projeto pretende corrigir todas os problemas de design que existem no NodeJS, descrito na famosa talk realizada pelo Ryan.
["10 Things I Regret About Node.JS"](https://www.youtube.com/watch?v=M3BM9TB-8yA) - Ryan Dahl


**Os 10 problemas são basicamente isso aqui:**

 - Promises
	* Ele adicionou promises ao NodeJS em Junho de 2009, mas removeu em Fevereiro de 2010, pelo mínimo;
	* É possível que a unificação do uso de `promise` tenha acelerado a entrada da padronização de async/await.

- Segurança
	* Programas escritos com NodeJS tem acesso a todas as chamadas do sistema, podem realizar escritas em disco, acessar dados da rede, ler arquivos e tudo isso sem prévia autorização.

- Sistema de build
	* Se você está escrevendo um módulo linkado à biblioteca C, você usaria [GYP](https://gyp.gsrc.io/index.md) para compilar e vincular essa biblioteca escrita em C ao Node;
	* Outras ferramentas utilizavam GYP, agora somente o Node está utilizando GYP;
	* Uma adaptação Python do JSON. Node possui complexos nós desnecessários em torno de si.

- package.json
	* Incluir NPM no Node torna o NPM um padrão de distribuição. 
	* Centralizado, controle privado e repositório para módulos;
	* Incluir informações desnecessárias;
	* Abstração desnecessária do conceito de módulos como um diretório de arquivos. Não existe isso na Web.

- node_modules
	* O algoritmo da resolução de módulos é altamente complexo;
	* Não é um formato para navegador.

- Require sem extensão
	* Desnecessariamente menos implícito;
	* Não é como o browser funciona;
	* O carregamento dos módulos precisa "advinhar" o que fazer.

- index.js
	* Sistema de carregamento desnecessariamente complicado
	* Especialmente desnecessário depois que obrigatoriamente suportado pelo package.json
	

### Agora vou falar da nova <strike>Brastemp</strike> Deno.


### Principais Features

* <strong>Seguro por padrão</strong>. Sem acesso a arquivos, rede ou ambientes por padrão (a não ser que seja explicitamente habilitado). Exemplo:

```shell
$ deno run --allow-read=/etc https://deno.land/std/examples/cat.ts /etc/passwd
```
* Suporte ao TypeScript por padrão. Isso cria um código mais seguro.
* Um único executável
```shell
$ deno run --allow-net fetch.ts
```
* Possui inspeçor de dependências `deno info` e formatador de código `deno fmt`
* Possui módulos por padrão (não possui um “npm”). Tudo fica na `Deno Land` Yuhuuuuuu
* Scripts podem ser “bundled” em um arquivo único de JS
* Suporte a top level com await (Não é preciso declarar async/await)
* Compatibilidade do browser (pode acessar o `window` e não `global`)

### Filosofia
* O Objetivo do Deno é criar scripts produtivos e seguros para ambientes com programação moderna.

* Deno vai sempre ser distrubuído utilizando um único executável.

* Deno recebe a URL dos programas, para que ele possa ser executádo. Dessa forma ele não precisa ser executado  com “15 mega de arquivos zipados”

* Ele usa por padrão browser-compatible protocol para carregar seus módulos: URLs.

* Além de outras coisas, Deno é um grande substituidor para utilitários de scripts que muita das vezes foram escritos com `bash` ou `python`.

### Pontos principais
* Uńico executável `deno run goPowerRangers.ts`
* Compatibilidade com o browser, o subconjunto de programas dos quais são completamente escritos em JS e não utilizam o namespace global Deno (ou feature teste para isso), também devem poder estar disponível para ser executado em um browser moderno sem alterações.
* Providencia por padrão um kit de ferramentas para teste unitário, formatação de código e lint para melhorar a experiência do desenvolvedor.

>**Não perdeu conceitos utilizados no V8
Pode disponibilizar eficientemente um servidor HTTP.**


### Comparações com NodeJS

![UHHH Deno](https://i.ibb.co/znrfPZg/bitmap.png)

* Deno não utiliza NPM (adios node_modules!)

* Seus módulos fazerem referência a URLs ou paths de arquivos

* Todas as ações assíncronas do Deno retornam uma promise.  Portando, Deno oferece diferentes APIs do que o Node.

* Deno exige permissões explícitas para acessar arquivos, network e ambientes.

* Deno sempre “morre” em erros inexplorados (não tratados).


> Utiliza ES Modules e não suporta “require”. Pacotes de terceiros são importados via URLs. 

**Exemplo:**
```ts
import * as log from "https://deno.land/std/log/mod.ts";
```

### Outros comportamentos chave:

Código remoto é buscado e cacheado na primeira execução, e **nunca** é atualizado até que o código seja executado com a flag **--reload**.

Módulos/arquivos carregados de URLs remotas destinam-se a serem imutáveis e armazenados ao cache.


### Conclusão

Deno vai matar o NodeJS? Acredito que não, Deno ainda é muuuito novo e Node já é uma ferramenta estável e consolidada pela comunidade e o mercado.
Acredito que teremos em breve mais uma opção para quando formos criar uma nova aplicação.

Deno aparenta ser uma ferramenta incrível, trazendo features que fazem total sentido, como o permissionamento e aumento da segurança do código, além de outras.

A comunidade está bastante empolgada com o Deno (eu também! hahaha).

Já devo utilizar Deno em produção? Não aconselho. Apesar de já ter saído a v1.0 Deno é muito novo, está sendo desenvolvido desde 2018 e não há muitos cases. Ao contrário de NodeJS que já tem 1 década e milhões de projetos.

De todo jeito, vamos aguardar os próximos episódios dessa ferrramenta.

Por hoje é isso :P
Vou escrever mais a respeito e também postar vídeos no meu canal, onde apresento outras tecnologias também, me segue lá: [Tautorn Tech](https://tautorn.com.br/)


### Referências
- [Deno](https://deno.land/)
- [10 Things I Regret About Node.js](https://medium.com/@imior/10-things-i-regret-about-node-js-ryan-dahl-2ba71ff6b4dc)
- [Fireship](https://www.youtube.com/watch?v=F0G9lZ7gecE)
- [Deno Will It Replace Node.js](https://www.youtube.com/watch?v=lcoU9jtsK24)
- [TreinaWeb](https://www.treinaweb.com.br/blog/deno-conheca-o-suposto-substituto-do-node-js/amp/)
- [What is Deno & Will it replace Node.js?](https://www.youtube.com/watch?v=3Vl8a3zYjiw)