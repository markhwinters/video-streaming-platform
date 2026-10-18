import { Show } from '@clerk/react'
import AccountMenu from '../account/AccountMenu'
import AuthButtons from '../auth/AuthButtons'

function AppHeader() {
  return (
    <header className="relative z-30 border-b border-white/10 bg-[#09090f]/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-5 px-6 sm:px-10 lg:px-16">
        <div className="flex items-center gap-10">
          <a className="flex items-center gap-2.5 text-lg font-black tracking-[0.12em] text-white" href="/">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-fuchsia-500 text-sm text-white shadow-lg shadow-fuchsia-950/50">
              S
            </span>
            STREAMLAB
          </a>
          <nav className="hidden items-center gap-7 text-sm text-white/60 md:flex" aria-label="Main navigation">
            <a className="text-white transition hover:text-fuchsia-200" href="/">Home</a>
            <a className="transition hover:text-white" href="#collection">Browse</a>
            <a className="transition hover:text-white" href="#collection">My list</a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <AuthButtons />
          <Show when="signed-in">
            <AccountMenu />
          </Show>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
