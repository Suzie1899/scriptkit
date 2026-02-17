"use client";

import { useState } from "react";

const FORMATS = [
  { value: "talking_head", label: "Talking Head" },
  { value: "skit", label: "Skit" },
  { value: "voxpop", label: "Vox Pop" },
  { value: "explainer", label: "Explainer" },
  { value: "storytelling", label: "Storytelling" },
  { value: "montage", label: "Montage" },
  { value: "meme", label: "Meme" },
];

const PLATFORMS = [
  { value: "tiktok", label: "TikTok" },
  { value: "instagram_reels", label: "Instagram Reels" },
  { value: "youtube_shorts", label: "YouTube Shorts" },
  { value: "twitter", label: "Twitter/X" },
];

const TONES = [
  { value: "casual", label: "Casual" },
  { value: "hype", label: "Hype" },
  { value: "storyteller", label: "Storyteller" },
  { value: "explainer", label: "Explainer" },
  { value: "observer", label: "Observer" },
  { value: "straight_talk", label: "Straight Talk" },
];

const EMOTIONAL_TRIGGERS = [
  { value: "identity", label: "Identity" },
  { value: "curiosity", label: "Curiosity" },
  { value: "humor", label: "Humor" },
  { value: "relatability", label: "Relatability" },
  { value: "aspiration", label: "Aspiration" },
  { value: "urgency", label: "Urgency" },
];

const HOOK_STYLES = [
  { value: "pattern_break", label: "Pattern Break" },
  { value: "shocking_stat", label: "Shocking Stat" },
  { value: "confession", label: "Confession" },
  { value: "question", label: "Question" },
  { value: "relatable_moment", label: "Relatable Moment" },
];

interface GradeResult {
  totalScore: number;
  grades: { dimension: string; score: number; note: string }[];
  badges: string[];
  weakLines: { line: string; issue: string }[];
  rewrite: string;
}

