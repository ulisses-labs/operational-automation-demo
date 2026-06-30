# Operational Automation Demo

Um case publico da Ulisses Labs para demonstrar, de forma simples e objetiva, a automacao de um processo operacional completo.

Este projeto responde a uma pergunta direta:

> Voce consegue automatizar um processo operacional completo?

Sim. Este repositorio foi desenhado para mostrar como uma rotina manual, repetitiva e sujeita a erros pode ser transformada em um fluxo automatizado, rastreavel e reutilizavel.

## Visao do Projeto

O demo simula uma pequena empresa que recebe diariamente uma planilha CSV com novos clientes.

Hoje, uma pessoa precisa abrir o arquivo, validar dados, corrigir inconsistencias, remover duplicidades, enriquecer registros, aplicar regras internas, gerar relatorios, enviar notificacoes e arquivar arquivos processados.

O objetivo do projeto e automatizar esse fluxo de ponta a ponta usando uma arquitetura limpa, modular e facil de entender.

## Problema Resolvido

Processos operacionais simples costumam crescer sem estrutura:

- arquivos chegam por canais diferentes;
- validacoes dependem de atencao manual;
- erros sao descobertos tarde;
- relatorios sao montados repetidamente;
- arquivos processados ficam espalhados;
- nao ha historico claro do que aconteceu.

Este projeto mostra como organizar esse trabalho em um pipeline previsivel, com responsabilidades bem separadas e saidas claras.

## Fluxo Resumido

```text
CSV de entrada
  |
  v
Validacao
  |
  v
Limpeza e padronizacao
  |
  v
Remocao de duplicados
  |
  v
Enriquecimento simulado
  |
  v
Regras de negocio
  |
  v
Saidas processadas
  |
  v
Relatorios, notificacoes, arquivo e logs
```

## Tecnologias

A implementacao prioriza simplicidade e clareza:

- Node.js + TypeScript como stack principal;
- programacao orientada a objetos;
- Clean Architecture;
- arquivos CSV como entrada e saida;
- API simulada para enriquecimento;
- logs locais;
- relatorios em Markdown;
- notificacao simulada em arquivo texto;
- testes automatizados com Vitest.

O MVP nao depende de banco de dados, Docker, Kubernetes, microsservicos, frontend ou filas distribuidas.

## MVP Workflow

O projeto agora executa um fluxo local completo a partir de `data/input/customer_requests.csv`.

Ao rodar `npm run dev`, o workflow carrega o lote, valida registros, normaliza campos, detecta duplicidades por e-mail, aplica enriquecimento simulado, classifica cada solicitacao com regras de negocio e gera as saidas operacionais em `data/output`, `reports`, `notifications` e `logs`.

Se o CSV de entrada ainda nao existir, o proprio workflow cria um dataset ficticio com aproximadamente 40 registros usando apenas dados de exemplo.

## Por Que Este Projeto Existe

Este repositorio existe para ser uma prova publica de capacidade.

Ele nao tenta vender uma tecnologia especifica. Ele demonstra que a Ulisses Labs sabe transformar uma rotina operacional comum em um processo automatizado, bem desenhado e pronto para evoluir.

O foco e mostrar dominio sobre:

- entendimento de processo;
- desenho de arquitetura;
- separacao de responsabilidades;
- automacao de ponta a ponta;
- comunicacao tecnica clara;
- entrega enxuta com principio de Pareto.

## Documentacao

- [Visao](docs/vision.md)
- [Problema de Negocio](docs/business-problem.md)
- [Workflow](docs/workflow.md)
- [Arquitetura](docs/architecture.md)
- [Estrutura do Projeto](docs/project-structure.md)
- [Escopo do MVP](docs/mvp-scope.md)
- [Roadmap](docs/roadmap.md)

## Comandos Basicos

```bash
npm install
npm run dev
npm run build
npm run test
npm run lint
npm run typecheck
```

## Principio Orientador

Construir apenas o menor conjunto de componentes capaz de demonstrar uma automacao operacional completa, profissional e reutilizavel.
