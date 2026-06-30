# Workflow

## Fluxo Completo

```text
Input
  |
  v
Validation
  |
  v
Cleanup
  |
  v
Deduplication
  |
  v
Enrichment
  |
  v
Business Rules
  |
  v
Output
  |
  v
Reports
  |
  v
Notifications
  |
  v
Archive
  |
  v
Logs
```

## 1. Input

O processo comeca com um arquivo CSV colocado na pasta de entrada.

Esse arquivo representa a rotina diaria da empresa: uma lista de novos clientes que precisam ser tratados antes de entrar no fluxo comercial ou administrativo.

Responsabilidades desta etapa:

- localizar arquivos pendentes;
- identificar o lote de processamento;
- carregar os dados brutos;
- preservar o arquivo original para auditoria.

## 2. Validation

A validacao verifica se cada registro possui os dados minimos para seguir no processo.

Exemplos de validacoes:

- nome obrigatorio;
- email em formato valido;
- telefone presente quando exigido;
- documento com estrutura aceitavel;
- origem do cliente informada;
- colunas esperadas no arquivo.

Registros invalidos nao devem interromper todo o processamento. Eles devem ser separados, reportados e tratados como excecoes conhecidas.

## 3. Cleanup

A limpeza padroniza os dados para reduzir inconsistencias.

Exemplos:

- remover espacos desnecessarios;
- normalizar letras maiusculas e minusculas;
- padronizar telefones;
- limpar caracteres invalidos;
- ajustar nomes de cidades;
- converter campos para formatos esperados.

Esta etapa melhora a qualidade dos dados antes da aplicacao das regras de negocio.

## 4. Deduplication

A remocao de duplicados evita que o mesmo cliente seja processado mais de uma vez.

Possiveis criterios:

- mesmo email;
- mesmo documento;
- combinacao de nome e telefone;
- prioridade para o registro mais completo.

O resultado deve indicar quantos duplicados foram encontrados e quais registros foram mantidos.

## 5. Enrichment

O enriquecimento adiciona informacoes ao registro usando uma fonte externa simulada.

No MVP, essa fonte deve ser uma API fake ou um servico local simulado. Isso permite demonstrar a arquitetura sem depender de terceiros.

Exemplos de enriquecimento:

- regiao do cliente;
- segmento sugerido;
- score ficticio;
- tipo de conta;
- indicador de prioridade.

## 6. Business Rules

As regras de negocio transformam dados tratados em decisoes operacionais.

Exemplos:

- marcar clientes incompletos para revisao;
- classificar leads como alta, media ou baixa prioridade;
- definir canal de atendimento;
- separar clientes por regiao;
- identificar registros prontos para envio ao time comercial.

Essa etapa deve ser isolada para que novas regras possam ser adicionadas sem afetar leitura, validacao ou geracao de arquivos.

## 7. Output

O output gera arquivos processados com os resultados do fluxo.

Saidas previstas:

- clientes validos e aprovados;
- clientes invalidos;
- registros duplicados;
- dados enriquecidos;
- resumo do lote.

Os arquivos devem ser simples, legiveis e faceis de auditar.

## 8. Reports

O relatorio apresenta os principais indicadores do processamento.

Indicadores esperados:

- total de registros recebidos;
- total de registros validos;
- total de registros invalidos;
- total de duplicados removidos;
- total de registros enriquecidos;
- distribuicao por prioridade;
- tempo de processamento;
- principais motivos de rejeicao.

O relatorio deve comunicar valor operacional sem exigir leitura tecnica profunda.

## 9. Notifications

A notificacao informa que o processamento terminou e resume o resultado.

No MVP, a notificacao pode ser simulada por um arquivo de saida ou mensagem registrada em log. Em fases futuras, pode evoluir para email, Slack, WhatsApp ou outro canal.

## 10. Archive

O arquivo original deve ser movido para uma area de arquivamento apos o processamento.

O objetivo e manter rastreabilidade:

- o que foi recebido;
- quando foi processado;
- qual lote gerou quais saidas;
- onde estao os relatorios correspondentes.

## 11. Logs

Os logs registram eventos relevantes do processo.

Devem permitir responder:

- quando o fluxo iniciou;
- qual arquivo foi processado;
- quantos registros foram tratados;
- quais erros ocorreram;
- quando o fluxo terminou;
- onde os resultados foram salvos.

Logs nao substituem relatorios. Eles servem para diagnostico tecnico e auditoria operacional.

