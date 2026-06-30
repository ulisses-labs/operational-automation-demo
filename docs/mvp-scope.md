# MVP Scope

## Objective

The MVP must demonstrate a local, end-to-end operational automation using Node.js + TypeScript.

Core message:

```text
Receive an operational CSV, validate it, clean it, enrich it with simulated data, apply business rules, generate outputs, write a report, simulate a notification, archive the processed input, and log the execution.
```

The goal is not to build a large platform. The goal is to prove that a realistic operational routine can be automated with clear boundaries, reliable outputs, and a simple architecture that can evolve later.

## Primary Language Decision

The MVP will use Node.js + TypeScript as the primary implementation stack.

This decision is based on:

- better alignment with backend and operational automation work;
- better alignment with APIs and integrations;
- TypeScript support for contracts, models, and business rules;
- strong fit with Clean Architecture;
- reinforcement of the founder's core experience with JavaScript, TypeScript, Node.js, backend systems, and automations;
- complementarity with the `spreadsheet-cleanup-demo` project, which already demonstrates Python.

Python must not be used as the main implementation language for this project.

## Business Scenario

A small operations team receives a daily CSV with new customer requests.

Today, a person manually validates records, fixes fields, removes duplicates, checks customer priority, creates reports, sends a summary, and archives files.

The MVP automates this flow locally.

## MVP Workflow

```text
Input CSV
  |
  v
Load batch
  |
  v
Validate records
  |
  v
Normalize fields
  |
  v
Remove duplicates
  |
  v
Enrich records with simulated provider
  |
  v
Apply business rules
  |
  v
Generate output files
  |
  v
Generate Markdown report
  |
  v
Write execution logs
  |
  v
Create simulated notification
  |
  v
Archive processed input
```

## Input Files

The MVP will use one fictional CSV input file:

```text
data/input/customer_requests.csv
```

Suggested columns:

```text
request_id,customer_name,email,phone,city,request_type,estimated_value,submitted_at
```

The dataset should intentionally include realistic data quality problems:

- duplicate emails;
- invalid emails;
- customer names with extra spaces;
- phone numbers in different formats;
- inconsistent city names;
- missing values;
- inconsistent request types.

The input file represents one operational batch.

## Output Files

The MVP will generate local output files:

```text
data/output/approved_requests.csv
data/output/manual_review_requests.csv
data/output/rejected_requests.csv
data/output/duplicate_requests.csv
```

Each output file must have a clear operational purpose:

- `approved_requests.csv`: records ready to continue in the process;
- `manual_review_requests.csv`: records that are not rejected but need human review;
- `rejected_requests.csv`: records that failed validation or business rules;
- `duplicate_requests.csv`: records removed because they duplicate another request.

## Reports and Logs

The MVP will generate:

```text
reports/processing_report.md
logs/automation.log
```

The Markdown report must include:

- total received;
- total approved;
- total for manual review;
- total rejected;
- duplicates removed;
- enriched records;
- priority distribution;
- rejection reasons;
- execution time.

The log file must record technical execution events, including process start, input file loaded, validation results, output files written, archive action, errors, and process completion.

## Simulated Notification

The MVP will create a simulated notification file:

```text
notifications/processing_summary.txt
```

The message must be short and operational, for example:

```text
Daily customer request batch processed.
Approved: X
Manual review: Y
Rejected: Z
```

This file stands in for a future email, Slack, WhatsApp, or other integration.

## Core Components

The MVP should include these core components:

- CSV batch loader;
- record validator;
- field normalizer;
- duplicate detector;
- simulated enrichment provider;
- business rule engine;
- output file writer;
- Markdown report generator;
- local logger;
- simulated notification writer;
- input archiver;
- local entrypoint to run the automation.

The components should follow the architecture already described in the repository:

- domain for business concepts and rules;
- application for use case orchestration;
- infrastructure for files, logs, reports, notifications, enrichment simulation, and archiving;
- interface or entrypoint for local execution.

## Initial Business Rules

The initial rules should be simple and explainable:

- reject records without a valid email;
- reject records without a customer name;
- reject records without a request type;
- mark records with missing phone numbers for manual review;
- mark records with missing or invalid estimated value for manual review;
- remove duplicates by email, keeping the most complete record;
- normalize customer names by trimming extra spaces;
- normalize emails to lowercase;
- normalize known city name variations;
- enrich valid non-duplicate records with a simulated priority;
- approve records that pass validation, are not duplicates, and do not require manual review.

Suggested priority values:

```text
high
medium
low
```

The exact priority logic can be simulated, but it must be deterministic enough to test.

## Validation Rules

The MVP should validate:

- required columns exist in the CSV;
- `request_id` is present;
- `customer_name` is present after trimming;
- `email` is present and has a valid basic email format;
- `request_type` is present and belongs to an accepted set;
- `estimated_value`, when present, can be parsed as a number;
- `submitted_at`, when present, can be parsed as a date.

Invalid records must not crash the full batch. They must be separated into the appropriate output file and counted in the report.

## Out of Scope

The MVP must not include:

- database persistence;
- real third-party APIs;
- real email, Slack, WhatsApp, or CRM integrations;
- frontend;
- authentication;
- Docker;
- Kubernetes;
- distributed queues;
- microservices;
- background workers;
- cloud deployment;
- AI-based classification;
- multiple input file formats;
- advanced scheduling;
- admin dashboard;
- complex configuration system.

These items may be useful later, but they would increase scope before the core automation is proven.

## Completion Criteria

The MVP is complete when a local execution can:

- read `data/input/customer_requests.csv`;
- validate every record;
- normalize fields;
- remove duplicate records;
- enrich eligible records with simulated data;
- apply the initial business rules;
- generate all four output CSV files;
- generate `reports/processing_report.md`;
- generate `logs/automation.log`;
- generate `notifications/processing_summary.txt`;
- archive the processed input file;
- finish without manual intervention after execution starts.

## Acceptance Criteria

The MVP is accepted when:

- the project uses Node.js + TypeScript as the main implementation stack;
- the local command for running the automation is documented;
- the expected sample input file exists;
- all expected output files are generated;
- invalid records are handled without stopping the whole batch;
- duplicate records are identified and reported;
- the report shows the required totals and operational summary;
- the simulated notification contains the final processing counts;
- logs show the main execution steps;
- the processed input is archived;
- automated tests cover the main validation, normalization, deduplication, and business rule behavior.

## Implementation Guardrails

Keep the MVP intentionally small.

Use local files, simple commands, and deterministic simulated data. Prefer clear code and explicit boundaries over clever abstractions.

The implementation should:

- follow the existing Clean Architecture direction;
- keep business rules independent from CSV, filesystem, and logging details;
- use TypeScript types and interfaces to make contracts visible;
- avoid adding infrastructure that is not required for the local demo;
- avoid turning the project into a generic workflow platform;
- keep configuration simple and local;
- keep outputs easy to inspect manually;
- make failures visible through logs and reports;
- prioritize an understandable portfolio-quality demo over feature volume.
