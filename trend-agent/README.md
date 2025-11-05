## Trend Intelligence & AI Content Strategy Agent

Production-ready Next.js 16 application that orchestrates a full trend-intel workflow for the Pune & PCMC real estate market. The agent:

- Pulls structured signals from NewsAPI, YouTube Data API v3, and (optional) Instagram/n8n pipelines.
- Filters duplicates, noisy domains, and irrelevant chatter before building a unified dataset.
- Calls an LLM (OpenAI GPT-4o mini) to summarize signals, detect patterns, and craft fresh marketing strategies.
- Maintains institutional memory by reading and appending to Google Sheets, ensuring no campaign idea is reused.

### 1. Environment variables

Copy `.env.example` → `.env.local` and set:

```bash
NEWS_API_KEY=your_news_api_key
YOUTUBE_API_KEY=your_youtube_api_key
OPENAI_API_KEY=sk-...
GOOGLE_SHEETS_ID=sheet_id
GOOGLE_CLIENT_EMAIL=service_account_email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

- Google Sheets: create a service account, share the sheet with the service account email, and keep the first sheet named `Sheet1` with columns `timestamp | summary | pattern_slugs | idea_titles | dataset_size | reference`.
- Instagram: connect your own n8n webhook/service and adapt `fetchInstagramInsights` to map payloads into `RawInsight` objects.

### 2. Run locally

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and run a sweep via the control panel.

### 3. Manual execution

```bash
curl -X POST http://localhost:3000/api/run \
  -H "Content-Type: application/json" \
  -d '{
        "primaryQuery": "Pune OR PCMC real estate",
        "keywords": ["metro", "ring road"],
        "lookbackDays": 7,
        "youtubeQueries": ["Pune metro update"]
      }'
```

### 4. Deployment

The app is optimized for Vercel. Deploy with:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-7475882d
```

Set the same environment variables in Vercel → Project Settings → Environment Variables before promoting to production.
