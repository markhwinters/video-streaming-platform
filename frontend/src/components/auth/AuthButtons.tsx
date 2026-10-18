import { Show, SignInButton, SignUpButton } from '@clerk/react'

function AuthButtons() {
  return (
    <Show when="signed-out">
      <nav className="flex items-center gap-2 sm:gap-3" aria-label="Authentication">
        <SignInButton mode="modal">
          <button
            className="rounded-md px-3 py-2.5 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-300 sm:px-4"
            type="button"
          >
            Sign in
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button
            className="rounded-md bg-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-950/40 transition hover:bg-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-200 focus:ring-offset-2 focus:ring-offset-[#09090f]"
            type="button"
          >
            <span className="hidden sm:inline">Start watching</span>
            <span className="sm:hidden">Join</span>
          </button>
        </SignUpButton>
      </nav>
    </Show>
  )
}

export default AuthButtons
