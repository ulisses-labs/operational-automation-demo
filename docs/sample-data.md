# Sample Data

## Objective

This document describes the fictional input dataset for the MVP.

The dataset represents a daily operational batch of customer requests received by a small operations team. It is intentionally imperfect so future implementation steps can exercise realistic data handling scenarios.

## File Location

The sample input file is located at:

```text
data/input/customer_requests.csv
```

## Columns

The CSV file uses the following columns:

| Column | Description |
| --- | --- |
| `request_id` | Fictional unique identifier for the request in the input batch. |
| `customer_name` | Customer name as received from the source file. |
| `email` | Customer email address as received from the source file. |
| `phone` | Customer phone number as received from the source file. |
| `city` | Customer city as received from the source file. |
| `request_type` | Type of customer request. |
| `estimated_value` | Fictional estimated monetary value associated with the request. |
| `submitted_at` | Timestamp when the request was submitted. |

## Valid Request Types

The expected request types are:

```text
support
onboarding
upgrade
cancellation
billing
```

Any other value should be treated by future processing as invalid or requiring rejection, depending on the business rules implemented later.

## Intentional Data Issues

The dataset includes both valid and intentionally problematic records.

Examples of intentional issues include:

- duplicate emails;
- invalid email formats;
- empty customer names;
- customer names with extra spaces;
- emails with uppercase letters;
- phone numbers in different formats;
- empty phone numbers;
- city names with inconsistent capitalization;
- invalid `request_type` values;
- empty `estimated_value` values;
- low `estimated_value` values;
- empty `submitted_at` values.

These issues exist to support future CSV loading, validation, normalization, deduplication, business rules, reporting, simulated notification, archive, and logs work.

## Expected Future Usage

This dataset should guide the next MVP implementation steps:

- CSV loading;
- validation;
- normalization;
- deduplication;
- business rules;
- reporting;
- simulated notification;
- archive;
- logs.

Future processing may split records into approved, manual review, rejected, and duplicate outputs. This task only provides the source data and its contract.

## Data Privacy

All records are fictional.

The dataset must not contain real customer data, real emails, real phone numbers, or real operational records. Email domains are limited to documentation or local-use domains such as:

```text
example.com
demo.test
sample.local
```

The phone numbers, names, cities, request identifiers, timestamps, and values are sample data for development and portfolio demonstration only.

## Out of Scope

This task does not implement:

- CSV reading;
- validation;
- normalization;
- deduplication;
- business rules;
- output files;
- reports;
- notifications;
- archive;
- logs.
