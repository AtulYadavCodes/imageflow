import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function FooterSection() {
  return (
    <footer className="mx-auto mt-14 w-full max-w-7xl border-t-2 border-zinc-700/70 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.16em] text-zinc-400">
            ImageFlow
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Simple media upload and transform workflow.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <HashLink
            smooth to="/#"
            className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 font-mono text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-100"
          >
            Home
          </HashLink>
          <HashLink
            smooth to="/apidocs/#"
            className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 font-mono text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-100"
          >
            API Docs
          </HashLink>
          <a
            href="https://github.com/AtulYadavCodes"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-zinc-500 bg-zinc-100 px-3 py-2 font-mono font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
