import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/LoginContext";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";


function AuthPage({ mode = "login" }) {
  const [isLogin, setIsLogin] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const {setIsAuth} = useAuth();



  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(e.target);



    
    const url = isLogin
      ? `${API_BASE}/api/v1/users/login`
      :`${API_BASE}/api/v1/users/register`;

    const res = await fetch(url, {
      method: "POST",
      credentials: "include", // for cookies
      body: formData, // no headers!
    });

    const data = await res.json();
    if(!isLogin && res.ok) {
        setIsLogin(true);
    }
    if(isLogin && res.ok) {
        // Redirect to dashboard or homepage after successful login
         setRedirectToDashboard(true);
         setIsAuth(true);// update auth state in context
    }
    console.log(isLogin ? "Login:" : "Signup:", data);

  } catch (err) {
    console.error("Auth error:", err);
  }
};

  if (redirectToDashboard) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="min-h-screen w-full bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md border-2 border-zinc-700 bg-zinc-900 p-6">

        {/* HEADER */}
        <div className="mb-6 text-center">
          <h2 className="font-mono text-2xl font-semibold text-zinc-100">
            {isLogin ? "Welcome back" : "Create account"}
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            {isLogin
              ? "Login to continue to ImageFlow"
              : "Start building with ImageFlow"}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* SIGNUP ONLY */}
          {!isLogin && (
            <>
       <img src={avatar ? URL.createObjectURL(avatar) : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"} alt="avatar preview" className="w-24 h-24 rounded-full object-cover mx-auto" />
              <input
                type="text"
                placeholder="Full Name"
                name="fullname"
                className="w-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-500"
              />

              {/* Avatar Upload */}
              <div className="w-full border border-dashed border-zinc-600 bg-zinc-950 p-3 text-center text-xs text-zinc-400">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="hidden"
                  id="avatar"
                  name="avatar"
                />
                <label htmlFor="avatar" className="cursor-pointer">
                  {avatar ? avatar.name : "Upload avatar"}
                </label>
              </div>
            </>
          )}

          {/* COMMON */}
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password (min 6 chars)"
            className="w-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-500"
          />

          {/* CTA */}
          <button
            type="submit"
            className="w-full rounded-md border border-zinc-500 bg-zinc-100 px-4 py-2 font-mono text-sm font-semibold text-zinc-900 hover:bg-zinc-200 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* SWITCH */}
        <div className="mt-5 text-center text-sm text-zinc-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 font-mono text-zinc-200 underline hover:text-white"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </div>

        {/* BACK */}
        <div className="mt-6 text-center">
          <HashLink
            smooth
            to="/#"
            className="text-xs text-zinc-500 hover:text-zinc-300 font-mono"
          >
            ← Back to home
          </HashLink>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;