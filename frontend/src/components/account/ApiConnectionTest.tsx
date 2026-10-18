import { useState } from 'react'
import { useAuth } from '@clerk/react'

type AccountResponse = {
  account: {
    id: string
    status: string
  }
}

function ApiConnectionTest() {
  const { getToken } = useAuth()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function verifyConnection() {
    setLoading(true)
    setMessage('')
    setError('')

    try {
      const token = await getToken()
      if (!token) {
        throw new Error('Clerk did not provide an active session token.')
      }

      const response = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        const details = await response.text()
        throw new Error(`API request failed with status ${response.status}: ${details}`)
      }

      const result = (await response.json()) as AccountResponse
      setMessage(`Connected. Account status: ${result.account.status}.`)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Could not connect to the API.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="border-y border-white/10 py-4" aria-labelledby="api-test-title">
      <h3 className="text-sm font-semibold text-white" id="api-test-title">API connection</h3>
      <p className="mt-1.5 text-xs leading-5 text-white/50">
        Check your signed-in session with the Streamlab API.
      </p>
      <button
        className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-wait disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
        type="button"
        onClick={verifyConnection}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Checking connection
          </>
        ) : (
          'Test API connection'
        )}
      </button>
      {message && (
        <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-emerald-300" role="status">
          <span aria-hidden="true">✓</span>
          {message}
        </p>
      )}
      {error && (
        <p className="mt-3 break-words text-xs leading-5 text-rose-300" role="alert">
          {error}
        </p>
      )}
    </section>
  )
}

export default ApiConnectionTest
