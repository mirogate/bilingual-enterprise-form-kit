# bilingual-enterprise-form-kit

Arabic and English enterprise form patterns with direction-aware HTML, localized validation, honeypot protection, and a Cloudflare Worker-style submission handler.

The kit is intentionally framework-light. It gives teams a starting point that can be copied into React, Vue, Astro, Laravel Blade, or a static Cloudflare Pages form.

## Contents

- `examples/index.html` - accessible Arabic/English intake form
- `src/form-schema.json` - fields, labels, validation, and localized messages
- `src/schema.mjs` - runtime schema module for Node and Worker environments
- `src/validate.mjs` - shared validation helpers and smoke tests
- `workers/contact.js` - Cloudflare Worker-style handler with honeypot and rate-limit hooks

## Test

```bash
npm test
```

## Implementation Notes

- Use real labels, not placeholder-only fields.
- Set `dir="rtl"` for Arabic flows and `dir="ltr"` for English flows.
- Localize validation messages, not just labels.
- Validate on the server even when the browser validates first.
- Keep honeypot fields out of the tab order.

## License

MIT
