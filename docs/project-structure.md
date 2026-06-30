# Estrutura do Projeto

## Estrutura Prevista

```text
operational-automation-demo/
  README.md

  config/

  docs/
    vision.md
    business-problem.md
    workflow.md
    architecture.md
    project-structure.md
    roadmap.md

  input/

  output/

  archive/

  logs/

  reports/

  src/
    domain/
    application/
    infrastructure/
    interfaces/

  tests/
```

Esta estrutura descreve a organizacao futura do projeto. Nesta etapa, apenas a documentacao deve existir.

## README.md

Documento principal do repositorio.

Deve explicar rapidamente:

- o que o projeto faz;
- qual problema resolve;
- como o fluxo funciona;
- quais tecnologias estao previstas;
- por que o projeto existe.

## config/

Pasta prevista para configuracoes simples do fluxo.

Exemplos futuros:

- caminhos de entrada e saida;
- nomes de arquivos;
- parametros de validacao;
- configuracoes de notificacao simulada.

No MVP, as configuracoes devem permanecer simples e locais.

## docs/

Pasta de documentacao do projeto.

Ela serve como material publico de portfolio, apoio comercial e explicacao tecnica.

Deve ser escrita para dois publicos:

- pessoas de negocio que querem entender o valor;
- pessoas tecnicas que querem avaliar a qualidade da arquitetura.

## input/

Pasta prevista para arquivos CSV recebidos.

Representa a entrada operacional do processo.

Cada arquivo nessa pasta deve ser considerado um lote pendente de processamento.

## output/

Pasta prevista para arquivos processados.

Pode conter:

- clientes validos;
- clientes invalidos;
- registros duplicados;
- dados enriquecidos;
- resumo estruturado do processamento.

## archive/

Pasta prevista para guardar arquivos originais ja processados.

O objetivo e manter rastreabilidade e evitar que o mesmo arquivo seja processado repetidamente por engano.

## logs/

Pasta prevista para registros tecnicos do processamento.

Os logs devem ajudar a diagnosticar falhas e entender o comportamento do fluxo.

## reports/

Pasta prevista para relatorios de negocio.

Os relatorios devem ser legiveis e objetivos, com indicadores sobre o lote processado.

## src/

Pasta prevista para o codigo-fonte da automacao.

Deve seguir a separacao proposta na arquitetura:

```text
src/
  domain/
  application/
  infrastructure/
  interfaces/
```

## src/domain/

Camada de dominio.

Deve concentrar entidades, objetos de valor e regras centrais do processo.

Nao deve depender de arquivos, CSV, APIs, logs ou bibliotecas externas especificas.

## src/application/

Camada de aplicacao.

Deve conter os casos de uso que coordenam o fluxo operacional.

Ela sabe a ordem das etapas, mas depende de abstracoes para executar detalhes externos.

## src/infrastructure/

Camada de infraestrutura.

Deve conter implementacoes concretas para leitura, escrita, logs, relatorios, enriquecimento simulado, notificacoes e arquivamento.

## src/interfaces/

Camada de entrada.

No MVP, pode conter a forma local de iniciar o processo. Futuramente, pode receber CLI, agendamento ou outros adaptadores de entrada.

## tests/

Pasta prevista para testes automatizados.

Embora nao faca parte desta etapa, a estrutura considera testes desde o desenho inicial.

Futuramente, deve cobrir:

- regras de dominio;
- casos de uso;
- validacao;
- limpeza;
- deduplicacao;
- relatorios;
- tratamento de erros.

## Principio de Organizacao

A estrutura deve ajudar o visitante a entender o projeto rapidamente.

Cada pasta existe para apoiar o fluxo operacional. Nada deve ser adicionado apenas para parecer mais sofisticado.

