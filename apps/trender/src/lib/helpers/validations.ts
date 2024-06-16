import { z, type ZodError } from 'zod'

const schema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
})

export function validateFormEmail(formData: FormData) {
  const email = formData.get('email') as string

  if (!email) {
    return { valid: false, email: '' }
  }

  try {
    schema.parse({ email })
    return { valid: true, email: email.trim() }
  } catch (err) {
    console.error('Invalid email: ', (err as ZodError).message)
    return { valid: false, email }
  }
}
