function ApiDocsSection({ docs }) {
  return (
    <section id="api-docs" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">API Docs</p>
          <h2 className="mt-2 font-mono text-3xl font-semibold text-zinc-100">Core endpoints</h2>
        </div>
        
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        {docs.map((item) => (
          <article key={item.title} className="border-2 border-zinc-700 bg-zinc-900 p-5">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-400">{item.title}</p>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{item.detail}</p>
            {item.note ? (
              <p className="mt-3 my-1 border border-amber-300/40 bg-amber-200/10 px-3 py-2 text-xs leading-5 text-amber-200">
                Note: {item.note}
              </p>
            ) : null}

             <div className="bg-zinc-950 my-1 p-4 border border-zinc-800 font-mono text-[13px] overflow-x-auto">
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">Usage Example</p>
                <pre className="text-zinc-100">{item.usageExample}</pre>
              </div>

              <p className="text-zinc-400">sample success response</p>
            <div id="success response" className="bg-zinc-950 mx -1 p-4 border border-zinc-800 font-mono text-[13px] overflow-x-auto">
              <pre className="text-emerald-400/90">
              {item.responseexample}
              </pre>
            </div>

              <p className="text-zinc-400">sample error response</p>
            <div className="bg-zinc-950 my-1 mb-3 p-4 border border-zinc-800 font-mono text-[13px] overflow-x-auto">
              <pre className="text-rose-400/90">
              {item.errorexample}
              </pre>
            </div>
            {item.link ?(
              <a href={item.link} target="_blank" className="text-black font-medium  bg-zinc-300 p-2 rounded-md hover:text-2xl">Sdk download</a>):null}


          </article>
        ))}

        <div className="mt-3 flex gap-2">
              <a href="#home" className="font-mono text-sm font-medium text-zinc-400 hover:text-zinc-200">
          Back to top
        </a>
        </div>
      </div>
    </section>
  )
}

export default ApiDocsSection
