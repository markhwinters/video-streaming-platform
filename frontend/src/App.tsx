import AppHeader from './components/layout/AppHeader'

const collections = [
  {
    name: 'Edge of the Unknown',
    category: 'Adventure',
    colors: 'from-sky-300/40 via-indigo-950 to-slate-950',
    detail: 'A little wonder goes a long way.',
  },
  {
    name: 'After the Last Light',
    category: 'Drama',
    colors: 'from-rose-300/40 via-fuchsia-950 to-slate-950',
    detail: 'Stories that stay with you.',
  },
  {
    name: 'Wild at Heart',
    category: 'Nature',
    colors: 'from-emerald-300/40 via-teal-950 to-slate-950',
    detail: 'Find your way back outside.',
  },
  {
    name: 'Somewhere in Time',
    category: 'Sci-fi',
    colors: 'from-amber-200/40 via-violet-950 to-slate-950',
    detail: 'Tomorrow is another world.',
  },
]

function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#09090f] text-white">
      <AppHeader />

      <main>
        <section className="relative isolate flex min-h-[620px] items-end overflow-hidden sm:min-h-[700px]">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_72%_35%,rgba(112,55,157,0.42),transparent_38%),linear-gradient(120deg,#12121b_5%,#201329_52%,#0b0b12_100%)]" />
          <div className="absolute -right-20 top-12 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl sm:right-[12%] sm:top-20 sm:h-[28rem] sm:w-[28rem]" />
          <div className="absolute bottom-0 left-0 right-0 -z-10 h-64 bg-gradient-to-t from-[#09090f] via-[#09090f]/70 to-transparent" />

          <div className="mx-auto w-full max-w-7xl px-6 pb-20 pt-36 sm:px-10 sm:pb-28 lg:px-16">
            <div className="max-w-2xl">
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-fuchsia-200 sm:text-sm">
                <span className="h-px w-8 bg-fuchsia-300" />
                Your next story starts here
              </p>
              <h1 className="text-5xl font-semibold leading-[1.04] tracking-tight sm:text-7xl lg:text-8xl">
                Make room
                <br />
                for <span className="text-fuchsia-300">wonder.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                Settle in for worlds to get lost in, characters to root for, and
                stories you’ll want to share.
              </p>
              <a
                className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-md bg-white px-6 font-semibold text-slate-950 transition hover:bg-fuchsia-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-300 focus:ring-offset-2 focus:ring-offset-[#09090f]"
                href="#collection"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path d="M6.5 4.8c0-.8.9-1.3 1.6-.9l7.3 4.6a1.2 1.2 0 0 1 0 2l-7.3 4.6c-.7.4-1.6-.1-1.6-.9V4.8Z" />
                </svg>
                Explore the collection
              </a>
            </div>
            <div className="mt-14 flex items-center gap-2" aria-hidden="true">
              <span className="h-1 w-8 rounded-full bg-fuchsia-300" />
              <span className="h-1 w-2 rounded-full bg-white/30" />
              <span className="h-1 w-2 rounded-full bg-white/30" />
              <span className="ml-2 text-xs text-white/45">A little something for every mood</span>
            </div>
          </div>
        </section>

        <section id="collection" className="mx-auto max-w-7xl px-6 pb-24 pt-4 sm:px-10 lg:px-16">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-fuchsia-300">
                Find your next favorite
              </p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">A world of stories</h2>
            </div>
            <span className="hidden text-sm text-white/45 sm:block">Curated for your next night in</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {collections.map((collection, index) => (
              <article
                className="group relative isolate flex min-h-72 overflow-hidden rounded-xl border border-white/10 bg-slate-900 p-5 transition duration-300 hover:-translate-y-1 hover:border-fuchsia-200/40"
                key={collection.name}
              >
                <div className={`absolute inset-0 -z-20 bg-gradient-to-br ${collection.colors}`} />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
                <span className="absolute right-5 top-4 text-6xl font-black tracking-tighter text-white/[0.08]">
                  0{index + 1}
                </span>
                <div className="mt-auto">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-200">
                    {collection.category}
                  </p>
                  <h3 className="text-xl font-semibold">{collection.name}</h3>
                  <p className="mt-2 text-sm text-white/60">{collection.detail}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs text-white/35">
            Preview collections — connect the catalog to show available titles.
          </p>
        </section>
      </main>
    </div>
  )
}

export default App
