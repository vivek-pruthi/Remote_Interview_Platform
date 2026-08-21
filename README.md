![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/vivek-pruthi/Remote_Interview_Platform?utm_source=oss&utm_medium=github&utm_campaign=vivek-pruthi%2FRemote_Interview_Platform&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

## Deploy (Render)

This project is configured as a single Node service that serves the built frontend from the backend.

- Build command: `npm run build`
- Start command: `npm start`
- Root directory: repository root

You can deploy manually in Render dashboard or use the included `render.yaml`.

### 1) Create a MongoDB database and set `DB_URL`

Use a managed MongoDB provider (MongoDB Atlas or an existing cluster), then copy the connection string into `DB_URL`.

### 2) Configure environment variables

Set the following in your Render service:

- `PORT` (Render provides this automatically)
- `NODE_ENV=production`
- `DB_URL`
- `CLIENT_URL` (your deployed app URL, for example `https://your-service.onrender.com`)
- `VITE_API_URL` (for single-service deployment, set to `/api`)
- `VITE_CLERK_PUBLISHABLE_KEY`
- `STREAM_API_KEY`
- `STREAM_API_SECRET`
- `INNGEST_EVENT_KEY`
- `INNGEST_SIGNING_KEY`
- `GLOT_TOKEN` (or `GLOT_API_KEY`)

Use `.env.example` as a reference.

### 3) Deploy service

Create one Web Service in Render from this repository:

- Runtime: Node
- Root directory: `.`
- Build command: `npm run build`
- Start command: `npm start`

### 4) Post-deploy verification

After deploy:

1. `GET /health` returns a success response.
2. Frontend loads correctly.
3. API requests under `/api/*` succeed.
4. Clerk authentication works.
5. Stream chat/video calls initialize correctly.
6. Code execution endpoint returns output/errors as expected.
