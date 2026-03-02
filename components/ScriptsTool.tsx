"use client";

import { useState } from "react";

const FORMATS = [
  { id: "talking head", label: "TALKING HEAD" },
  { id: "skit", label: "SKIT" },
  { id: "storytelling", label: "STORYTELLING" },
  { id: "montage", label: "MONTAGE" },
  { id: "voxpop", label: "VOXPOP" },
  { id: "explainer", label: "EXPLAINER" },
];

const PLATFORMS = [
  { id: "reels", label: "REELS" },
  { id: "tiktok", label: "TIKTOK" },
  { id: "shorts", label: "SHORTS" },
  { id: "twitter", label: "X / TWITTER" },
];

const TONES = [
  { id: "casual", label: "CASUAL" },
  { id: "hype", label: "HYPE" },
  { id: "cinematic", label: "CINEMATIC" },
  { id: "raw", label: "RAW" },
  { id: "comedic", label: "COMEDIC" },
  { id: "mentor", label: "MENTOR" },
];

const TRIGGERS = [
  { id: "curiosity", label: "CURIOSITY" },
  { id: "identity", label: "IDENTITY" },
  { id: "humor", label: "HUMOR" },
  { id: "urgency", label: "URGENCY" },
];

const TOOL_COLOR = "#5A6B7A";

interface ScriptResult {
  script: string;
  hook_strength?: number;
  estimated_duration?: number;
  grade?: string;
  score?: number;
}

