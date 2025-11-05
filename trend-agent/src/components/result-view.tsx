"use client";

import { PipelineResult } from "@/lib/types";
import { format } from "date-fns";

export const ResultView = ({ result }: { result: PipelineResult }) => {
  const { dataset, strategy } = result;

  return (
    <div className="grid gap-8">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <header className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-800">
              Trend Dataset
            </h2>
            <p className="text-sm text-zinc-500">
              {format(new Date(dataset.timeframe.from), "PP")} →{" "}
              {format(new Date(dataset.timeframe.to), "PP")} •{" "}
              {dataset.insights.length} deduplicated signals
            </p>
          </div>
        </header>
        <div className="grid gap-4">
          {dataset.insights.map((insight) => (
            <article
              key={insight.id}
              className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-4 transition hover:border-blue-200 hover:bg-white"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                    {insight.source}
                  </p>
                  <h3 className="text-sm font-semibold text-zinc-800">
                    <a
                      href={insight.url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      {insight.title}
                    </a>
                  </h3>
                </div>
                <p className="text-xs text-zinc-500">
                  {format(new Date(insight.publishedAt), "PPp")}
                </p>
              </div>
              <p className="mt-2 text-sm text-zinc-600">{insight.summary}</p>
              {insight.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {insight.tags.map((tag) => (
                    <span
                      key={`${insight.id}-${tag}`}
                      className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <header className="mb-4">
          <h2 className="text-lg font-semibold text-zinc-800">
            Strategy Intelligence
          </h2>
          <p className="text-sm text-zinc-500">
            Generated via agentic reasoning with memory of previous ideas
          </p>
        </header>

        <div className="grid gap-8">
          <div>
            <h3 className="text-base font-semibold text-zinc-700">
              Executive Summary
            </h3>
            <p className="mt-2 text-sm text-zinc-600">{strategy.summary}</p>
          </div>

          <div className="grid gap-4">
            <h3 className="text-base font-semibold text-zinc-700">
              Priority Patterns
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {strategy.keyPatterns.map((pattern) => (
                <article
                  key={pattern.name}
                  className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-4"
                >
                  <h4 className="text-sm font-semibold text-blue-700">
                    {pattern.name}
                  </h4>
                  <p className="mt-2 text-sm text-zinc-600">{pattern.signal}</p>
                  <ul className="mt-3 space-y-1 text-xs text-zinc-500">
                    {pattern.supportingInsights.map((support, index) => (
                      <li key={`${pattern.name}-${index}`}>• {support}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="text-base font-semibold text-zinc-700">
              Campaign Ideas (Fresh)
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {strategy.campaignIdeas.map((idea) => (
                <article
                  key={idea.title}
                  className="rounded-xl border border-zinc-100 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4"
                >
                  <h4 className="text-sm font-semibold text-blue-800">
                    {idea.title}
                  </h4>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-blue-500">
                    {idea.audience}
                  </p>
                  <p className="mt-2 text-sm text-zinc-600">
                    {idea.description}
                  </p>
                  <div className="mt-3">
                    <h5 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      Channels
                    </h5>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {idea.channelPlan.map((channel) => (
                        <span
                          key={`${idea.title}-${channel}`}
                          className="inline-flex rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-50"
                        >
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3">
                    <h5 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      Hooks
                    </h5>
                    <ul className="mt-1 space-y-1 text-xs text-zinc-500">
                      {idea.contentHooks.map((hook, index) => (
                        <li key={`${idea.title}-hook-${index}`}>• {hook}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-3 text-xs text-emerald-600">
                    Measurement: {idea.measurement}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="text-base font-semibold text-zinc-700">
              Content Calendar
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {strategy.contentCalendar.map((slot) => (
                <article
                  key={`${slot.week}-${slot.focus}`}
                  className="rounded-xl border border-zinc-100 bg-white p-4 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    {slot.week}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-zinc-800">
                    {slot.focus}
                  </p>
                  <p className="mt-2 text-sm text-zinc-600">{slot.campaign}</p>
                  <ul className="mt-3 space-y-1 text-xs text-blue-600">
                    {slot.kpis.map((kpi, index) => (
                      <li key={`${slot.week}-kpi-${index}`}>• {kpi}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <h3 className="text-base font-semibold text-zinc-700">
              Risk & Execution Watchlist
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-xl border border-zinc-100 bg-white p-4 shadow-sm">
                <h4 className="text-sm font-semibold text-red-600">Risks</h4>
                <ul className="mt-2 space-y-1 text-sm text-zinc-600">
                  {strategy.riskAssessment.map((risk, index) => (
                    <li key={`risk-${index}`}>• {risk}</li>
                  ))}
                </ul>
              </article>
              <article className="rounded-xl border border-zinc-100 bg-white p-4 shadow-sm">
                <h4 className="text-sm font-semibold text-emerald-600">
                  Execution Playbook
                </h4>
                <p className="mt-2 text-sm text-zinc-600">
                  {strategy.executionPlaybook}
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
