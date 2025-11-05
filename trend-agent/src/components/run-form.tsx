"use client";

import { FormEvent, useState } from "react";
import { DEFAULT_KEYWORDS, DEFAULT_YOUTUBE_QUERIES } from "@/lib/constants";

export interface RunFormValues {
  primaryQuery: string;
  keywords: string[];
  lookbackDays: number;
  youtubeQueries: string[];
}

export const RunForm = ({
  onRun,
  disabled,
}: {
  onRun: (payload: RunFormValues) => void;
  disabled: boolean;
}) => {
  const [primaryQuery, setPrimaryQuery] = useState(
    "Pune OR PCMC real estate",
  );
  const [keywordsInput, setKeywordsInput] = useState(
    DEFAULT_KEYWORDS.join(", "),
  );
  const [youtubeInput, setYoutubeInput] = useState(
    DEFAULT_YOUTUBE_QUERIES.join("\n"),
  );
  const [lookbackDays, setLookbackDays] = useState(7);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keywords = keywordsInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const youtubeQueries = youtubeInput
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    onRun({
      primaryQuery,
      keywords,
      lookbackDays,
      youtubeQueries,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur-md transition hover:shadow-md"
    >
      <div>
        <label className="flex items-center justify-between text-sm font-medium text-zinc-600">
          Focus Query
          <span className="text-xs text-zinc-400">
            Use AND/OR for precise control
          </span>
        </label>
        <input
          className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          placeholder="Pune OR PCMC real estate"
          value={primaryQuery}
          onChange={(event) => setPrimaryQuery(event.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-zinc-600">
          Keyword Bank{" "}
          <span className="font-normal text-zinc-400">
            (comma separated, used for News API refinement)
          </span>
        </label>
        <textarea
          className="min-h-[90px] rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          value={keywordsInput}
          onChange={(event) => setKeywordsInput(event.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-zinc-600">
          YouTube Search Queries{" "}
          <span className="font-normal text-zinc-400">
            (one per line for coverage across developers, infra, launches)
          </span>
        </label>
        <textarea
          className="min-h-[120px] rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          value={youtubeInput}
          onChange={(event) => setYoutubeInput(event.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-zinc-600">
          Lookback window (days)
        </label>
        <input
          type="number"
          min={1}
          max={60}
          className="w-24 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          value={lookbackDays}
          onChange={(event) => {
            const value = Number(event.target.value);
            setLookbackDays(Number.isNaN(value) ? 7 : value);
          }}
          disabled={disabled}
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition enabled:hover:bg-blue-700 enabled:active:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {disabled ? "Synthesizing…" : "Run Trend Engine"}
      </button>
    </form>
  );
};
