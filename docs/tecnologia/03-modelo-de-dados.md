# 03. Modelo de Dados Inicial

## Entidades Principais
- Workspace
- User
- UserProfile
- SessionRun (free)
- RepoConnection (paid)
- DocumentRun (paid)
- Asset
- Template
- ApprovalPackage (paid)
- PlanSubscription
- BillingEvent

## Campos Essenciais
### Workspace
`id`, `name`, `slug`, `plan_tier` (`free|pro`), `created_at`

### User
`id`, `workspace_id`, `email`, `auth_provider` (`google|github|password`), `email_verified`, `created_at`

### UserProfile
`user_id`, `full_name`, `phone_number`, `phone_country_code`, `accepted_terms_at`, `marketing_opt_in`

### SessionRun (modo gratuito)
`id`, `session_token`, `status`, `input_md_asset_id`, `pdf_asset_id`, `expires_at`, `created_at`

### RepoConnection (modo pago)
`id`, `workspace_id`, `provider`, `repo_full_name`, `oauth_token_ref`, `status`

### DocumentRun (modo pago)
`id`, `workspace_id`, `repo_connection_id`, `base_ref`, `head_ref`, `status`, `started_at`, `finished_at`, `model_version`, `cost_estimate`

### Asset
`id`, `owner_type` (`session|workspace`), `owner_id`, `type` (`md|pdf|image`), `storage_provider` (`firebase|cloudinary`), `path`, `mime_type`, `size_bytes`, `created_at`, `expires_at`

### ApprovalPackage (modo pago)
`id`, `run_id`, `version`, `md_asset_id`, `pdf_asset_id`, `quality_score`, `approved_by`, `approved_at`

### PlanSubscription
`id`, `workspace_id`, `provider` (`abacatepay`), `plan_code`, `status`, `external_customer_id`, `external_subscription_id`, `started_at`, `renewal_at`

### BillingEvent
`id`, `workspace_id`, `provider`, `event_type`, `external_event_id`, `payload_hash`, `processed_at`, `status`

## Relacionamentos
- `Workspace 1:N Users`
- `User 1:1 UserProfile`
- `Workspace 1:1 PlanSubscription`
- `PlanSubscription 1:N BillingEvents`
- `Workspace 1:N RepoConnections`
- `Workspace 1:N DocumentRuns`
- `DocumentRun 1:N ApprovalPackages`
- `SessionRun 1:N Assets`
- `Workspace 1:N Assets`
