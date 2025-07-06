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
    if (!d.token) return setErr("invalid");
    localStorage.setItem("token", d.token);
    nav.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border p-5 rounded w-full max-w-sm space-y-4">
        <h1 className="text-lg font-bold">Login</h1>
        <input
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          placeholder="email"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="password"
          type="password"
          className="w-full border px-3 py-2 rounded"
        />
        <button
          onClick={go}
          className="bg-black text-white px-4 py-2 w-full rounded"
        >
          Login
        </button>
        {err && <div className="text-red-500">{err}</div>}
      </div>
    </div>
  );
}