export default function Home() {
  const [script, setScript] = useState("");
  const [format, setFormat] = useState("talking_head");
  const [platform, setPlatform] = useState("tiktok");
  const [tone, setTone] = useState("casual");
  const [emotionalTrigger, setEmotionalTrigger] = useState("curiosity");
  const [hookStyle, setHookStyle] = useState("pattern_break");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);

  const gradeScript = async () => {
    if (!script.trim()) return;
    
    setLoading(true);
    
    // Simulate grading (will connect to API later)
    await new Promise((r) => setTimeout(r, 1500));
    
    const mockResult: GradeResult = {
      totalScore: 72,
      grades: [
        { dimension: "Hook Strength", score: 7, note: "Opens with movement but could be sharper" },
        { dimension: "Escalation Logic", score: 6, note: "Tension builds but plateau in middle" },
        { dimension: "Pacing", score: 8, note: "Good rhythm, reads well aloud" },
        { dimension: "Ending Strength", score: 7, note: "Lands but could be more memorable" },
        { dimension: "Specificity", score: 5, note: "Too many generic phrases" },
        { dimension: "Originality", score: 6, note: "Familiar structure, needs fresh angle" },
        { dimension: "Emotional Trigger", score: 7, note: `${emotionalTrigger} comes through` },
        { dimension: "Target Precision", score: 6, note: "Audience somewhat clear" },
        { dimension: "Relatability", score: 8, note: "Strong recognition moments" },
        { dimension: "Quotability", score: 5, note: "No standout lines yet" },
        { dimension: "Virality", score: 6, note: "Shareable but not irresistible" },
        { dimension: "Rewatchability", score: 5, note: "One-and-done energy" },
        { dimension: "Conversational Feel", score: 8, note: "Sounds human" },
        { dimension: "Visual Potential", score: 7, note: "Can see it as video" },
      ],
      badges: ["🗣️ SOUNDS HUMAN", "🎬 VISUAL READY"],
      weakLines: [
        { line: "This is something everyone needs to know", issue: "Generic opener — be specific" },
        { line: "It's not about X, it's about Y", issue: "AI pattern — rewrite naturally" },
      ],
      rewrite: `Here's your hook rewritten:\n\n"Stop. I tried ${script.split(" ").slice(0, 3).join(" ")}... and it actually worked."\n\nMore specific, pattern break, instantly curious.`,
    };
    
    setResult(mockResult);
    setLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-400";
    if (score >= 6) return "text-yellow-400";
    return "text-red-400";
  };

  const getGradeLabel = (score: number) => {
    if (score >= 90) return { grade: "S", color: "text-purple-400", label: "Exceptional" };
    if (score >= 80) return { grade: "A", color: "text-green-400", label: "Strong" };
    if (score >= 70) return { grade: "B", color: "text-yellow-400", label: "Good foundation" };
    if (score >= 60) return { grade: "C", color: "text-orange-400", label: "Needs work" };
    return { grade: "F", color: "text-red-400", label: "Major rewrite" };
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">
            ScriptKit<span className="text-zinc-500">.sif</span>
          </h1>
          <span className="text-xs text-zinc-500">v2.0</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Script Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400">Your Script</label>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Paste your script here... or describe what you want to say"
            className="w-full h-40 bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700 resize-none"
          />
          <p className="text-xs text-zinc-600">{script.length} characters</p>
        </div>

        {/* Intake Options */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-500">Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-700"
            >
              {FORMATS.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-500">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-700"
            >
              {PLATFORMS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-500">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-700"
            >
              {TONES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-500">Emotion</label>
            <select
              value={emotionalTrigger}
              onChange={(e) => setEmotionalTrigger(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-700"
            >
              {EMOTIONAL_TRIGGERS.map((e) => (
                <option key={e.value} value={e.value}>{e.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1 col-span-2 sm:col-span-1">
            <label className="text-xs font-medium text-zinc-500">Hook Style</label>
            <select
              value={hookStyle}
              onChange={(e) => setHookStyle(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-700"
            >
              {HOOK_STYLES.map((h) => (
                <option key={h.value} value={h.value}>{h.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grade Button */}
        <button
          onClick={gradeScript}
          disabled={!script.trim() || loading}
          className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Grading..." : "Grade My Script"}
        </button>

        {/* Results */}
        {result && (
          <div className="space-y-6 pt-4 border-t border-zinc-800">
            {/* Score Overview */}
            <div className="text-center space-y-2">
              <div className={`text-6xl font-bold ${getGradeLabel(result.totalScore).color}`}>
                {getGradeLabel(result.totalScore).grade}
              </div>
              <div className="text-2xl font-semibold">{result.totalScore}/100</div>
              <div className="text-zinc-500">{getGradeLabel(result.totalScore).label}</div>
            </div>

            {/* Badges */}
            {result.badges.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {result.badges.map((badge) => (
                  <span
                    key={badge}
                    className="bg-zinc-800 px-3 py-1 rounded-full text-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}

            {/* Grade Breakdown */}
            <div className="space-y-2">
              <h3 className="font-semibold text-zinc-400">Grade Breakdown</h3>
              <div className="grid gap-2">
                {result.grades.map((g) => (
                  <div
                    key={g.dimension}
                    className="flex items-center justify-between bg-zinc-900 px-3 py-2 rounded-lg text-sm"
                  >
                    <span className="text-zinc-300">{g.dimension}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500 text-xs hidden sm:inline">{g.note}</span>
                      <span className={`font-semibold ${getScoreColor(g.score)}`}>
                        {g.score}/10
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Lines */}
            {result.weakLines.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-zinc-400">🔍 Weak Lines</h3>
                <div className="space-y-2">
                  {result.weakLines.map((w, i) => (
                    <div key={i} className="bg-zinc-900 p-3 rounded-lg text-sm">
                      <p className="text-red-400 font-mono">&quot;{w.line}&quot;</p>
                      <p className="text-zinc-500 mt-1">↳ {w.issue}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rewrite Suggestion */}
            <div className="space-y-2">
              <h3 className="font-semibold text-zinc-400">✍️ Rewrite</h3>
              <div className="bg-zinc-900 p-4 rounded-lg">
                <p className="text-green-400 whitespace-pre-wrap text-sm">{result.rewrite}</p>
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => setResult(null)}
              className="w-full border border-zinc-700 text-zinc-400 py-2 rounded-lg hover:bg-zinc-900 transition-colors text-sm"
            >
              Grade Another Script
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-4 py-4 mt-8">
        <div className="max-w-2xl mx-auto text-center text-xs text-zinc-600">
          Powered by SIF v2.0 — Script Intelligence Framework
        </div>
      </footer>
    </div>
  );
}
