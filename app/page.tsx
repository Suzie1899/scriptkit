"use client";

import { useState } from "react";
import Image from "next/image";
import type { GenerateResponse } from "@/lib/types";
import { RadarChart } from "@/components/RadarChart";

// Tab definitions
const TABS = [
  { id: "script", label: "script", description: "write a new script", color: "yellow" },
  { id: "repurpose", label: "repurpose", description: "adapt for other platforms", color: "blue" },
  { id: "analyze", label: "analyze", description: "why did this perform?", color: "green" },
  { id: "hooks", label: "hooks", description: "scroll-stopping openers", color: "pink" },
];

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
  S: "text-[var(--folder-purple)]",
  A: "text-[var(--folder-green)]",
  B: "text-[var(--folder-blue)]",
  C: "text-[var(--folder-yellow)]",
  D: "text-[var(--folder-pink)]",
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

// Floating decorative folders
function FloatingFolders() {
  return (
    <>
      <div className="floating-folder" style={{ top: '10%', left: '5%', animationDelay: '0s' }}>
        <Image src="/images/folder-yellow.svg" alt="" width={60} height={48} />
      </div>
      <div className="floating-folder" style={{ top: '20%', right: '8%', animationDelay: '1s' }}>
        <Image src="/images/folder-blue.svg" alt="" width={50} height={40} />
      </div>
      <div className="floating-folder" style={{ top: '60%', left: '3%', animationDelay: '2s' }}>
        <Image src="/images/folder-green.svg" alt="" width={45} height={36} />
      </div>
      <div className="floating-folder" style={{ top: '70%', right: '5%', animationDelay: '0.5s' }}>
        <Image src="/images/folder-pink.svg" alt="" width={55} height={44} />
      </div>
      <div className="sparkle" style={{ top: '15%', left: '20%', animationDelay: '0s' }}>
        <Image src="/images/sparkle.svg" alt="" width={16} height={16} />
      </div>
      <div className="sparkle" style={{ top: '25%', right: '25%', animationDelay: '0.7s' }}>
        <Image src="/images/sparkle.svg" alt="" width={12} height={12} />
      </div>
      <div className="sparkle" style={{ top: '55%', left: '15%', animationDelay: '1.4s' }}>
        <Image src="/images/sparkle.svg" alt="" width={14} height={14} />
      </div>
    </>
  );
}

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
          className={`pill-retro ${isSelected(option) ? 'active' : ''}`}
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
    if (s >= 9) return "bg-[var(--folder-purple)]";
    if (s >= 7) return "bg-[var(--folder-green)]";
    if (s >= 5) return "bg-[var(--folder-yellow)]";
    return "bg-[var(--folder-pink)]";
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
      <div className="progress-retro flex-1">
        <div
          className={`progress-retro-fill ${getColor(score)}`}
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
    <div className="card-window">
      <div className="card-window-header">
        <div className="card-window-dot red" />
        <div className="card-window-dot yellow" />
        <div className="card-window-dot green" />
        <span className="ml-2 text-sm font-medium text-[var(--text-primary)]">report_card.exe</span>
      </div>
      <div className="card-window-body space-y-8">
        {/* Grade + Score Header */}
        <div className="flex items-center justify-between">
          <div>
            <span
              className={`text-7xl font-bold ${GRADE_COLORS[score.letter_grade]}`}
              style={{ fontFamily: 'var(--font-pixel)' }}
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
                className="badge-retro purple"
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

        {/* Radar Chart */}
        <RadarChart data={category_scores} size={260} />

        {/* All 14 Dimension Bars */}
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-semibold">
              structure
            </p>
            <ScoreBar label="hook strength" score={score.hook_strength} badgeName="sniper hook" />
            <ScoreBar label="escalation logic" score={score.escalation_logic} badgeName="perfect build" />
            <ScoreBar label="pacing & rhythm" score={score.pacing_rhythm} badgeName="great rhythm" />
            <ScoreBar label="ending strength" score={score.ending_strength} badgeName="mic drop" />
          </div>

          <div className="space-y-3">
            <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-semibold">
              substance
            </p>
            <ScoreBar label="specificity" score={score.specificity} badgeName="razor specific" />
            <ScoreBar label="originality" score={score.originality} badgeName="fresh angle" />
            <ScoreBar label="emotional trigger" score={score.emotional_trigger_accuracy} badgeName="hits different" />
            <ScoreBar label="target precision" score={score.target_precision} badgeName="bullseye audience" />
          </div>

          <div className="space-y-3">
            <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-semibold">
              impact
            </p>
            <ScoreBar label="relatability" score={score.relatability} badgeName="mirror moment" />
            <ScoreBar label="quotability" score={score.quotability} badgeName="quotable" />
            <ScoreBar label="virality" score={score.virality} badgeName="would share" />
            <ScoreBar label="rewatchability" score={score.rewatchability} badgeName="replay value" />
          </div>

          <div className="space-y-3">
            <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider font-semibold">
              authenticity
            </p>
            <ScoreBar label="conversational feel" score={score.conversational_feel} badgeName="sounds human" />
            <ScoreBar label="visual potential" score={score.visual_potential} badgeName="cinematic" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Tab Content Components
