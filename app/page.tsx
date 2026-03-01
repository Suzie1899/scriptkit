"use client";

import { useState } from "react";
import Image from "next/image";
import type { GenerateResponse } from "@/lib/types";
import { RadarChart } from "@/components/RadarChart";

const TABS = [
  { id: "script", label: "script" },
  { id: "hooks", label: "hooks" },
  { id: "repurpose", label: "repurpose" },
  { id: "analyze", label: "analyze" },
];

const FORMATS = ["talking head", "talking head + b-roll", "skit", "voxpop", "ELI5", "interview", "storytelling", "montage", "meme/POV"];
const PLATFORMS = ["reels", "tiktok", "shorts", "twitter"];
const REPURPOSE_PLATFORMS = ["twitter", "linkedin", "youtube shorts", "reels", "tiktok"];
const TONES = ["casual", "hype", "storyteller", "explainer", "observer", "straight talk", "raw", "comedic", "cinematic", "confrontational", "mentor", "curious"];
const EMOTIONAL_TRIGGERS = ["identity", "wake-up call", "curiosity", "humor", "relatability", "aspiration", "urgency"];

const BADGE_EMOJI: Record<string, string> = {
  "sniper hook": "🎯", "perfect build": "🧱", "great rhythm": "🎵", "mic drop": "🎤",
  "razor specific": "🔬", "fresh angle": "💡", "hits different": "💘", "bullseye audience": "🎯",
  "mirror moment": "🪞", quotable: "💬", "would share": "🔁", "replay value": "🔄",
  "sounds human": "🗣️", cinematic: "🎬",
};

const GRADE_COLORS: Record<string, string> = {
  S: "text-[var(--forest)]", A: "text-[var(--forest)]", B: "text-[var(--forest-light)]",
  C: "text-[var(--warning)]", D: "text-[var(--terracotta)]", F: "text-[var(--danger)]",
};

const GRADE_VERDICTS: Record<string, string> = {
  S: "exceptional. this is ready.", A: "strong. this would perform.",
  B: "solid. a few tweaks from postable.", C: "decent bones. fixable weak spots.",
  D: "needs work. the diagnosis will help.", F: "rough draft. good starting point though.",
};

function PillSelector({ options, selected, onSelect, allowNone = false, multi = false }: {
  options: string[]; selected: string | string[] | null;
  onSelect: (value: string | string[] | null) => void; allowNone?: boolean; multi?: boolean;
}) {
  const isSelected = (option: string) => multi && Array.isArray(selected) ? selected.includes(option) : selected === option;
  const handleClick = (option: string) => {
    if (multi) {
      const current = Array.isArray(selected) ? selected : [];
      onSelect(current.includes(option) ? current.filter(s => s !== option) : [...current, option]);
    } else {
      onSelect(allowNone && selected === option ? null : option);
    }
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button key={option} onClick={() => handleClick(option)} className={`pill ${isSelected(option) ? 'active' : ''}`}>
          {option}
        </button>
      ))}
    </div>
  );
}

function ScoreBar({ label, score, badgeName }: { label: string; score: number; badgeName?: string }) {
  const color = score >= 7 ? "forest" : score >= 5 ? "terracotta" : "warning";
  const badge = score >= 9 && badgeName && BADGE_EMOJI[badgeName] ? BADGE_EMOJI[badgeName] : null;
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[var(--text-tertiary)] w-36 shrink-0">{label}</span>
      <div className="progress flex-1">
        <div className={`progress-fill ${color}`} style={{ width: `${score * 10}%` }} />
      </div>
      <span className="text-sm font-mono w-8">{score}{badge && <span className="ml-1">{badge}</span>}</span>
    </div>
  );
}

