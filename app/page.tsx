"use client";

import { useState } from "react";
import type { GenerateResponse } from "@/lib/types";
import { RadarChart } from "@/components/RadarChart";

// Tab definitions
const TABS = [
  { id: "script", label: "script" },
  { id: "hooks", label: "hooks" },
  { id: "repurpose", label: "repurpose" },
  { id: "analyze", label: "analyze" },
];

const TAB_DESCRIPTIONS: Record<string, string> = {
  script: "write a new script",
  hooks: "scroll-stopping openers",
  repurpose: "adapt for other platforms",
  analyze: "why did this perform?",
};

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
const REPURPOSE_PLATFORMS = ["twitter", "linkedin", "youtube shorts", "reels", "tiktok"];

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
    a: "chatgpt gives you a script. we give you a report card — letter grade, radar chart, diagnosis, rewrites.",
  },
  {
    q: "why are the scores so harsh?",
    a: "honest scores help you improve. a 7 means a pro would post this. most first drafts score 50-65.",
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
  S: "text-[var(--forest)]",
  A: "text-[var(--forest)]",
  B: "text-[var(--forest-light)]",
  C: "text-[var(--warning)]",
  D: "text-[var(--terracotta)]",
  F: "text-[var(--danger)]",
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
  multi = false,
}: {
  options: string[];
  selected: string | string[] | null;
  onSelect: (value: string | string[] | null) => void;
  allowNone?: boolean;
  multi?: boolean;
}) {
  const isSelected = (option: string) => {
    if (multi && Array.isArray(selected)) {
      return selected.includes(option);
    }
    return selected === option;
  };

  const handleClick = (option: string) => {
    if (multi) {
      const currentSelected = Array.isArray(selected) ? selected : [];
      if (currentSelected.includes(option)) {
        onSelect(currentSelected.filter(s => s !== option));
      } else {
        onSelect([...currentSelected, option]);
      }
    } else {
      if (allowNone && selected === option) {
        onSelect(null);
      } else {
        onSelect(option);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleClick(option)}
          className={`pill ${isSelected(option) ? 'active' : ''}`}
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
  const getColorClass = (s: number) => {
    if (s >= 7) return "forest";
    if (s >= 5) return "terracotta";
    return "warning";
  };

  const badge =
    score >= 9 && badgeName && BADGE_EMOJI[badgeName]
      ? BADGE_EMOJI[badgeName]
      : null;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[var(--text-tertiary)] w-36 shrink-0">
        {label}
      </span>
      <div className="progress flex-1">
        <div
          className={`progress-fill ${getColorClass(score)}`}
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="text-sm font-mono w-8 text-[var(--text-primary)]">
        {score}
        {badge && <span className="ml-1">{badge}</span>}
      </span>
    </div>
  );
}

function ReportCard({ data }: { data: GenerateResponse }) {
  const { score, category_scores, badges } = data;

  return (
    <div className="card p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <span className={`text-7xl font-serif italic ${GRADE_COLORS[score.letter_grade]}`}>
            {score.letter_grade}
          </span>
        </div>
        <div className="text-right">
          <span className="text-5xl font-medium text-[var(--text-primary)]">
            {score.total_normalized}
          </span>
          <span className="text-2xl text-[var(--text-tertiary)]">/100</span>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {GRADE_VERDICTS[score.letter_grade]}
          </p>
        </div>
      </div>

      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span key={badge} className="badge forest">
              {BADGE_EMOJI[badge] || "🏆"} {badge}
            </span>
          ))}
        </div>
      )}

      <RadarChart data={category_scores} size={260} />

      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-medium">structure</p>
          <ScoreBar label="hook strength" score={score.hook_strength} badgeName="sniper hook" />
          <ScoreBar label="escalation logic" score={score.escalation_logic} badgeName="perfect build" />
          <ScoreBar label="pacing & rhythm" score={score.pacing_rhythm} badgeName="great rhythm" />
          <ScoreBar label="ending strength" score={score.ending_strength} badgeName="mic drop" />
        </div>

        <div className="space-y-3">
          <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-medium">substance</p>
          <ScoreBar label="specificity" score={score.specificity} badgeName="razor specific" />
          <ScoreBar label="originality" score={score.originality} badgeName="fresh angle" />
          <ScoreBar label="emotional trigger" score={score.emotional_trigger_accuracy} badgeName="hits different" />
          <ScoreBar label="target precision" score={score.target_precision} badgeName="bullseye audience" />
        </div>

        <div className="space-y-3">
          <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-medium">impact</p>
          <ScoreBar label="relatability" score={score.relatability} badgeName="mirror moment" />
          <ScoreBar label="quotability" score={score.quotability} badgeName="quotable" />
          <ScoreBar label="virality" score={score.virality} badgeName="would share" />
          <ScoreBar label="rewatchability" score={score.rewatchability} badgeName="replay value" />
        </div>

        <div className="space-y-3">
          <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-medium">authenticity</p>
          <ScoreBar label="conversational feel" score={score.conversational_feel} badgeName="sounds human" />
          <ScoreBar label="visual potential" score={score.visual_potential} badgeName="cinematic" />
        </div>
      </div>
    </div>
  );
}