function ScriptTab({
  onResult,
}: {
  onResult: (data: GenerateResponse) => void;
}) {
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

      onResult(data);
    } catch {
      setError("something went wrong. try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left - Textarea */}
        <div className="card-window">
          <div className="card-window-header">
            <div className="card-window-dot red" />
            <div className="card-window-dot yellow" />
            <div className="card-window-dot green" />
            <span className="ml-2 text-sm font-medium text-[var(--text-primary)]">new_script.txt</span>
          </div>
          <div className="p-1">
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="what's your script about? a topic, a thought, a rough idea..."
              className="textarea-retro h-80 md:h-[360px] border-0"
            />
          </div>
        </div>

        {/* Right - Parameters */}
        <div className="card-window">
          <div className="card-window-header" style={{ background: 'linear-gradient(180deg, var(--folder-yellow) 0%, #D4B52E 100%)' }}>
            <div className="card-window-dot red" />
            <div className="card-window-dot yellow" />
            <div className="card-window-dot green" />
            <span className="ml-2 text-sm font-medium text-[var(--text-primary)]">parameters.config</span>
          </div>
          <div className="card-window-body space-y-5 max-h-[400px] overflow-y-auto">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">format</label>
              <PillSelector options={FORMATS} selected={format} onSelect={(v) => v && setFormat(v as string)} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">platform</label>
              <PillSelector options={PLATFORMS} selected={platform} onSelect={(v) => v && setPlatform(v as string)} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">tone</label>
              <PillSelector options={TONES} selected={tone} onSelect={(v) => v && setTone(v as string)} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">emotional trigger</label>
              <PillSelector options={EMOTIONAL_TRIGGERS} selected={emotionalTrigger} onSelect={(v) => setEmotionalTrigger(v as string | null)} allowNone />
              {!emotionalTrigger && (
                <p className="text-xs text-[var(--text-tertiary)]">auto — engine picks the best trigger</p>
              )}
            </div>

            <button
              onClick={() => setShowContext(!showContext)}
              className="text-sm text-[var(--accent)] hover:underline transition-colors"
            >
              {showContext ? "- hide context" : "+ add context for a better script"}
            </button>

            {showContext && (
              <div className="space-y-4 pt-4 border-t-2 border-dashed border-[var(--border-default)]">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">who&apos;s watching?</label>
                  <textarea
                    value={targetViewer}
                    onChange={(e) => setTargetViewer(e.target.value)}
                    placeholder="e.g. aspiring creators who want to grow but don't know what to post"
                    className="textarea-retro h-16 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">real details to include</label>
                  <textarea
                    value={realAnchors}
                    onChange={(e) => setRealAnchors(e.target.value)}
                    placeholder="names, numbers, stories — real details make the script 10x better"
                    className="textarea-retro h-16 text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!topic.trim() || loading}
        className="btn-retro w-full"
      >
        {loading ? "engineering your script..." : "generate script →"}
      </button>

      {error && (
        <div className="p-4 bg-[var(--folder-pink)] border-2 border-[var(--danger)] rounded-lg text-[var(--text-primary)] text-sm">
          {error}
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
        twitter: "🧵 Thread version would go here...\n\n1/ Key insight from your content\n2/ Supporting point\n3/ The takeaway",
        linkedin: "Here's a story about [topic]...\n\nWhen I first started, I thought [common belief].\n\nThen I learned [insight].\n\nThe lesson? [takeaway]\n\n#relevanthashtag",
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-window">
          <div className="card-window-header" style={{ background: 'linear-gradient(180deg, var(--folder-blue) 0%, #5BA8CC 100%)' }}>
            <div className="card-window-dot red" />
            <div className="card-window-dot yellow" />
            <div className="card-window-dot green" />
            <span className="ml-2 text-sm font-medium text-[var(--text-primary)]">original_content.txt</span>
          </div>
          <div className="p-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="paste your content here — a script, a blog post, a tweet that worked..."
              className="textarea-retro h-80 md:h-[360px] border-0"
            />
          </div>
        </div>

        <div className="card-window">
          <div className="card-window-header" style={{ background: 'linear-gradient(180deg, var(--folder-green) 0%, #9AB87D 100%)' }}>
            <div className="card-window-dot red" />
            <div className="card-window-dot yellow" />
            <div className="card-window-dot green" />
            <span className="ml-2 text-sm font-medium text-[var(--text-primary)]">repurpose.config</span>
          </div>
          <div className="card-window-body space-y-6">
            <h3 className="font-semibold text-[var(--text-primary)]">repurpose for</h3>
            <p className="text-sm text-[var(--text-tertiary)]">select platforms to adapt your content for</p>
            
            <PillSelector
              options={REPURPOSE_PLATFORMS}
              selected={targetPlatforms}
              onSelect={(v) => setTargetPlatforms(v as string[])}
              multi
            />

            <div className="pt-4 border-t-2 border-dashed border-[var(--border-default)]">
              <p className="text-xs text-[var(--text-tertiary)] mb-2">each platform gets:</p>
              <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                <li>📄 native format & length</li>
                <li>🎯 platform-specific tone</li>
                <li>🪝 optimized hooks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleRepurpose}
        disabled={!content.trim() || targetPlatforms.length === 0 || loading}
        className="btn-retro w-full"
      >
        {loading ? "shapeshifting..." : `repurpose for ${targetPlatforms.length} platform${targetPlatforms.length !== 1 ? 's' : ''} →`}
      </button>

      {results && (
        <div className="space-y-4">
          {Object.entries(results).map(([platform, text]) => (
            <div key={platform} className="card-window">
              <div className="card-window-header">
                <div className="card-window-dot red" />
                <div className="card-window-dot yellow" />
                <div className="card-window-dot green" />
                <span className="ml-2 text-sm font-medium text-[var(--text-primary)]">{platform}_version.txt</span>
              </div>
              <div className="card-window-body">
                <p className="text-[var(--text-primary)] whitespace-pre-wrap">{text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AnalyzeTab() {
  const [content, setContent] = useState("");
  const [metrics, setMetrics] = useState({ views: "", likes: "", shares: "", comments: "" });
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<{
    topFactors: string[];
    distribution: string;
    psychology: string;
    replicable: string[];
    notReplicable: string[];
  } | null>(null);

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setLoading(true);
    
    setTimeout(() => {
      setAnalysis({
        topFactors: [
          "Strong contrarian hook challenged common belief",
          "Specific numbers created credibility",
          "Posted during peak engagement hours"
        ],
        distribution: "Initial engagement triggered algorithm push. High share rate (2.3%) indicates strong word-of-mouth. Cross-posted to LinkedIn where it got a second wave.",
        psychology: "Primary trigger: Identity. Viewers saw themselves in the struggle described. High comment rate suggests debate/discussion value.",
        replicable: [
          "Contrarian angle on common advice",
          "Specific numbers and timeframes",
          "Question-based hook format"
        ],
        notReplicable: [
          "Timing coincided with trending topic",
          "Influencer quote tweet gave initial boost",
          "First-mover advantage on this angle"
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-window">
          <div className="card-window-header" style={{ background: 'linear-gradient(180deg, var(--folder-green) 0%, #9AB87D 100%)' }}>
            <div className="card-window-dot red" />
            <div className="card-window-dot yellow" />
            <div className="card-window-dot green" />
            <span className="ml-2 text-sm font-medium text-[var(--text-primary)]">content_to_analyze.txt</span>
          </div>
          <div className="p-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="paste the content that performed well — we'll break down why it worked..."
              className="textarea-retro h-80 md:h-[360px] border-0"
            />
          </div>
        </div>

        <div className="card-window">
          <div className="card-window-header">
            <div className="card-window-dot red" />
            <div className="card-window-dot yellow" />
            <div className="card-window-dot green" />
            <span className="ml-2 text-sm font-medium text-[var(--text-primary)]">metrics.config</span>
          </div>
          <div className="card-window-body space-y-6">
            <h3 className="font-semibold text-[var(--text-primary)]">metrics (optional)</h3>
            <p className="text-sm text-[var(--text-tertiary)]">add numbers for deeper analysis</p>
            
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(metrics).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <label className="text-xs font-semibold text-[var(--text-tertiary)] uppercase">{key}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setMetrics({ ...metrics, [key]: e.target.value })}
                    placeholder="0"
                    className="input-retro text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!content.trim() || loading}
        className="btn-retro w-full"
      >
        {loading ? "performing autopsy..." : "analyze content →"}
      </button>

      {analysis && (
        <div className="space-y-6">
          <div className="card-window">
            <div className="card-window-header">
              <div className="card-window-dot red" />
              <div className="card-window-dot yellow" />
              <div className="card-window-dot green" />
              <span className="ml-2 text-sm font-medium text-[var(--text-primary)]">analysis_results.txt</span>
            </div>
            <div className="card-window-body">
              <h4 className="font-semibold text-[var(--text-primary)] mb-4">why it worked (top 3)</h4>
              <div className="space-y-3">
                {analysis.topFactors.map((factor, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="badge-retro yellow">{i + 1}</span>
                    <p className="text-[var(--text-secondary)]">{factor}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="card-folder green p-6 pt-8">
              <h4 className="font-semibold text-[var(--text-primary)] mb-3">✓ replicable</h4>
              <ul className="space-y-2">
                {analysis.replicable.map((item, i) => (
                  <li key={i} className="text-sm text-[var(--text-secondary)]">• {item}</li>
                ))}
              </ul>
            </div>
            <div className="card-folder pink p-6 pt-8">
              <h4 className="font-semibold text-[var(--text-primary)] mb-3">✗ not replicable</h4>
              <ul className="space-y-2">
                {analysis.notReplicable.map((item, i) => (
                  <li key={i} className="text-sm text-[var(--text-secondary)]">• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
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
        { hook: "Stop waking up at 5am if you want to be productive.", type: "contrarian", why: "Challenges widely-held belief, creates instant curiosity" },
        { hook: "I wasted 3 years doing this wrong.", type: "confession", why: "Vulnerability + specific timeframe = credibility" },
        { hook: "The reason you're tired isn't sleep.", type: "curiosity gap", why: "Opens a loop that demands resolution" },
        { hook: "If you're a creator making under $10k/month, this is why.", type: "identity call", why: "Specific audience + implied solution" },
        { hook: "Nobody's talking about this yet.", type: "FOMO", why: "Exclusivity + timeliness" },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-window">
          <div className="card-window-header" style={{ background: 'linear-gradient(180deg, var(--folder-pink) 0%, #E89B9B 100%)' }}>
            <div className="card-window-dot red" />
            <div className="card-window-dot yellow" />
            <div className="card-window-dot green" />
            <span className="ml-2 text-sm font-medium text-[var(--text-primary)]">topic.txt</span>
          </div>
          <div className="p-1">
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="what's your video about? the more specific, the better the hooks..."
              className="textarea-retro h-60 border-0"
            />
          </div>
        </div>

        <div className="card-window">
          <div className="card-window-header">
            <div className="card-window-dot red" />
            <div className="card-window-dot yellow" />
            <div className="card-window-dot green" />
            <span className="ml-2 text-sm font-medium text-[var(--text-primary)]">audience.config</span>
          </div>
          <div className="card-window-body space-y-6">
            <h3 className="font-semibold text-[var(--text-primary)]">audience (optional)</h3>
            <textarea
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="who specifically is this for? the more specific, the sharper the hooks..."
              className="textarea-retro h-32"
            />
            
            <div className="pt-4 border-t-2 border-dashed border-[var(--border-default)]">
              <p className="text-xs text-[var(--text-tertiary)]">generates 5-10 hooks using proven formulas:</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {["contrarian", "confession", "curiosity gap", "identity call", "FOMO"].map(f => (
                  <span key={f} className="badge-retro yellow text-xs">{f}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!topic.trim() || loading}
        className="btn-retro w-full"
      >
        {loading ? "generating hooks..." : "generate hooks →"}
      </button>

      {hooks && (
        <div className="space-y-4">
          {hooks.map((item, i) => (
            <div key={i} className="card-folder p-5 pt-8" style={{ '--folder-tab-color': i % 2 === 0 ? 'var(--folder-yellow)' : 'var(--folder-pink)' } as React.CSSProperties}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <p className="text-lg text-[var(--text-primary)] font-medium">&quot;{item.hook}&quot;</p>
                <button className="text-sm text-[var(--accent)] hover:underline shrink-0">copy</button>
              </div>
              <div className="flex items-center gap-3">
                <span className="badge-retro blue">{item.type}</span>
                <span className="text-xs text-[var(--text-tertiary)]">{item.why}</span>
              </div>
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
    <div className="min-h-screen bg-[var(--bg-primary)] relative">
      {/* Floating decorative elements */}
      <FloatingFolders />
      
      {/* Navbar */}
      <nav className="navbar-retro fixed top-0 left-0 right-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="logo-pixel">
            scriptkit
          </span>
          <div className="flex items-center gap-2">
            <Image src="/images/cursor.svg" alt="" width={20} height={20} className="opacity-60" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-16 relative z-10">
        {/* Hero Text */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-7xl text-[var(--text-primary)] mb-4">
            scriptkit
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            the creator toolkit. write scripts, generate hooks, repurpose content, analyze what works.
          </p>
        </div>

        {/* Tab Navigation - Folder Style */}
        <div className="flex justify-center mb-2">
          <div className="inline-flex gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setResult(null);
                }}
                className={`px-6 py-3 text-sm font-medium transition-all border-2 border-b-0 rounded-t-lg ${
                  activeTab === tab.id
                    ? `bg-[var(--folder-${tab.color})] border-[var(--text-primary)] text-[var(--text-primary)]`
                    : "bg-[var(--bg-elevated)] border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]"
                }`}
                style={activeTab === tab.id ? { 
                  background: `var(--folder-${tab.color})`,
                  marginBottom: '-2px',
                  zIndex: 1,
                  position: 'relative'
                } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Container */}
        <div className="border-2 border-[var(--text-primary)] rounded-lg rounded-tl-none bg-[var(--bg-surface)] p-6 mb-8">
          {/* Tab Description */}
          <p className="text-center text-[var(--text-tertiary)] mb-6 text-sm">
            {TABS.find(t => t.id === activeTab)?.description}
          </p>

          {/* Tab Content */}
          {activeTab === "script" && <ScriptTab onResult={setResult} />}
          {activeTab === "repurpose" && <RepurposeTab />}
          {activeTab === "analyze" && <AnalyzeTab />}
          {activeTab === "hooks" && <HooksTab />}
        </div>

        {/* Script Results (only for script tab) */}
        {activeTab === "script" && result && (
          <div className="mt-12 space-y-8">
            <ReportCard data={result} />

            <div className="card-window">
              <div className="card-window-header" style={{ background: 'linear-gradient(180deg, var(--folder-green) 0%, #9AB87D 100%)' }}>
                <div className="card-window-dot red" />
                <div className="card-window-dot yellow" />
                <div className="card-window-dot green" />
                <span className="ml-2 text-sm font-medium text-[var(--text-primary)]">your_script.txt</span>
                <span className="ml-auto text-xs text-[var(--text-secondary)]">
                  {result.estimated_duration} · {result.word_count} words
                </span>
              </div>
              <div className="card-window-body">
                <p className="text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed mb-6">
                  {result.script}
                </p>
                <button
                  onClick={copyScript}
                  className="btn-retro text-sm py-2"
                >
                  {copied ? "copied ✓" : "copy script"}
                </button>
              </div>
            </div>

            {result.diagnosis.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-pixel)' }}>
                  diagnosis — {result.diagnosis.length} weakest lines
                </h3>
                {result.diagnosis.map((item, i) => (
                  <div key={i} className="card-folder yellow p-5 pt-8">
                    <span className="badge-retro pink mb-3 inline-block">
                      {item.issue_type}
                    </span>
                    <div className="border-l-4 border-[var(--folder-yellow)] pl-4 mb-3">
                      <p className="text-sm text-[var(--text-secondary)] italic">&quot;{item.original_line}&quot;</p>
                    </div>
                    <div className="border-l-4 border-[var(--folder-green)] pl-4 mb-3">
                      <p className="text-sm text-[var(--text-primary)]">&quot;{item.rewrite}&quot;</p>
                    </div>
                    <p className="text-xs text-[var(--text-tertiary)]">{item.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {result.anti_generic_flags.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-pixel)' }}>anti-generic filter</h3>
                <div className="flex flex-wrap gap-2">
                  {result.anti_generic_flags.map((flag, i) => (
                    <span
                      key={i}
                      className="badge-retro pink"
                    >
                      &quot;{flag.phrase}&quot; → {flag.replacement}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {result.anti_generic_flags.length === 0 && result && (
              <p className="text-sm text-[var(--folder-green)] font-semibold">✓ no generic patterns detected</p>
            )}
          </div>
        )}
      </main>

      {/* How It Works Section */}
      <section className="border-t-3 border-[var(--text-primary)] py-20 bg-[var(--bg-elevated)]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl text-[var(--text-primary)] mb-4">not another ai tool.</h2>
          <div className="text-[var(--text-secondary)] space-y-2 mb-10 max-w-2xl">
            <p>9 modules. each one has a psychological job.</p>
            <p>then we grade it. 14 dimensions. the 3 weakest lines get rewritten.</p>
            <p>then we kill anything that sounds like everyone else.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {MODULES.map((module, i) => (
              <div key={module} className="flex items-center gap-2">
                <span className="badge-retro yellow">
                  {module}
                </span>
                {i < MODULES.length - 1 && <span className="text-[var(--text-tertiary)]">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t-3 border-[var(--text-primary)] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl text-[var(--text-primary)] mb-10">faq</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={item.q}
                className={`card-folder ${['yellow', 'blue', 'green', 'pink'][i % 4]} p-5 pt-8`}
              >
                <p className="font-medium text-[var(--text-primary)] mb-2">&quot;{item.q}&quot;</p>
                <p className="text-sm text-[var(--text-secondary)]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-3 border-[var(--text-primary)] py-10 bg-[var(--bg-elevated)]">
        <div className="flex justify-center items-center gap-4">
          <Image src="/images/folder-yellow.svg" alt="" width={24} height={20} />
          <p className="text-center text-sm text-[var(--text-tertiary)]">
            scriptkit — the creator toolkit
          </p>
          <Image src="/images/folder-pink.svg" alt="" width={24} height={20} />
        </div>
      </footer>
    </div>
  );
}
