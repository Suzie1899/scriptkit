"use client";

import { useState } from "react";

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
    a: "honest scores help you improve. a 7 means a pro would post it. most first drafts score 50-65. that's normal.",
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

export default function Home() {
  const [topic, setTopic] = useState("");
  const [format, setFormat] = useState("talking head");
  const [platform, setPlatform] = useState("reels");
  const [tone, setTone] = useState("casual");
  const [emotionalTrigger, setEmotionalTrigger] = useState<string | null>(null);
  const [showContext, setShowContext] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    // API call will go here
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
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
        <div className="grid md:grid-cols-2 gap-6 mb-16">
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
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-6 space-y-6">
            <h3 className="font-semibold text-[var(--text-primary)]">parameters</h3>

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
              + add context for a better script
            </button>

            {showContext && (
              <div className="space-y-4 pt-2 border-t border-[var(--border-default)]">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    who's watching?
                  </label>
                  <textarea
                    placeholder="e.g. aspiring creators who want to grow but don't know what to post"
                    className="w-full h-16 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg p-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                    real details to include
                  </label>
                  <textarea
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
      </main>

      {/* How It Works Section */}
      <section className="border-t border-[var(--border-default)] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            not another ai tool.
          </h2>
          <div className="text-[var(--text-secondary)] space-y-2 mb-10 max-w-2xl">
            <p>9 modules. each one has a psychological job.</p>
            <p>then we grade it. 14 dimensions. the 3 weakest lines get rewritten.</p>
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
                  "{item.q}"
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
