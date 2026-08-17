# StepUp backend

This Express API supports the instructor requirements: public deliverables, version history, an instructor login and a protected upload workflow.

## Setup

1. Copy `.env.example` to `.env` and add the Aiven MySQL details from MySQL Workbench.
2. From this folder run `npm install`.
3. Run `npm run setup` once to create the database tables and the first instructor account.
4. Run `npm run dev`.

The frontend can call `http://localhost:4000/api`. Aiven normally requires TLS, so `DB_SSL=true` is the default. If your Aiven connection needs a CA certificate, download it from the Aiven console and set `DB_SSL_CA` to its absolute path.

## Main routes

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/deliverables`
- `GET /api/versions`
- `POST /api/deliverables` (instructor token + multipart file)

Files are stored locally in `uploads/` for now. Metadata and version history are stored in MySQL.
