import { schema } from './schema.mjs'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateSubmission(input, locale = 'en') {
  const messages = schema.locales[locale]?.errors ?? schema.locales.en.errors
  const errors = {}

  for (const field of schema.fields) {
    const value = String(input[field.name] ?? '').trim()

    if (field.required && value.length === 0) {
      errors[field.name] = messages.required
      continue
    }

    if (field.type === 'email' && value.length > 0 && !emailPattern.test(value)) {
      errors[field.name] = messages.email
      continue
    }

    if (field.minLength && value.length > 0 && value.length < field.minLength) {
      errors[field.name] = messages.minLength.replace('{min}', String(field.minLength))
    }
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

if (process.argv.includes('--self-test')) {
  const valid = validateSubmission({
    name: 'Mirogate',
    email: 'hello@mirogate.com',
    organization: 'Mirogate',
    brief: 'We need a bilingual enterprise form for mandate intake.'
  })

  const invalidArabic = validateSubmission({
    name: '',
    email: 'not-an-email',
    brief: 'قصير'
  }, 'ar')

  assert(valid.ok, 'Expected valid English submission')
  assert(!invalidArabic.ok, 'Expected invalid Arabic submission')
  assert(invalidArabic.errors.name === schema.locales.ar.errors.required, 'Expected Arabic required message')
  assert(Boolean(invalidArabic.errors.email), 'Expected email validation error')
  assert(Boolean(invalidArabic.errors.brief), 'Expected brief length validation error')

  console.log('bilingual-enterprise-form-kit validation passed')
}
