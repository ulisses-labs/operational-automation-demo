# Roadmap

## Diretriz

O roadmap segue o principio de Pareto: entregar primeiro o menor conjunto de funcionalidades que prova a automacao completa.

Cada fase deve adicionar valor claro, sem transformar o projeto em uma plataforma antes da hora.

## Fase 1: Fluxo Completo Local

Objetivo: demonstrar a automacao de ponta a ponta em ambiente local.

Inclui:

- leitura de CSV local;
- validacao de campos obrigatorios;
- limpeza e padronizacao;
- remocao de duplicados;
- enriquecimento simulado;
- aplicacao de regras de negocio;
- geracao de arquivos de saida;
- relatorio simples;
- notificacao simulada;
- arquivamento do arquivo original;
- logs de execucao.

Nao inclui:

- banco de dados;
- Docker;
- frontend;
- APIs reais;
- agendamento;
- autenticacao;
- painel administrativo.

Resultado esperado: qualquer visitante tecnico consegue executar ou entender o fluxo completo sem depender de servicos externos.

## Fase 2: Integracao com APIs Reais

Objetivo: substituir ou complementar simulacoes com servicos externos reais.

Possibilidades:

- API de enriquecimento cadastral;
- API de validacao de documento;
- CRM;
- ferramenta de atendimento;
- sistema interno do cliente.

Criterio de entrada: o fluxo local ja deve estar estavel e bem separado por contratos.

## Fase 3: Notificacoes

Objetivo: enviar o resultado do processamento para pessoas ou canais operacionais.

Possibilidades:

- email;
- Slack;
- Microsoft Teams;
- WhatsApp via provedor;
- webhook.

O canal de notificacao deve ser plugavel. A regra de negocio nao deve depender de um canal especifico.

## Fase 4: Agendamento

Objetivo: executar o processo automaticamente em horarios definidos.

Possibilidades:

- agendamento local;
- cron;
- scheduler gerenciado;
- execucao recorrente em ambiente de nuvem.

Essa fase deve ser adicionada somente depois que o fluxo manual/local estiver confiavel.

## Fase 5: IA Opcional

Objetivo: avaliar onde inteligencia artificial pode gerar valor real, sem tornar o projeto dependente dela.

Possibilidades:

- classificacao semantica de clientes;
- resumo automatico do lote processado;
- sugestao de prioridade;
- explicacao de inconsistencias;
- recomendacao de proxima acao.

IA deve ser tratada como melhoria opcional, nao como fundacao do fluxo.

## MVP

## Faz Parte do MVP

O MVP inclui:

- um fluxo local completo;
- entrada por CSV;
- validacao;
- limpeza;
- deduplicacao;
- enriquecimento simulado;
- regras de negocio simples;
- arquivos de saida;
- relatorio;
- notificacao simulada;
- arquivamento;
- logs;
- documentacao clara.

## Fica Fora do MVP

Fica fora do MVP:

- banco de dados;
- Docker;
- Kubernetes;
- filas distribuidas;
- microsservicos;
- autenticacao;
- frontend;
- painel administrativo;
- deploy em nuvem;
- integracoes reais;
- IA obrigatoria;
- processamento em tempo real.

## Criterio de Conclusao do MVP

O MVP esta concluido quando for possivel demonstrar:

- entrada de dados;
- tratamento completo;
- decisao por regras;
- saida organizada;
- comunicacao do resultado;
- historico do processamento.

Se o projeto provar isso de forma clara, ele ja cumpre sua funcao como case publico.

