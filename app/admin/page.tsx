'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';

/**
 * Secured admin dashboard shell. Requires an admin token (validated by the
 * /api/admin endpoint against ADMIN_TOKEN). This page is noindex and does not
 * expose raw lead PII — it shows operational summaries only. In production,
 * front this with real auth (e.g. NextAuth / SSO) rather than a shared token.
 */
export default function AdminPage() {
  const [token, setToken] = useState('');
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin', { headers: { Authorization: `Bearer ${token}` } });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Unauthorized');
      setData(json.summary);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="theme-dark grain min-h-[70vh] pt-32 pb-20">
      <div className="shell max-w-2xl">
        <p className="eyebrow mb-6"><Lock className="h-4 w-4" aria-hidden />Admin</p>
        <h1 className="display-2">Lead Intelligence Dashboard</h1>
        <p className="lede mt-4">Enter your admin token to view operational summaries. No raw personal data is shown here.</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Admin token"
            className="flex-1 rounded-control border border-line bg-white/[0.03] px-4 py-3 text-[15px] text-text-dark min-h-[48px]"
            aria-label="Admin token"
          />
          <button onClick={load} disabled={loading || !token} className="rounded-control bg-[linear-gradient(100deg,#7C4DFF,#E947C6)] px-6 py-3 font-semibold text-white min-h-[48px] disabled:opacity-50">
            {loading ? 'Loading…' : 'Load'}
          </button>
        </div>

        {error && <p role="alert" className="mt-4 text-[14px] text-[#ff8a8f]">{error}</p>}

        {data != null && (
          <pre className="mt-6 overflow-x-auto rounded-editorial border border-line bg-graphite/60 p-5 text-[13px] text-text-dark-muted">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </section>
  );
}
