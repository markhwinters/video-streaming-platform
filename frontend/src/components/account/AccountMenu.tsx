import { useState } from 'react'
import { Show, SignOutButton, useUser } from '@clerk/react'
import ApiConnectionTest from './ApiConnectionTest'

function AccountMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUser()
  const email = user?.primaryEmailAddress?.emailAddress
  const avatar = email?.charAt(0).toUpperCase() ?? 'A'

  return (
    <Show when="signed-in">
      <div className="relative">
        <button
          className="flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1 pl-1 pr-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
          type="button"
          aria-expanded={isOpen}
          aria-controls="account-menu-panel"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-fuchsia-400 to-violet-600 font-bold text-white">
            {avatar}
          </span>
          <span className="hidden sm:inline">My account</span>
          <svg
            className={`h-4 w-4 text-white/50 transition ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.2 7.2a.75.75 0 0 1 1.06 0L10 10.94l3.74-3.74a.75.75 0 1 1 1.06 1.06l-4.27 4.27a.75.75 0 0 1-1.06 0L5.2 8.26a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>

        {isOpen && (
          <div
            className="absolute right-0 top-[calc(100%+0.75rem)] w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-white/10 bg-[#17151e] p-4 shadow-2xl shadow-black/60"
            id="account-menu-panel"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-fuchsia-400 to-violet-600 font-bold">
                {avatar}
              </span>
              <div className="min-w-0">
                <p className="text-xs text-white/45">Signed in as</p>
                <p className="truncate text-sm font-medium text-white">{email ?? 'Clerk user'}</p>
              </div>
            </div>

            <ApiConnectionTest />

            <SignOutButton>
              <button
                className="mt-3 w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-300"
                type="button"
              >
                Sign out
              </button>
            </SignOutButton>
          </div>
        )}
      </div>
    </Show>
  )
}

export default AccountMenu
