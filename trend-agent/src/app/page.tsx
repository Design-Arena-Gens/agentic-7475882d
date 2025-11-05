"use client";

import { useCallback, useState } from "react";
import { RunForm, RunFormValues } from "@/components/run-form";
import { ResultView } from "@/components/result-view";
import { PipelineResult } from "@/lib/types";

export default function Home() {
  const [result, setResult] = useState<PipelineResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = useCallback(
    async (payload: RunFormValues) => {
      setIsRunning(true);
      setError(null);
      try {
        const response = await fetch("/api/run", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body.error ?? "Failed to execute agent pipeline.");
        }

        const json = (await response.json()) as PipelineResult;
        setResult(json);
      } catch (err) {
        setError((err as Error).message);
        setResult(null);
      } finally {
        setIsRunning(false);
      }
    },
    [setResult],
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50 font-sans">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 md:px-8">
        <header className="grid gap-4">
          <span className="inline-flex w-fit rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            Pune • PCMC Intelligence Agent
          </span>
          <h1 className="text-3xl font-semibold text-zinc-900 md:text-4xl">
            Trend Intelligence & AI Content Strategy
          </h1>
          <p className="max-w-3xl text-base text-zinc-600 md:text-lg">
            Aggregate live news, YouTube signals, and social chatter, then
            synthesize actionable marketing strategies for Pune & PCMC’s real
            estate landscape. The agent de-duplicates noise, preserves memory in
            Google Sheets, and insists on genuinely fresh campaign ideas.
          </p>
        </header>

        <section className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
          <RunForm onRun={handleRun} disabled={isRunning} />

          <div className="grid gap-6">
            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
                {error}
              </div>
            ) : null}
            {isRunning ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-blue-200 bg-white/80 p-12 text-center text-sm text-blue-700 shadow-sm">
                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
                Synthesizing live intelligence, filtering noise, and briefing
                the strategy agent…
              </div>
            ) : result ? (
              <ResultView result={result} />
            ) : (
              <div className="rounded-2xl border border-dashed border-zinc-300 bg-white/60 p-12 text-center text-sm text-zinc-500">
                Configure a data sweep on the left to receive a new strategy
                pack. The agent keeps track of historical ideas to avoid
                repetition.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