function ScriptTab({ onResult }: { onResult: (data: GenerateResponse) => void }) {
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

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic, format, platform, tone,
          emotionalTrigger: emotionalTrigger || undefined,
          targetViewer: targetViewer || undefined,
          realAnchors: realAnchors || undefined,
          includeVisualDirection: format.includes("b-roll") || format === "skit" || format === "montage" || format === "ELI5",
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "something went wrong."); return; }
      onResult(data);
    } catch { setError("something went wrong."); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-2">your idea</label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="what's your script about? a topic, a thought, a rough idea..."
            className="textarea h-80"
          />
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">format</label>
            <PillSelector options={FORMATS} selected={format} onSelect={(v) => v && setFormat(v as string)} />
          </div>

          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">platform</label>
            <PillSelector options={PLATFORMS} selected={platform} onSelect={(v) => v && setPlatform(v as string)} />
          </div>

          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">tone</label>
            <PillSelector options={TONES} selected={tone} onSelect={(v) => v && setTone(v as string)} />
          </div>

          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">emotional trigger</label>
            <PillSelector options={EMOTIONAL_TRIGGERS} selected={emotionalTrigger} onSelect={(v) => setEmotionalTrigger(v as string | null)} allowNone />
            {!emotionalTrigger && <p className="text-xs text-[var(--text-tertiary)] mt-1">auto — engine picks</p>}
          </div>

          <button onClick={() => setShowContext(!showContext)} className="text-sm link">
            {showContext ? "− hide context" : "+ add context"}
          </button>

          {showContext && (
            <div className="space-y-4 pt-4 border-t border-[var(--border-default)]">
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-2">who&apos;s watching?</label>
                <textarea value={targetViewer} onChange={(e) => setTargetViewer(e.target.value)} placeholder="e.g. aspiring creators who want to grow" className="textarea h-20 text-sm" />
              </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-2">real details</label>
                <textarea value={realAnchors} onChange={(e) => setRealAnchors(e.target.value)} placeholder="names, numbers, stories" className="textarea h-20 text-sm" />
              </div>
            </div>
          )}
        </div>
      </div>

      <button onClick={handleGenerate} disabled={!topic.trim() || loading} className="btn-primary w-full">
        {loading ? "engineering your script..." : "generate script"}
      </button>

      {error && <div className="p-4 bg-[var(--terracotta-muted)] rounded-lg text-[var(--text-primary)] text-sm">{error}</div>}
    </div>
  );
}

