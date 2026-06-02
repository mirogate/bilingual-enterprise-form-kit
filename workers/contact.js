import { validateSubmission } from '../src/validate.mjs'

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    }
  })

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return json({ ok: false, error: 'method_not_allowed' }, 405)
    }

    const ip = request.headers.get('cf-connecting-ip') ?? 'unknown'
    const key = `contact:${ip}`

    if (env.RATE_LIMIT_KV) {
      const seen = await env.RATE_LIMIT_KV.get(key)
      if (seen) {
        return json({ ok: false, error: 'rate_limited' }, 429)
      }
      await env.RATE_LIMIT_KV.put(key, '1', { expirationTtl: 60 })
    }

    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return json({ ok: false, error: 'invalid_json' }, 400)
    }

    if (String(body.website ?? '').trim() !== '') {
      return json({ ok: true })
    }

    const locale = body.locale === 'ar' ? 'ar' : 'en'
    const result = validateSubmission(body, locale)

    if (!result.ok) {
      return json({ ok: false, errors: result.errors }, 422)
    }

    if (env.SUBMISSIONS_KV) {
      const id = crypto.randomUUID()
      await env.SUBMISSIONS_KV.put(`submission:${id}`, JSON.stringify({
        id,
        locale,
        ip,
        createdAt: new Date().toISOString(),
        name: body.name,
        email: body.email,
        organization: body.organization ?? '',
        brief: body.brief
      }))
    }

    return json({ ok: true })
  }
}
