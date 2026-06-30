# Arquitetura

## Principios

A arquitetura proposta segue quatro ideias centrais:

- clareza antes de sofistificacao;
- separacao de responsabilidades;
- baixo acoplamento entre regras e infraestrutura;
- menor conjunto de componentes capaz de demonstrar o fluxo completo.

O projeto deve ser pequeno, mas nao improvisado. A estrutura precisa mostrar maturidade tecnica sem adicionar complexidade desnecessaria.

## Estilo Arquitetural

O desenho sera baseado em Clean Architecture, SOLID e programacao orientada a objetos.

As regras de negocio devem ficar independentes de detalhes como leitura de CSV, escrita de arquivos, logs ou notificacoes.

Essa separacao permite trocar uma API simulada por uma API real, ou substituir arquivos locais por outro mecanismo, sem reescrever o centro do sistema.

## Camadas

```text
Interface / Entrypoints
        |
        v
Application / Use Cases
        |
        v
Domain
        ^
        |
Infrastructure
```

## Domain

A camada de dominio representa o conhecimento central do processo.

Ela deve conter:

- entidades do negocio;
- objetos de valor;
- regras de classificacao;
- criterios de validade;
- politicas de deduplicacao;
- conceitos como cliente, lote, resultado e status.

Esta camada nao deve conhecer CSV, arquivos, APIs, logs ou ferramentas externas.

Responsabilidade principal: expressar o que o processo significa.

## Application / Use Cases

A camada de aplicacao coordena o fluxo.

Ela deve conter casos de uso como:

- processar arquivo de clientes;
- validar lote;
- limpar registros;
- enriquecer clientes;
- aplicar regras de negocio;
- gerar resultado operacional;
- solicitar relatorio;
- solicitar notificacao;
- arquivar entrada processada.

Essa camada orquestra o processo, mas nao deve conter detalhes tecnicos de infraestrutura.

Responsabilidade principal: expressar a sequencia do trabalho.

## Infrastructure

A camada de infraestrutura implementa detalhes externos.

Ela deve conter adaptadores para:

- leitura de CSV;
- escrita de arquivos;
- API simulada de enriquecimento;
- geracao fisica de relatorios;
- armazenamento local;
- logs;
- notificacoes simuladas;
- arquivamento.

Essa camada pode mudar conforme o ambiente muda. O dominio e os casos de uso devem permanecer estaveis.

Responsabilidade principal: conectar o sistema ao mundo externo.

## Interface / Entrypoints

A camada de entrada inicia o processo.

No MVP, a entrada pode ser uma execucao local simples. Em fases futuras, pode evoluir para agendamento, interface de linha de comando, endpoint HTTP ou integracao com ferramenta externa.

Responsabilidade principal: receber uma solicitacao de execucao e acionar o caso de uso correto.

## Separacao de Responsabilidades

Cada componente deve ter um motivo claro para existir.

Exemplos:

- leitor de CSV apenas le dados;
- validador apenas valida;
- normalizador apenas padroniza;
- deduplicador apenas identifica duplicidades;
- enriquecedor apenas busca dados adicionais;
- aplicador de regras apenas decide classificacoes;
- gerador de relatorio apenas comunica resultados;
- arquivador apenas move arquivos processados.

Essa divisao facilita manutencao, testes e explicacao publica do projeto.

## Aplicacao de SOLID

## Single Responsibility Principle

Cada classe deve representar uma responsabilidade operacional clara.

## Open/Closed Principle

Novas regras de negocio ou novos canais de notificacao devem ser adicionados por extensao, sem alterar o fluxo central.

## Liskov Substitution Principle

Implementacoes simuladas e reais devem respeitar os mesmos contratos.

Exemplo: um enriquecedor fake e um enriquecedor via API real devem poder ser usados pelo mesmo caso de uso.

## Interface Segregation Principle

Contratos devem ser pequenos e especificos.

Um componente que apenas envia notificacoes nao deve depender de metodos de leitura, escrita ou validacao.

## Dependency Inversion Principle

Casos de uso devem depender de abstracoes, nao de implementacoes concretas.

Exemplo: o caso de uso deve depender de um contrato de repositorio de arquivos ou provedor de enriquecimento, e nao diretamente de uma biblioteca especifica de CSV ou HTTP.

## Decisoes de MVP

O MVP deve incluir:

- leitura de CSV local;
- validacao de campos;
- limpeza e padronizacao;
- remocao de duplicados;
- enriquecimento simulado;
- aplicacao de regras de negocio;
- geracao de saidas locais;
- relatorio simples;
- notificacao simulada;
- arquivamento;
- logs.

O MVP deve ficar fora de:

- banco de dados;
- Docker;
- Kubernetes;
- filas distribuidas;
- microsservicos;
- autenticacao;
- frontend;
- painel administrativo;
- IA obrigatoria;
- integracoes reais com terceiros.

## Por Que Esta Arquitetura

Esta arquitetura e suficiente para demonstrar automacao operacional completa sem transformar o demo em uma plataforma.

Ela prova capacidade de engenharia em um formato enxuto:

- o fluxo e completo;
- as responsabilidades sao claras;
- a evolucao e possivel;
- a leitura e acessivel para pessoas tecnicas e nao tecnicas.