function ReportCard({ data }: { data: GenerateResponse }) {
  const { score, category_scores, badges } = data;
  return (
    <div className="card p-8 space-y-8">
      <div className="flex items-center justify-between">
        <span className={`text-7xl font-serif ${GRADE_COLORS[score.letter_grade]}`}>{score.letter_grade}</span>
        <div className="text-right">
          <span className="text-5xl font-medium">{score.total_normalized}</span>
          <span className="text-2xl text-[var(--text-tertiary)]">/100</span>
          <p className="text-sm text-[var(--text-secondary)] mt-1">{GRADE_VERDICTS[score.letter_grade]}</p>
        </div>
      </div>
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => <span key={badge} className="badge forest">{BADGE_EMOJI[badge] || "🏆"} {badge}</span>)}
        </div>
      )}
      <RadarChart data={category_scores} size={260} />
      <div className="space-y-6">
        {[
          { title: "structure", items: [["hook strength", score.hook_strength, "sniper hook"], ["escalation logic", score.escalation_logic, "perfect build"], ["pacing & rhythm", score.pacing_rhythm, "great rhythm"], ["ending strength", score.ending_strength, "mic drop"]] },
          { title: "substance", items: [["specificity", score.specificity, "razor specific"], ["originality", score.originality, "fresh angle"], ["emotional trigger", score.emotional_trigger_accuracy, "hits different"], ["target precision", score.target_precision, "bullseye audience"]] },
          { title: "impact", items: [["relatability", score.relatability, "mirror moment"], ["quotability", score.quotability, "quotable"], ["virality", score.virality, "would share"], ["rewatchability", score.rewatchability, "replay value"]] },
          { title: "authenticity", items: [["conversational feel", score.conversational_feel, "sounds human"], ["visual potential", score.visual_potential, "cinematic"]] },
        ].map(section => (
          <div key={section.title} className="space-y-3">
            <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-medium">{section.title}</p>
            {section.items.map(([label, s, badge]) => <ScoreBar key={label as string} label={label as string} score={s as number} badgeName={badge as string} />)}
          </div>
        ))}
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, format, platform, tone, emotionalTrigger: emotionalTrigger || undefined }),
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
          <textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="what's your script about?" className="textarea h-72" />
        </div>
        <div className="space-y-5">
          <div><label className="block text-sm text-[var(--text-secondary)] mb-2">format</label><PillSelector options={FORMATS} selected={format} onSelect={(v) => v && setFormat(v as string)} /></div>
          <div><label className="block text-sm text-[var(--text-secondary)] mb-2">platform</label><PillSelector options={PLATFORMS} selected={platform} onSelect={(v) => v && setPlatform(v as string)} /></div>
          <div><label className="block text-sm text-[var(--text-secondary)] mb-2">tone</label><PillSelector options={TONES} selected={tone} onSelect={(v) => v && setTone(v as string)} /></div>
          <div><label className="block text-sm text-[var(--text-secondary)] mb-2">emotional trigger</label><PillSelector options={EMOTIONAL_TRIGGERS} selected={emotionalTrigger} onSelect={(v) => setEmotionalTrigger(v as string | null)} allowNone /></div>
        </div>
      </div>
      <button onClick={handleGenerate} disabled={!topic.trim() || loading} className="btn-primary w-full">
        {loading ? "engineering your script..." : "generate script"}
      </button>
      {error && <div className="p-4 bg-[var(--terracotta-muted)] rounded-lg text-sm">{error}</div>}
    </div>
  );
}

