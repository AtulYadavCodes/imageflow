


import { HashLink } from 'react-router-hash-link'
import { useAuth } from '../../Context/LoginContext';
import { useNavigate } from 'react-router-dom';


import { useState } from 'react';
function Navbar() {
	const { isAuth, setIsAuth } = useAuth();

	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	//logout
	const handleclick = async () => {
		const url = `${import.meta.env.VITE_API_BASE}/api/v1/users/logout`
		try {
			const res = await fetch(url, {
				method: "POST",
				credentials: "include"
			})
			if (res.ok) {
				
				navigate("/", { replace: true });
                setIsAuth(false);
			}
		} catch (error) {
			console.error("Logout error:", error);
		}

	}
	//logout ends
	return (
		<header className="sticky w-full top-0 z-20 border-b-2 border-zinc-700/70 bg-zinc-950/90">
			
			<div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
				<HashLink smooth to="/#" className="font-mono text-lg font-semibold tracking-[0.16em] text-zinc-100">
					ImageFlow
				</HashLink>
				
				<button onClick={()=>setOpen(!open)} className='sm:hidden' >{open?"X":"☰"}</button>
				{/* NAV mobile */}
				{open && (
  <nav className=" mt-3 flex flex-col gap-2 border-t border-zinc-800 pt-4">

    <HashLink
      onClick={() => setOpen(false)}
      to="/#"
      className="px-3 py-2 rounded-md font-mono text-zinc-300 hover:bg-zinc-800 transition"
    >
      Home
    </HashLink>

    <HashLink
      onClick={() => setOpen(false)}
      to="/apidocs/#"
      className="px-3 py-2 rounded-md font-mono text-zinc-300 hover:bg-zinc-800 transition"
    >
      API Docs
    </HashLink>

    {isAuth && (
      <HashLink
        onClick={() => setOpen(false)}
        to="/dashboard/#"
        className="px-3 py-2 rounded-md font-mono text-zinc-300 hover:bg-zinc-800 transition"
      >
        Dashboard
      </HashLink>
    )}

    {!isAuth ? (
      <HashLink
        onClick={() => setOpen(false)}
        to="/auth"
        className="px-3 py-2 rounded-md font-mono font-semibold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 transition"
      >
        Login
      </HashLink>
    ) : (
      <button
        onClick={() => {
          handleclick();
          setOpen(false);
        }}
        className="px-3 py-2 rounded-md font-mono font-semibold text-zinc-300 hover:bg-zinc-800 transition text-left"
      >
        Logout
      </button>
    )}

  </nav>
)}
				{/* NAV desktop */}
				<nav className="hidden sm:flex flex-wrap items-center gap-2 text-sm sm:gap-3">
					<HashLink smooth className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 font-mono text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-100" to="/#">
						Home
					</HashLink>
					<HashLink smooth className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 font-mono text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-100" to="/apidocs/#">
						API Docs
					</HashLink>


					{isAuth && <HashLink smooth className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 font-mono text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-100" to="/dashboard">
						Go to dashboard
					</HashLink>}
					{!isAuth ? (<HashLink
						smooth className="rounded-md border border-zinc-500 bg-zinc-100 px-3 py-2 font-mono font-semibold text-zinc-900 transition hover:bg-zinc-200"
						to="/auth"
					>
						Sign Up / Login
					</HashLink>) : <button
						className="rounded-md border border-zinc-500 bg-zinc-100 px-3 py-2 font-mono font-semibold text-zinc-900 transition hover:bg-zinc-200"
						onClick={handleclick}
					>
						logout
					</button>}
				</nav>
			</div>
		</header>
	)
}

export default Navbar