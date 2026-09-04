# Deployment Runbook

This project is the Mariutil tools directory. It is deployed independently from the individual utilities.

## Production architecture

| URL                              | Purpose                       | Cloudflare Pages project |
| -------------------------------- | ----------------------------- | ------------------------ |
| `https://mariutil.com/`          | Main Mariutil tools directory | `mariutil-home`          |
| `https://screen.mariutil.com/`   | Screen Recorder               | `screensnap`             |
| `https://json.mariutil.com/`     | JSON Formatter                | `json-formatter`         |
| `https://xml2json.mariutil.com/` | XML to JSON                   | `xml-json-formatter`     |

## Reusable site shell

The shared React shell is in `src/components/SiteHeader.tsx` and `src/components/SiteFooter.tsx`. Use these components, `Feedback.tsx`, and their existing CSS rules in each tool project to preserve a consistent Mariutil experience.

The header and footer use absolute `https://mariutil.com/` links, so they return visitors to the directory when rendered on any tool subdomain. Each tool project must set its own `VITE_FEEDBACK_API_URL` build variable for the feedback modal.

## Deploy the homepage

Build and publish the static site:

```bash
npm run build
npx wrangler pages deploy dist --project-name mariutil-home --branch main
```

The stable project URL is `https://mariutil-home.pages.dev/`. Verify it before changing a custom domain.

## Configure feedback

The feedback modal requires a build-time Cloudflare Pages environment variable:

```text
VITE_FEEDBACK_API_URL=https://<worker-url>
```

Set it in **Cloudflare Pages > mariutil-home > Settings > Environment variables** for the Production environment. Redeploy after setting or changing it because Vite embeds `VITE_*` variables at build time.

The Worker must accept a `POST` JSON payload in this shape:

```json
{
  "rating": 1,
  "message": "Feedback message with 3 to 1000 characters"
}
```

`rating` may also be `null`. A successful response must return `{ "ok": true }`.

## Move the root domain

`mariutil.com` and `www.mariutil.com` are currently attached to the `screensnap` project. Complete the Screen Recorder move first so there is always a working recorder URL.

1. Deploy the Screen Recorder project and attach `screen.mariutil.com` to `screensnap`.
2. Verify `https://screen.mariutil.com/` loads the recorder and has a self-referencing canonical URL.
3. In Cloudflare Pages, remove `mariutil.com` and `www.mariutil.com` from `screensnap`.
4. Add `mariutil.com` and `www.mariutil.com` to `mariutil-home` as custom domains.
5. Verify both root domains load this directory site. Choose one canonical host and redirect the other to it. This site is configured to use `https://mariutil.com/`.

Do not redirect `https://mariutil.com/` to the Screen Recorder after this migration: the root URL must serve the Mariutil directory.

## Launch verification

After deployment and the domain move, check:

- `https://mariutil.com/` returns the directory homepage.
- `https://mariutil.com/robots.txt` is reachable.
- `https://mariutil.com/sitemap.xml` is reachable.
- The JSON Formatter, XML to JSON, and Screen Recorder cards open their respective subdomains.
- The feedback form submits successfully to the Worker.
- The canonical URL, Open Graph URL, and JSON-LD still identify `https://mariutil.com/`.

## Google indexing

After the domain move is live, use Google Search Console to inspect and request indexing for:

- `https://mariutil.com/`
- `https://screen.mariutil.com/`
- `https://json.mariutil.com/`
- `https://xml2json.mariutil.com/`

Submit `https://mariutil.com/sitemap.xml`. Each tool subdomain should use a self-referencing canonical URL and metadata specific to that utility.
