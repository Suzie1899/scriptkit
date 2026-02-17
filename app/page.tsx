"use client";

import { useState } from "react";
import type { GenerateResponse } from "@/lib/types";

// Format options
const FORMATS = [
  "talking head",
  "talking head + b-roll",
  "skit",
  "voxpop",
  "ELI5",
  "interview",
  "storytelling",
  "montage",
  "meme/POV",
];

const PLATFORMS = ["reels", "tiktok", "shorts", "twitter"];

const TONES = [
  "casual",
  "hype",
  "storyteller",
  "explainer",
  "observer",
  "straight talk",
  "raw",
  "comedic",
  "cinematic",
  "confrontational",
  "mentor",
  "curious",
];

const EMOTIONAL_TRIGGERS = [
  "identity",
  "wake-up call",
  "curiosity",
  "humor",
  "relatability",
  "aspiration",
  "urgency",
];

const MODULES = [
  "hook",
  "amplifier",
  "context",
  "specificity",
  "personality",
  "escalation",
  "crystallization",
  "gut punch",
  "close",
];

const FAQ_ITEMS = [
  {
    q: "is my data used for training?",
    a: "no. zero retention. your scripts stay yours.",
  },
  {
    q: "how is this different from chatgpt?",
    a: "chatgpt gives you a script. we give you a report card — letter grade, radar chart, diagnosis, rewrites. system, not chatbot.",
  },
  {
    q: "what do the formats mean?",
    a: "each format loads a different architecture. skits need setup-twist-punchline. voxpops need question design. the engine adapts.",
  },
  {
    q: "why are the scores so harsh?",
    a: "honest scores help you improve. a 7 means a pro would post this. most first drafts score 50-65. that's normal.",
  },
  {
    q: "can i pick my voice?",
    a: "yes. 12 tones from casual to cinematic. if it sounds like ai, the filter catches it.",
  },
  {
    q: "how long does it take?",
    a: "5-15 seconds. worth it.",
  },
];

const BADGE_EMOJI: Record<string, string> = {
  "sniper hook": "🎯",
  "perfect build": "🧱",
  "great rhythm": "🎵",
  "mic drop": "🎤",
  "razor specific": "🔬",
  "fresh angle": "💡",
  "hits different": "💘",
  "bullseye audience": "🎯",
  "mirror moment": "🪞",
  quotable: "💬",
  "would share": "🔁",
  "replay value": "🔄",
  "sounds human": "🗣️",
  cinematic: "🎬",
};

const GRADE_COLORS: Record<string, string> = {
  S: "text-violet-500",
  A: "text-emerald-500",
  B: "text-cyan-500",
  C: "text-yellow-500",
  D: "text-red-400",
  F: "text-red-500",
};

const GRADE_VERDICTS: Record<string, string> = {
  S: "exceptional. this is ready.",
  A: "strong. this would perform.",
  B: "solid. a few tweaks from postable.",
  C: "decent bones. fixable weak spots.",
  D: "needs work. the diagnosis will help.",
  F: "rough draft. good starting point though.",
};

