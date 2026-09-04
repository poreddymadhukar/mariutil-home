# Mariutil Home

The main directory for Mariutil browser utilities. Individual tools are hosted on their own subdomains.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the Cloudflare Pages deployment, custom-domain migration, feedback configuration, and Google indexing checklist.

## Local development

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Vite prints the local URL after starting. Use `npm run build` to create a production build in `dist/`, and `npm run preview` to serve that build locally.

## Feedback endpoint

Create a `.env` file in the project root with the deployed Cloudflare Worker URL:

```text
VITE_FEEDBACK_API_URL=https://<worker-url>
```

The Worker must accept `POST` JSON in the form `{ "rating": 1..5 or null, "message": "3..1000 characters" }` and return `{ "ok": true }` for a successful submission.

## Cloudflare Pages

Create a new Cloudflare Pages project connected to this repository. Configure it with:

- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `20` (or newer)

Add `mariutil.com` as the custom domain in the Pages project. The static `robots.txt` and `sitemap.xml` files are included in the production build.
