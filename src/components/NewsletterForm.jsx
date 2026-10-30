import { useId, useState } from 'react'
import { ArrowRight } from './Icons'

export default function NewsletterForm({ compact = false }) {
  const id = useId()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const submit = (event) => {
    event.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!valid) {
      setStatus('error')
      return
    }
    setStatus('success')
    setEmail('')
  }

  return (
    <form
      className={`newsletter ${compact ? 'newsletter--compact' : ''}`}
      onSubmit={submit}
      noValidate
    >
      <label className="visually-hidden" htmlFor={id}>
        Email address
      </label>
      <div className="newsletter__row">
        <input
          id={id}
          type="email"
          name="email"
          placeholder="Email address"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (status !== 'idle') setStatus('idle')
          }}
          autoComplete="email"
          aria-invalid={status === 'error'}
          aria-describedby={`${id}-note`}
        />
        <button type="submit" className="newsletter__submit" aria-label="Subscribe">
          <ArrowRight size={18} />
        </button>
      </div>
      <p
        id={`${id}-note`}
        className={`newsletter__note ${status === 'error' ? 'is-error' : ''} ${status === 'success' ? 'is-success' : ''}`}
        aria-live="polite"
      >
        {status === 'error'
          ? 'Please enter a valid email address.'
          : status === 'success'
            ? 'Thank you — you are on the list.'
            : 'Notes from the atelier. No more than once a month.'}
      </p>
    </form>
  )
}