function PillSelector({
  options,
  selected,
  onSelect,
  allowNone = false,
}: {
  options: string[];
  selected: string | null;
  onSelect: (value: string | null) => void;
  allowNone?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => {
            if (allowNone && selected === option) {
              onSelect(null);
            } else {
              onSelect(option);
            }
          }}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            selected === option
              ? "bg-[var(--accent-muted)] border border-[var(--accent)] text-[var(--accent)]"
              : "bg-transparent border border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function ScoreBar({
  label,
  score,
  badgeName,
}: {
  label: string;
  score: number;
  badgeName?: string;
}) {
  const getColor = (s: number) => {
    if (s >= 9) return "bg-violet-500";
    if (s >= 7) return "bg-emerald-500";
    if (s >= 5) return "bg-yellow-500";
    return "bg-red-400";
  };

  const badge =
    score >= 9 && badgeName && BADGE_EMOJI[badgeName]
      ? BADGE_EMOJI[badgeName]
      : null;

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[var(--text-tertiary)] w-40 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor(score)} transition-all duration-500`}
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span
        className={`text-sm font-mono w-8 ${score >= 9 ? "text-violet-500" : score >= 7 ? "text-emerald-500" : score >= 5 ? "text-yellow-500" : "text-red-400"}`}
      >
        {score}
        {badge && <span className="ml-1">{badge}</span>}
      </span>
    </div>
  );
}

function ReportCard({ data }: { data: GenerateResponse }) {
  const { score, category_scores, badges } = data;

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-8 space-y-8">
      {/* Grade + Score Header */}
      <div className="flex items-center justify-between">
        <div>
          <span
            className={`text-7xl font-bold ${GRADE_COLORS[score.letter_grade]}`}
          >
            {score.letter_grade}
          </span>
        </div>
        <div className="text-right">
          <span className="text-5xl font-bold text-[var(--text-primary)]">
            {score.total_normalized}
          </span>
          <span className="text-2xl text-[var(--text-tertiary)]">/100</span>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {GRADE_VERDICTS[score.letter_grade]}
          </p>
        </div>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="px-3 py-1.5 bg-violet-500/10 border border-violet-500/30 rounded-full text-sm text-violet-500"
            >
              {BADGE_EMOJI[badge] || "🏆"} {badge}
            </span>
          ))}
        </div>
      )}
      {badges.length === 0 && (
        <p className="text-sm text-[var(--text-tertiary)]">
          no badges yet — scores of 9+ earn badges
        </p>
      )}

      {/* Category Scores */}
      <div className="grid grid-cols-4 gap-4 text-center">
        {Object.entries(category_scores).map(([cat, val]) => (
          <div key={cat}>
            <p className="text-2xl font-bold text-[var(--text-primary)]">
              {val.toFixed(1)}
            </p>
            <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
              {cat}
            </p>
          </div>
        ))}
      </div>

      {/* All 14 Dimension Bars */}
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
            structure
          </p>
          <ScoreBar
            label="hook strength"
            score={score.hook_strength}
            badgeName="sniper hook"
          />
          <ScoreBar
            label="escalation logic"
            score={score.escalation_logic}
            badgeName="perfect build"
          />
          <ScoreBar
            label="pacing & rhythm"
            score={score.pacing_rhythm}
            badgeName="great rhythm"
          />
          <ScoreBar
            label="ending strength"
            score={score.ending_strength}
            badgeName="mic drop"
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
            substance
          </p>
          <ScoreBar
            label="specificity"
            score={score.specificity}
            badgeName="razor specific"
          />
          <ScoreBar
            label="originality"
            score={score.originality}
            badgeName="fresh angle"
          />
          <ScoreBar
            label="emotional trigger"
            score={score.emotional_trigger_accuracy}
            badgeName="hits different"
          />
          <ScoreBar
            label="target precision"
            score={score.target_precision}
            badgeName="bullseye audience"
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
            impact
          </p>
          <ScoreBar
            label="relatability"
            score={score.relatability}
            badgeName="mirror moment"
          />
          <ScoreBar
            label="quotability"
            score={score.quotability}
            badgeName="quotable"
          />
          <ScoreBar
            label="virality"
            score={score.virality}
            badgeName="would share"
          />
          <ScoreBar
            label="rewatchability"
            score={score.rewatchability}
            badgeName="replay value"
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
            authenticity
          </p>
          <ScoreBar
            label="conversational feel"
            score={score.conversational_feel}
            badgeName="sounds human"
          />
          <ScoreBar
            label="visual potential"
            score={score.visual_potential}
            badgeName="cinematic"
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [topic, setTopic] = useState("");
  const [format, setFormat] = useState("talking head");
  const [platform, setPlatform] = useState("reels");
  const [tone, setTone] = useState("casual");
  const [emotionalTrigger, setEmotionalTrigger] = useState<string | null>(null);
  const [showContext, setShowContext] = useState(false);
  const [targetViewer, setTargetViewer] = useState("");
  const [realAnchors, setRealAnchors] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          format,
          platform,
          tone,
          emotionalTrigger: emotionalTrigger || undefined,
          targetViewer: targetViewer || undefined,
          realAnchors: realAnchors || undefined,
          includeVisualDirection:
            format.includes("b-roll") ||
            format === "skit" ||
            format === "montage" ||
            format === "ELI5",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "something went wrong. try again.");
        return;
      }

      setResult(data);
    } catch {
      setError("something went wrong. try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyScript = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-sm border-b border-[var(--border-default)]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-[var(--text-primary)]">
            scriptkit
          </span>
          <span className="text-sm text-[var(--text-tertiary)] border border-[var(--border-default)] rounded-full px-3 py-1">
            ⚡ 20 credits
          </span>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        {/* Hero Text */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-primary)] mb-4">
            scriptkit
          </h1>
          <p className="text-xl md:text-2xl font-medium text-[var(--text-primary)] mb-4">
            scripts people actually watch till the end.
          </p>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-6">
            we studied what makes people click, watch and share videos. then we
            turned it into a 9-module script engine.
          </p>
          <p className="text-[var(--text-secondary)] mb-8">
            drop your idea — get a script built on what actually works.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-default)] text-sm text-[var(--text-tertiary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
              structure-first
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-default)] text-sm text-[var(--text-tertiary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--score-color)]"></span>
              scored on 14 dimensions
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-default)] text-sm text-[var(--text-tertiary)]">
              <span className="w-2 h-2 rounded-full bg-[var(--success)]"></span>
              anti-ai filter
            </span>
          </div>
        </div>

        {/* Form Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Left - Textarea */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-1">
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="what's your script about? a topic, a thought, a rough idea..."
              className="w-full h-80 md:h-full min-h-[320px] bg-transparent p-5 text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none resize-none"
            />
          </div>

          {/* Right - Parameters */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-6 space-y-6 max-h-[500px] overflow-y-auto">
            <h3 className="font-semibold text-[var(--text-primary)]">
              parameters
            </h3>

            {/* Format */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                format
              </label>
              <PillSelector
                options={FORMATS}
                selected={format}
                onSelect={(v) => v && setFormat(v)}
              />
            </div>

            {/* Platform */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                platform
              </label>
              <PillSelector
                options={PLATFORMS}
                selected={platform}
                onSelect={(v) => v && setPlatform(v)}
              />
            </div>

            {/* Tone */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                tone
              </label>
              <PillSelector
                options={TONES}
                selected={tone}
                onSelect={(v) => v && setTone(v)}
              />
            </div>

            {/* Emotional Trigger */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                emotional trigger
              </label>
              <PillSelector
                options={EMOTIONAL_TRIGGERS}
                selected={emotionalTrigger}
                onSelect={setEmotionalTrigger}
                allowNone
              />
              {!emotionalTrigger && (
                <p className="text-xs text-[var(--text-tertiary)]">
                  auto — engine picks the best trigger for your topic
                </p>
              )}
            </div>

            {/* Add Context Toggle */}
            <button
              onClick={() => setShowContext(!showContext)}
              className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
            >
              {showContext ? "- hide context" : "+ add context for a better script"}
            </button>

            {showContext && (
              <div className="space-y-4 pt-2 border-t border-[var(--border-default)]">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    who&apos;s watching?
                  </label>
                  <textarea
                    value={targetViewer}
                    onChange={(e) => setTargetViewer(e.target.value)}
                    placeholder="e.g. aspiring creators who want to grow but don't know what to post"
                    className="w-full h-16 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg p-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    real details to include
                  </label>
                  <textarea
                    value={realAnchors}
                    onChange={(e) => setRealAnchors(e.target.value)}
                    placeholder="names, numbers, stories — real details make the script 10x better"
                    className="w-full h-16 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg p-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] resize-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!topic.trim() || loading}
          className="w-full bg-[var(--accent)] text-white font-semibold py-4 rounded-xl hover:bg-[var(--accent-hover)] transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
        >
          {loading ? "engineering your script..." : "generate script"}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="mt-12 space-y-8">
            {/* Report Card */}
            <ReportCard data={result} />

            {/* Script Display */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  your script
                </h3>
                <span className="text-sm text-[var(--text-tertiary)]">
                  {result.estimated_duration} · {result.word_count} words
                </span>
              </div>
              <p className="text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed mb-6">
                {result.script}
              </p>
              <button
                onClick={copyScript}
                className="px-4 py-2 border border-[var(--border-default)] rounded-lg text-sm text-[var(--text-secondary)] hover:border-[var(--border-hover)] transition-colors"
              >
                {copied ? "copied ✓" : "copy script"}
              </button>
            </div>

            {/* Diagnosis */}
            {result.diagnosis.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  diagnosis — {result.diagnosis.length} weakest lines
                </h3>
                {result.diagnosis.map((item, i) => (
                  <div
                    key={i}
                    className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-5 space-y-4"
                  >
                    <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
                      {item.issue_type}
                    </span>
                    <div className="border-l-2 border-yellow-400 pl-4">
                      <p className="text-sm text-[var(--text-secondary)] italic">
                        &quot;{item.original_line}&quot;
                      </p>
                    </div>
                    <div className="border-l-2 border-[var(--accent)] pl-4">
                      <p className="text-sm text-[var(--text-primary)]">
                        &quot;{item.rewrite}&quot;
                      </p>
                    </div>
                    <p className="text-xs text-[var(--text-tertiary)]">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Anti-Generic Flags */}
            {result.anti_generic_flags.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  anti-generic filter
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.anti_generic_flags.map((flag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600"
                    >
                      &quot;{flag.phrase}&quot; → {flag.replacement}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {result.anti_generic_flags.length === 0 && result && (
              <p className="text-sm text-emerald-600">
                ✓ no generic patterns detected
              </p>
            )}
          </div>
        )}
      </main>

      {/* How It Works Section */}
      <section className="border-t border-[var(--border-default)] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            not another ai tool.
          </h2>
          <div className="text-[var(--text-secondary)] space-y-2 mb-10 max-w-2xl">
            <p>9 modules. each one has a psychological job.</p>
            <p>
              then we grade it. 14 dimensions. the 3 weakest lines get
              rewritten.
            </p>
            <p>then we kill anything that sounds like everyone else.</p>
          </div>

          {/* Module Pipeline */}
          <div className="flex flex-wrap items-center gap-2">
            {MODULES.map((module, i) => (
              <div key={module} className="flex items-center gap-2">
                <span className="px-3 py-2 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg text-sm text-[var(--text-secondary)]">
                  {module}
                </span>
                {i < MODULES.length - 1 && (
                  <span className="text-[var(--text-tertiary)]">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credits Section */}
      <section className="border-t border-[var(--border-default)] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            credits
          </h2>
          <p className="text-[var(--text-secondary)] mb-10">
            sign up free. 20 credits to start. buy more when you need them.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              { credits: 50, price: 5 },
              { credits: 100, price: 9 },
              { credits: 250, price: 19 },
            ].map((plan) => (
              <div
                key={plan.credits}
                className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-6 text-center hover:border-[var(--border-hover)] transition-colors cursor-pointer"
              >
                <p className="text-[var(--text-secondary)] mb-2">
                  {plan.credits} credits
                </p>
                <p className="text-3xl font-bold text-[var(--text-primary)]">
                  ${plan.price}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-[var(--text-tertiary)] text-center">
            1 script = 5 credits · 1 grade = 3 credits · 1 fix = 4 credits
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-[var(--border-default)] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-10">
            faq
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.q}
                className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-5"
              >
                <p className="font-medium text-[var(--text-primary)] mb-2">
                  &quot;{item.q}&quot;
                </p>
                <p className="text-sm text-[var(--text-secondary)]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border-default)] py-10">
        <p className="text-center text-sm text-[var(--text-tertiary)]">
          scriptkit — built for creators who write before they shoot.
        </p>
      </footer>
    </div>
  );
}
