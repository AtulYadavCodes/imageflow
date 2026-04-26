function TryoutSection({ steps }) {
  return (
    <section id="image-tryout" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="border-2 border-zinc-700 bg-zinc-900 p-6">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">Image Tryout</p>
          <h2 className="mt-3 font-mono text-3xl font-semibold text-zinc-100">Simple upload playground</h2>
          <p className="mt-4 text-sm leading-7 text-zinc-400">
            This section is ready for a file input or preview workflow. You can wire the SDK upload function here later without changing the page structure.
          </p>

          <div className="mt-6 space-y-3">
            {steps.map((step, index) => (
              <div key={step} className="flex items-start gap-3 border border-zinc-700 bg-zinc-950 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-zinc-500 bg-zinc-900 font-mono text-sm font-semibold text-zinc-200">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-zinc-300">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-2 border-zinc-700 bg-zinc-900 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-500">Tryout panel</p>
              <h3 className="mt-1 font-mono text-2xl font-semibold text-zinc-100">Upload and preview area</h3>
            </div>
            <div className="border border-zinc-600 bg-zinc-950 px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-zinc-300">
              Ready for SDK wiring
            </div>
          </div>

          <div className="mt-6 border border-dashed border-zinc-600 bg-zinc-950 p-8 text-center">
            <p className="font-mono text-lg font-medium text-zinc-100">Drop in an image upload control here</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Connect your browser SDK, show a preview, and display the returned file link or transform URL.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="border border-zinc-700 bg-zinc-950 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-zinc-500">Primary action</p>
              <p className="mt-1 font-medium text-zinc-100">Select file</p>
            </div>
            <div className="border border-zinc-700 bg-zinc-950 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-zinc-500">Output</p>
              <p className="mt-1 font-medium text-zinc-100">Preview + file link</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TryoutSection
