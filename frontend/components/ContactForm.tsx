"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [ok, setOk] = useState<null | boolean>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setOk(res.ok);
    if (res.ok) setForm({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        type="text"
        required
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-accent"
      />
      <input
        type="email"
        required
        placeholder="E-Mail"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-accent"
      />
      <textarea
        required
        placeholder="Nachricht"
        value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
        className="w-full min-h-[140px] rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-accent"
      />
      <button type="submit" className="rounded-md bg-brand text-white px-4 py-2 text-sm font-medium hover:opacity-90">
        Senden
      </button>
      {ok === true && <div className="text-sm text-green-600">Nachricht gesendet. Danke!</div>}
      {ok === false && <div className="text-sm text-red-600">Fehler. Bitte später erneut versuchen.</div>}
    </form>
  );
}