function HooksTab() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [loading, setLoading] = useState(false);
  const [hooks, setHooks] = useState<Array<{ hook: string; type: string; why: string }> | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setHooks([
        { hook: "Stop waking up at 5am if you want to be productive.", type: "contrarian", why: "Challenges belief" },
        { hook: "I wasted 3 years doing this wrong.", type: "confession", why: "Vulnerability + timeframe" },
        { hook: "The reason you're tired isn't sleep.", type: "curiosity gap", why: "Opens a loop" },
        { hook: "If you're a creator making under $10k/month, this is why.", type: "identity call", why: "Specific audience" },
        { hook: "Nobody's talking about this yet.", type: "FOMO", why: "Exclusivity" },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-2">topic</label>
          <textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="what's your video about?" className="textarea h-60" />
        </div>
        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-2">audience (optional)</label>
          <textarea value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="who specifically is this for?" className="textarea h-32" />
          <div className="mt-4 p-4 bg-[var(--bg-elevated)] rounded-lg">
            <p className="text-xs text-[var(--text-tertiary)] mb-2">hook formulas:</p>
            <div className="flex flex-wrap gap-2">
              {["contrarian", "confession", "curiosity gap", "identity call", "FOMO"].map(f => (
                <span key={f} className="badge muted">{f}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleGenerate} disabled={!topic.trim() || loading} className="btn-primary w-full">
        {loading ? "generating..." : "generate hooks"}
      </button>

      {hooks && (
        <div className="space-y-4">
          {hooks.map((item, i) => (
            <div key={i} className="card p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <p className="text-lg text-[var(--text-primary)]">&quot;{item.hook}&quot;</p>
                <button className="text-sm link shrink-0">copy</button>
              </div>
              <div className="flex items-center gap-3">
                <span className="badge forest">{item.type}</span>
                <span className="text-sm text-[var(--text-tertiary)]">{item.why}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RepurposeTab() {
  const [content, setContent] = useState("");
  const [targetPlatforms, setTargetPlatforms] = useState<string[]>(["twitter", "linkedin"]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<string, string> | null>(null);

  const handleRepurpose = async () => {
    if (!content.trim() || targetPlatforms.length === 0) return;
    setLoading(true);
    setTimeout(() => {
      setResults({
        twitter: "🧵 Thread version...\n\n1/ Key insight\n2/ Supporting point\n3/ The takeaway",
        linkedin: "Here's a story about [topic]...\n\nWhen I first started...\n\nThe lesson? [takeaway]",
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-2">original content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="paste your content..." className="textarea h-80" />
        </div>
        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-2">repurpose for</label>
          <PillSelector options={REPURPOSE_PLATFORMS} selected={targetPlatforms} onSelect={(v) => setTargetPlatforms(v as string[])} multi />
        </div>
      </div>

      <button onClick={handleRepurpose} disabled={!content.trim() || targetPlatforms.length === 0 || loading} className="btn-primary w-full">
        {loading ? "shapeshifting..." : `repurpose for ${targetPlatforms.length} platforms`}
      </button>

      {results && (
        <div className="space-y-4">
          {Object.entries(results).map(([platform, text]) => (
            <div key={platform} className="card p-6">
              <h4 className="font-medium text-[var(--text-primary)] mb-3 capitalize">{platform}</h4>
              <p className="text-[var(--text-secondary)] whitespace-pre-wrap">{text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AnalyzeTab() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<{ topFactors: string[]; replicable: string[]; notReplicable: string[] } | null>(null);

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setAnalysis({
        topFactors: ["Strong contrarian hook", "Specific numbers", "Peak timing"],
        replicable: ["Contrarian angle", "Specific numbers", "Question-based hook"],
        notReplicable: ["Trending topic timing", "Influencer boost", "First-mover advantage"],
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm text-[var(--text-secondary)] mb-2">content to analyze</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="paste the content that performed well..." className="textarea h-60" />
      </div>

      <button onClick={handleAnalyze} disabled={!content.trim() || loading} className="btn-primary w-full">
        {loading ? "analyzing..." : "analyze content"}
      </button>

      {analysis && (
        <div className="space-y-6">
          <div className="card p-6">
            <h4 className="font-medium text-[var(--text-primary)] mb-4">why it worked</h4>
            {analysis.topFactors.map((f, i) => (
              <div key={i} className="flex items-center gap-3 mb-2">
                <span className="badge terracotta">{i + 1}</span>
                <span className="text-[var(--text-secondary)]">{f}</span>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card p-6 border-l-4 border-l-[var(--forest)]">
              <h4 className="font-medium text-[var(--forest)] mb-3">✓ replicable</h4>
              {analysis.replicable.map((item, i) => <p key={i} className="text-sm text-[var(--text-secondary)]">• {item}</p>)}
            </div>
            <div className="card p-6 border-l-4 border-l-[var(--terracotta)]">
              <h4 className="font-medium text-[var(--terracotta)] mb-3">✗ not replicable</h4>
              {analysis.notReplicable.map((item, i) => <p key={i} className="text-sm text-[var(--text-secondary)]">• {item}</p>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("script");
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const copyScript = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Navbar */}
      <nav className="border-b border-[var(--border-default)] bg-[var(--bg-primary)]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="logo">scriptkit</span>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 pt-16 pb-8 text-center">
        <h1 className="text-5xl md:text-7xl mb-4">
          <span className="headline-script">Scripts That</span>
          <br />
          <span className="headline-serif">Actually Work</span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
          the creator toolkit. write scripts, generate hooks, repurpose content, analyze what works.
        </p>
      </header>

      {/* Section divider with labels */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="section-header">
          <span>get started</span>
          <span>& create</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="tab-nav">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setResult(null); }}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Description */}
        <p className="text-center text-[var(--text-tertiary)] mb-10">
          {TAB_DESCRIPTIONS[activeTab]}
        </p>

        {/* Tab Content */}
        <div className="card p-6 md:p-8">
          {activeTab === "script" && <ScriptTab onResult={setResult} />}
          {activeTab === "hooks" && <HooksTab />}
          {activeTab === "repurpose" && <RepurposeTab />}
          {activeTab === "analyze" && <AnalyzeTab />}
        </div>

        {/* Script Results */}
        {activeTab === "script" && result && (
          <div className="mt-12 space-y-8">
            <ReportCard data={result} />

            <div className="card p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl">your script</h3>
                <span className="text-sm text-[var(--text-tertiary)]">
                  {result.estimated_duration} · {result.word_count} words
                </span>
              </div>
              <p className="text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed mb-6">
                {result.script}
              </p>
              <button onClick={copyScript} className="btn-secondary">
                {copied ? "copied ✓" : "copy script"}
              </button>
            </div>

            {result.diagnosis.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl">diagnosis</h3>
                {result.diagnosis.map((item, i) => (
                  <div key={i} className="card p-5 space-y-3">
                    <span className="badge terracotta">{item.issue_type}</span>
                    <div className="border-l-2 border-[var(--warning)] pl-4">
                      <p className="text-sm text-[var(--text-secondary)] italic">&quot;{item.original_line}&quot;</p>
                    </div>
                    <div className="border-l-2 border-[var(--forest)] pl-4">
                      <p className="text-sm text-[var(--text-primary)]">&quot;{item.rewrite}&quot;</p>
                    </div>
                    <p className="text-xs text-[var(--text-tertiary)]">{item.explanation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* How it works */}
      <section className="border-t border-[var(--border-default)] py-16 bg-[var(--bg-elevated)]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl mb-4">
            <span className="headline-script">Not Another</span>{" "}
            <span className="headline-serif">AI Tool</span>
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 max-w-xl">
            9 modules. 14 scoring dimensions. the 3 weakest lines get rewritten. then we kill anything that sounds generic.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {MODULES.map((m, i) => (
              <div key={m} className="flex items-center gap-2">
                <span className="badge muted">{m}</span>
                {i < MODULES.length - 1 && <span className="text-[var(--text-tertiary)]">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--border-default)] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl mb-10">
            <span className="headline-serif">FAQ</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="card p-5">
                <p className="font-medium text-[var(--text-primary)] mb-2">&quot;{item.q}&quot;</p>
                <p className="text-sm text-[var(--text-secondary)]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border-default)] py-8 bg-[var(--bg-elevated)]">
        <p className="text-center text-sm text-[var(--text-tertiary)]">
          scriptkit — the creator toolkit
        </p>
      </footer>
    </div>
  );
}
