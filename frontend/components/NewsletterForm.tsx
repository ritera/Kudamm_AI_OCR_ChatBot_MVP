"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState<null | boolean>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    setOk(res.ok);
    if (res.ok) setEmail("");
  };

  return (
    <form onSubmit={submit} className="w-full max-w-md">
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="E-Mail-Adresse"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-accent"
        />
        <button
          type="submit"
          className="rounded-md bg-brand text-white px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          Jetzt anmelden
        </button>
      </div>
      {ok === true && <div className="mt-2 text-sm text-green-600">Vielen Dank!</div>}
      {ok === false && <div className="mt-2 text-sm text-red-600">Fehler. Später erneut versuchen.</div>}
    </form>
  );
}
