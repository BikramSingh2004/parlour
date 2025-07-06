"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/lib/env";

export default function LoginPage() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const nav = useRouter();

  const go = async () => {
    const r = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: mail, pass }),
    });
    const d = await r.json();
    if (!d.token) return setErr("Invalid credentials");
    localStorage.setItem("token", d.token);
    nav.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 text-white px-4">
      <div className="w-full max-w-md bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-700 space-y-5">
        <h1 className="text-2xl font-semibold text-center">Admin Login</h1>

        <div className="space-y-3">
          <input
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {err && <div className="text-red-500 text-sm text-center">{err}</div>}
        </div>

        <button
          onClick={go}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
