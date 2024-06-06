'use client'
import { useState, type FormEvent } from 'react'

export default function RequestMagicLinkPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/requestMagicLink', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Magic link sent! Check your email to log in.')
      } else {
        setMessage(data.error || 'An error occurred. Please try again.')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Magic Link'}
      </button>

      {message && <p>{message}</p>}
    </form>
  )
}