function HooksTab() {
  const [topic, setTopic] = useState("");
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
      <div>
        <label className="block text-sm text-[var(--text-secondary)] mb-2">topic</label>
        <textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="what's your video about?" className="textarea h-40" />
      </div>
      <button onClick={handleGenerate} disabled={!topic.trim() || loading} className="btn-primary w-full">
        {loading ? "generating..." : "generate hooks"}
      </button>
      {hooks && (
        <div className="space-y-4">
          {hooks.map((item, i) => (
            <div key={i} className="card p-5">
              <p className="text-lg mb-3">&quot;{item.hook}&quot;</p>
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
      setResults({ twitter: "🧵 Thread version...", linkedin: "Here's a story..." });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-2">original content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="paste your content..." className="textarea h-60" />
        </div>
        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-2">repurpose for</label>
          <PillSelector options={REPURPOSE_PLATFORMS} selected={targetPlatforms} onSelect={(v) => setTargetPlatforms(v as string[])} multi />
        </div>
      </div>
      <button onClick={handleRepurpose} disabled={!content.trim() || targetPlatforms.length === 0 || loading} className="btn-primary w-full">
        {loading ? "shapeshifting..." : "repurpose"}
      </button>
      {results && Object.entries(results).map(([platform, text]) => (
        <div key={platform} className="card p-6">
          <h4 className="font-medium mb-3 capitalize">{platform}</h4>
          <p className="text-[var(--text-secondary)]">{text}</p>
        </div>
      ))}
    </div>
  );
}

function AnalyzeTab() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<{ factors: string[] } | null>(null);

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setAnalysis({ factors: ["Strong contrarian hook", "Specific numbers", "Peak timing"] });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm text-[var(--text-secondary)] mb-2">content to analyze</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="paste the content that performed well..." className="textarea h-40" />
      </div>
      <button onClick={handleAnalyze} disabled={!content.trim() || loading} className="btn-primary w-full">
        {loading ? "analyzing..." : "analyze"}
      </button>
      {analysis && (
        <div className="card p-6">
          <h4 className="font-medium mb-4">why it worked</h4>
          {analysis.factors.map((f, i) => (
            <div key={i} className="flex items-center gap-3 mb-2">
              <span className="badge terracotta">{i + 1}</span>
              <span>{f}</span>
            </div>
          ))}
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
      <nav className="border-b border-[var(--border-default)]">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <span className="logo">scriptkit</span>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="headline text-5xl md:text-6xl mb-6">
              <span className="headline-accent">Scripts</span> That<br />
              Actually Work
            </h1>
            <p className="text-lg text-[var(--text-secondary)] mb-8">
              Write scripts, generate hooks, repurpose content, analyze what works. The creator toolkit.
            </p>
            <div className="divider" />
          </div>
          <div className="flex justify-center">
            {/* Hero image placeholder - replace with actual PNG */}
            <div className="w-80 h-64 bg-[var(--bg-elevated)] rounded-lg flex items-center justify-center border border-[var(--border-default)]">
              <span className="text-[var(--text-tertiary)] text-sm">hero image</span>
            </div>
          </div>
        </div>
      </header>

      <div className="divider max-w-5xl mx-auto" />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="tab-nav">
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setResult(null); }} className={`tab ${activeTab === tab.id ? 'active' : ''}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="card p-6 md:p-8">
          {activeTab === "script" && <ScriptTab onResult={setResult} />}
          {activeTab === "hooks" && <HooksTab />}
          {activeTab === "repurpose" && <RepurposeTab />}
          {activeTab === "analyze" && <AnalyzeTab />}
        </div>

        {/* Results */}
        {activeTab === "script" && result && (
          <div className="mt-12 space-y-8">
            <ReportCard data={result} />
            <div className="card p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-serif">your script</h3>
                <span className="text-sm text-[var(--text-tertiary)]">{result.estimated_duration} · {result.word_count} words</span>
              </div>
              <p className="whitespace-pre-wrap leading-relaxed mb-6">{result.script}</p>
              <button onClick={copyScript} className="btn-secondary">{copied ? "copied ✓" : "copy script"}</button>
            </div>
            {result.diagnosis.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-serif">diagnosis</h3>
                {result.diagnosis.map((item, i) => (
                  <div key={i} className="card p-5 space-y-3">
                    <span className="badge terracotta">{item.issue_type}</span>
                    <div className="border-l-2 border-[var(--warning)] pl-4"><p className="text-sm italic">&quot;{item.original_line}&quot;</p></div>
                    <div className="border-l-2 border-[var(--forest)] pl-4"><p className="text-sm">&quot;{item.rewrite}&quot;</p></div>
                    <p className="text-xs text-[var(--text-tertiary)]">{item.explanation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-default)] py-8">
        <p className="text-center text-sm text-[var(--text-tertiary)]">scriptkit</p>
      </footer>
    </div>
  );
}
