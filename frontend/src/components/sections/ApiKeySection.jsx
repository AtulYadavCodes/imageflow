import { HashLink } from 'react-router-hash-link'

function ApiKeySection() {
  return (
    <section id="api-key" className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <div className="flex flex-col items-start justify-between gap-4 border-2 border-zinc-700 bg-zinc-900 p-5 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">Developer Access</p>
          <h3 className="mt-1 font-mono text-xl font-semibold text-zinc-100">Make your API Keys</h3>
        </div>

        <HashLink
          to="/apikey"
          className="rounded-md border border-zinc-500 bg-zinc-100 px-3 py-2 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-zinc-900 transition hover:bg-zinc-200"
        >
          Manage Your API Key
        </HashLink>
      </div>
    </section>
  )
}

export default ApiKeySection