export default function ScriptsTool() {
  const [selectedFormat, setSelectedFormat] = useState("talking head");
  const [selectedPlatform, setSelectedPlatform] = useState("reels");
  const [selectedTone, setSelectedTone] = useState("casual");
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
  const [concept, setConcept] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<ScriptResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const wordCount = concept.trim().split(/\s+/).filter(Boolean).length;

  const handleGenerate = async () => {
    if (!concept.trim()) return;
    
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: concept,
          format: selectedFormat,
          platform: selectedPlatform,
          tone: selectedTone,
          emotionalTrigger: selectedTrigger || undefined,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate script');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="h-full grid grid-cols-12">
      
      {/* LEFT - Configuration */}
      <div 
        className="col-span-4 p-6 border-r overflow-auto"
        style={{ borderColor: 'rgba(44, 35, 24, 0.08)' }}
      >
        {/* 01 / FORMAT */}
        <section className="mb-8">
          <h3 className="flex items-baseline gap-2 mb-4">
            <span className="text-xs font-bold tracking-widest" style={{ color: TOOL_COLOR }}>01</span>
            <span className="text-xs text-gray-300">/</span>
            <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '16px', color: '#2C2318' }}>
              Format
            </span>
          </h3>
          <div className="space-y-1.5">
            {FORMATS.map((format) => (
              <button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className="w-full text-left px-4 py-2.5 transition-all duration-150 flex items-center justify-between group"
                style={{
                  backgroundColor: selectedFormat === format.id ? TOOL_COLOR : 'transparent',
                  color: selectedFormat === format.id ? 'white' : '#2C2318',
                  border: `1px solid ${selectedFormat === format.id ? TOOL_COLOR : '#E8E4DE'}`,
                  borderRadius: '3px',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                }}
              >
                {format.label}
                {selectedFormat === format.id && <span>✓</span>}
              </button>
            ))}
          </div>
        </section>

        {/* 02 / PLATFORM */}
        <section className="mb-8">
          <h3 className="flex items-baseline gap-2 mb-4">
            <span className="text-xs font-bold tracking-widest" style={{ color: TOOL_COLOR }}>02</span>
            <span className="text-xs text-gray-300">/</span>
            <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '16px', color: '#2C2318' }}>
              Platform
            </span>
          </h3>
          <div className="grid grid-cols-2 gap-1.5">
            {PLATFORMS.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className="px-3 py-2.5 transition-all duration-150 text-center"
                style={{
                  backgroundColor: selectedPlatform === platform.id ? TOOL_COLOR : 'transparent',
                  color: selectedPlatform === platform.id ? 'white' : '#2C2318',
                  border: `1px solid ${selectedPlatform === platform.id ? TOOL_COLOR : '#E8E4DE'}`,
                  borderRadius: '3px',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                }}
              >
                {platform.label}
              </button>
            ))}
          </div>
        </section>

        {/* 03 / TONE */}
        <section className="mb-8">
          <h3 className="flex items-baseline gap-2 mb-4">
            <span className="text-xs font-bold tracking-widest" style={{ color: TOOL_COLOR }}>03</span>
            <span className="text-xs text-gray-300">/</span>
            <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '16px', color: '#2C2318' }}>
              Tone
            </span>
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {TONES.map((tone) => (
              <button
                key={tone.id}
                onClick={() => setSelectedTone(tone.id)}
                className="px-3 py-2 transition-all duration-150"
                style={{
                  backgroundColor: selectedTone === tone.id ? TOOL_COLOR : 'transparent',
                  color: selectedTone === tone.id ? 'white' : '#2C2318',
                  border: `1px solid ${selectedTone === tone.id ? TOOL_COLOR : '#E8E4DE'}`,
                  borderRadius: '3px',
                  fontSize: '10px',
                  fontWeight: 500,
                }}
              >
                {tone.label}
              </button>
            ))}
          </div>
        </section>

        {/* 04 / TRIGGER */}
        <section>
          <h3 className="flex items-baseline gap-2 mb-4">
            <span className="text-xs font-bold tracking-widest" style={{ color: TOOL_COLOR }}>04</span>
            <span className="text-xs text-gray-300">/</span>
            <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '16px', color: '#2C2318' }}>
              Trigger
            </span>
            <span className="text-xs text-gray-400 italic ml-1">(optional)</span>
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {TRIGGERS.map((trigger) => (
              <button
                key={trigger.id}
                onClick={() => setSelectedTrigger(selectedTrigger === trigger.id ? null : trigger.id)}
                className="px-3 py-2 transition-all duration-150"
                style={{
                  backgroundColor: selectedTrigger === trigger.id ? TOOL_COLOR : 'transparent',
                  color: selectedTrigger === trigger.id ? 'white' : '#2C2318',
                  border: `1px solid ${selectedTrigger === trigger.id ? TOOL_COLOR : '#E8E4DE'}`,
                  borderRadius: '3px',
                  fontSize: '10px',
                  fontWeight: 500,
                }}
              >
                {trigger.label}
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* MIDDLE - Input */}
      <div 
        className="col-span-4 p-6 flex flex-col border-r"
        style={{ borderColor: 'rgba(44, 35, 24, 0.08)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '18px', color: '#2C2318' }}>
            Source
          </h3>
          <span className="text-xs tracking-wider text-gray-400">
            WORD COUNT: {wordCount.toString().padStart(3, '0')}
          </span>
        </div>
        
        <div 
          className="flex-1 flex flex-col rounded overflow-hidden"
          style={{ border: '1px solid #E8E4DE' }}
        >
          <textarea
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="What's your video about? Paste a script to analyze, or describe your concept..."
            className="flex-1 p-4 resize-none focus:outline-none"
            style={{
              backgroundColor: '#FAFAF8',
              fontFamily: 'system-ui, sans-serif',
              fontSize: '14px',
              lineHeight: '1.8',
              color: '#2C2318',
              minHeight: '240px',
            }}
          />
          <div 
            className="px-4 py-2 flex items-center justify-between border-t"
            style={{ borderColor: '#E8E4DE', backgroundColor: '#F5F4F2' }}
          >
            <div className="flex gap-2">
              <button className="p-1.5 hover:bg-white rounded transition-colors text-gray-400 hover:text-gray-600">
                📋
              </button>
              <button className="p-1.5 hover:bg-white rounded transition-colors text-gray-400 hover:text-gray-600">
                🔗
              </button>
            </div>
            <span className="text-xs text-gray-400">✧ LINGUISTIC ENGINE</span>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-xs">
            {error}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={!concept.trim() || isGenerating}
          className="mt-4 py-3.5 transition-all duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{
            backgroundColor: TOOL_COLOR,
            color: 'white',
            borderRadius: '3px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
          }}
        >
          {isGenerating ? (
            <>
              <span className="animate-spin">⟳</span>
              <span>PROCESSING...</span>
            </>
          ) : (
            <>
              <span>✦</span>
              <span>GENERATE SCRIPT</span>
            </>
          )}
        </button>
      </div>

      {/* RIGHT - Output */}
      <div className="col-span-4 p-6 flex flex-col overflow-auto" style={{ backgroundColor: '#FAFAF8' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '18px', color: '#2C2318' }}>
            Artifacts
          </h3>
          {result && (
            <button 
              onClick={() => copyToClipboard(result.script)}
              className="text-xs px-3 py-1.5 rounded hover:bg-white transition-colors"
              style={{ border: '1px solid #E8E4DE' }}
            >
              📋 COPY
            </button>
          )}
        </div>

        {!result && !isGenerating && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400 text-sm italic text-center px-8">
              Your generated script will appear here...
            </p>
          </div>
        )}

        {isGenerating && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-3 animate-pulse">✦</div>
              <p className="text-sm text-gray-400">Generating...</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3">
              {result.grade && (
                <div 
                  className="p-4 rounded text-center"
                  style={{ border: `2px solid ${TOOL_COLOR}` }}
                >
                  <div className="text-xs text-gray-400 mb-1 tracking-wider">GRADE</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', color: TOOL_COLOR }}>
                    {result.grade}
                  </div>
                </div>
              )}
              {result.score && (
                <div 
                  className="p-4 rounded text-center"
                  style={{ border: '1px solid #E8E4DE' }}
                >
                  <div className="text-xs text-gray-400 mb-1 tracking-wider">SCORE</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', color: '#2C2318' }}>
                    {result.score}<span className="text-sm text-gray-400">/100</span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div 
                className="p-3 rounded text-center"
                style={{ border: '1px solid #E8E4DE' }}
              >
                <div className="text-xs text-gray-400 mb-1 tracking-wider">DURATION</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }}>
                  {result.estimated_duration || '--'}<span className="text-xs text-gray-400">s</span>
                </div>
              </div>
              <div 
                className="p-3 rounded text-center"
                style={{ border: '1px solid #E8E4DE' }}
              >
                <div className="text-xs text-gray-400 mb-1 tracking-wider">HOOK STRENGTH</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }}>
                  {result.hook_strength || '--'}<span className="text-xs text-gray-400">/100</span>
                </div>
              </div>
            </div>

            {/* Script Output */}
            <div 
              className="p-4 rounded"
              style={{ 
                borderLeft: `3px solid ${TOOL_COLOR}`,
                backgroundColor: 'white',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span 
                  className="px-2 py-1 text-xs font-semibold tracking-wider"
                  style={{ backgroundColor: `${TOOL_COLOR}15`, color: TOOL_COLOR, borderRadius: '2px' }}
                >
                  SCRIPT
                </span>
              </div>
              <div 
                className="whitespace-pre-wrap"
                style={{ 
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '14px',
                  lineHeight: '1.9',
                  color: '#2C2318',
                }}
              >
                {result.script}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
