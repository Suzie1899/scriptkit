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
  { id: "reels", label: "REELS", icon: "◎" },
  { id: "tiktok", label: "TIKTOK", icon: "♪" },
  { id: "shorts", label: "SHORTS", icon: "▶" },
  { id: "twitter", label: "X / TWITTER", icon: "@" },
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
  structure?: {
    hook?: string;
    setup?: string;
    payoff?: string;
  };
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
    setResult(null);

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
    <div className="h-full flex flex-col">
      {/* Header Bar */}
      <div 
        className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 border-b"
        style={{ borderColor: 'rgba(44, 35, 24, 0.1)' }}
      >
        <div className="flex items-center gap-3 lg:gap-4">
          <span 
            className="px-2 lg:px-3 py-1 lg:py-1.5 text-white text-xs font-semibold tracking-widest"
            style={{ backgroundColor: TOOL_COLOR, borderRadius: '2px' }}
          >
            SCRIPT.V1
          </span>
          <span className="text-xs tracking-widest text-gray-400 hidden sm:inline">
            NARRATIVE ENGINE
          </span>
        </div>
        <span className="text-xs tracking-wider text-gray-400">
          {isGenerating ? 'GENERATING...' : 'READY'}
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-full">
          
          {/* LEFT PANEL - Configuration */}
          <div 
            className="lg:col-span-4 p-4 lg:p-6 border-b lg:border-b-0 lg:border-r overflow-auto"
            style={{ borderColor: 'rgba(44, 35, 24, 0.1)' }}
          >
            {/* 01 / FORMAT */}
            <div className="mb-6">
              <h3 className="flex items-baseline gap-2 mb-3">
                <span className="text-xs font-semibold tracking-widest" style={{ color: TOOL_COLOR }}>01 /</span>
                <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '16px' }}>
                  Format
                </span>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {FORMATS.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className="text-left px-3 py-2 transition-all duration-200 flex items-center justify-between"
                    style={{
                      backgroundColor: selectedFormat === format.id ? TOOL_COLOR : 'white',
                      color: selectedFormat === format.id ? 'white' : '#2C2318',
                      border: `1px solid ${selectedFormat === format.id ? TOOL_COLOR : '#E5E0D8'}`,
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {format.label}
                    {selectedFormat === format.id && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* 02 / PLATFORM */}
            <div className="mb-6">
              <h3 className="flex items-baseline gap-2 mb-3">
                <span className="text-xs font-semibold tracking-widest" style={{ color: TOOL_COLOR }}>02 /</span>
                <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '16px' }}>
                  Platform
                </span>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {PLATFORMS.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className="px-3 py-2 transition-all duration-200 flex items-center gap-2"
                    style={{
                      backgroundColor: selectedPlatform === platform.id ? TOOL_COLOR : 'white',
                      color: selectedPlatform === platform.id ? 'white' : '#2C2318',
                      border: `1px solid ${selectedPlatform === platform.id ? TOOL_COLOR : '#E5E0D8'}`,
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 600,
                    }}
                  >
                    <span>{platform.icon}</span>
                    <span>{platform.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 03 / TONE */}
            <div className="mb-6">
              <h3 className="flex items-baseline gap-2 mb-3">
                <span className="text-xs font-semibold tracking-widest" style={{ color: TOOL_COLOR }}>03 /</span>
                <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '16px' }}>
                  Tone
                </span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {TONES.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setSelectedTone(tone.id)}
                    className="px-3 py-2 transition-all duration-200"
                    style={{
                      backgroundColor: selectedTone === tone.id ? TOOL_COLOR : 'white',
                      color: selectedTone === tone.id ? 'white' : '#2C2318',
                      border: `1px solid ${selectedTone === tone.id ? TOOL_COLOR : '#E5E0D8'}`,
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 600,
                    }}
                  >
                    {tone.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 04 / TRIGGER */}
            <div>
              <h3 className="flex items-baseline gap-2 mb-3">
                <span className="text-xs font-semibold tracking-widest" style={{ color: TOOL_COLOR }}>04 /</span>
                <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '16px' }}>
                  Trigger
                </span>
                <span className="text-xs text-gray-400">(optional)</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {TRIGGERS.map((trigger) => (
                  <button
                    key={trigger.id}
                    onClick={() => setSelectedTrigger(selectedTrigger === trigger.id ? null : trigger.id)}
                    className="px-3 py-2 transition-all duration-200"
                    style={{
                      backgroundColor: selectedTrigger === trigger.id ? TOOL_COLOR : 'white',
                      color: selectedTrigger === trigger.id ? 'white' : '#2C2318',
                      border: `1px solid ${selectedTrigger === trigger.id ? TOOL_COLOR : '#E5E0D8'}`,
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 600,
                    }}
                  >
                    {trigger.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MIDDLE PANEL - Input */}
          <div className="lg:col-span-4 p-4 lg:p-6 flex flex-col border-b lg:border-b-0 lg:border-r" style={{ borderColor: 'rgba(44, 35, 24, 0.1)' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '18px' }}>
                Concept
              </h3>
              <span className="text-xs tracking-wider text-gray-400">
                {wordCount} words
              </span>
            </div>
            
            <textarea
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="What's your video about? Paste a script to analyze or describe your idea..."
              className="flex-1 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-opacity-50 min-h-[200px] lg:min-h-0"
              style={{
                backgroundColor: '#F8F6F3',
                border: '1px solid #E5E0D8',
                borderRadius: '4px',
                fontFamily: 'system-ui, sans-serif',
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#2C2318',
              }}
            />

            {error && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={!concept.trim() || isGenerating}
              className="mt-4 py-3 px-6 transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                backgroundColor: TOOL_COLOR,
                color: 'white',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.1em',
              }}
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin">⟳</span>
                  <span>GENERATING...</span>
                </>
              ) : (
                <>
                  <span>✦</span>
                  <span>GENERATE SCRIPT</span>
                </>
              )}
            </button>
          </div>

          {/* RIGHT PANEL - Output */}
          <div className="lg:col-span-4 p-4 lg:p-6 flex flex-col bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '18px' }}>
                Output
              </h3>
              {result && (
                <button 
                  onClick={() => copyToClipboard(result.script)}
                  className="text-xs px-3 py-1.5 rounded hover:bg-gray-100 transition-colors"
                  style={{ border: '1px solid #E5E0D8' }}
                >
                  📋 Copy
                </button>
              )}
            </div>

            {!result && !isGenerating && (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm italic">
                Your generated script will appear here...
              </div>
            )}

            {isGenerating && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-2 animate-pulse">✦</div>
                  <div className="text-sm text-gray-400">Generating your script...</div>
                </div>
              </div>
            )}

            {result && (
              <div className="flex-1 overflow-auto space-y-4">
                {/* Score/Grade */}
                {(result.grade || result.score) && (
                  <div className="flex gap-3">
                    {result.grade && (
                      <div 
                        className="px-4 py-3 text-center rounded"
                        style={{ backgroundColor: '#F8F6F3' }}
                      >
                        <div className="text-xs text-gray-400 mb-1">GRADE</div>
                        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', color: TOOL_COLOR }}>
                          {result.grade}
                        </div>
                      </div>
                    )}
                    {result.score && (
                      <div 
                        className="px-4 py-3 text-center rounded flex-1"
                        style={{ backgroundColor: '#F8F6F3' }}
                      >
                        <div className="text-xs text-gray-400 mb-1">SCORE</div>
                        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px' }}>
                          {result.score}<span className="text-sm text-gray-400">/100</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div 
                    className="p-3 text-center rounded"
                    style={{ border: '1px solid #E5E0D8' }}
                  >
                    <div className="text-xs text-gray-400 mb-1">DURATION</div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }}>
                      {result.estimated_duration || '--'}
                      <span className="text-xs text-gray-400">s</span>
                    </div>
                  </div>
                  <div 
                    className="p-3 text-center rounded"
                    style={{ border: '1px solid #E5E0D8' }}
                  >
                    <div className="text-xs text-gray-400 mb-1">HOOK</div>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px' }}>
                      {result.hook_strength || '--'}
                      <span className="text-xs text-gray-400">/100</span>
                    </div>
                  </div>
                </div>

                {/* Script */}
                <div 
                  className="p-4 rounded"
                  style={{ 
                    backgroundColor: '#F8F6F3',
                    border: '1px solid #E5E0D8',
                  }}
                >
                  <div className="text-xs text-gray-400 mb-2 tracking-wider">SCRIPT</div>
                  <div 
                    className="whitespace-pre-wrap"
                    style={{ 
                      fontFamily: 'system-ui, sans-serif',
                      fontSize: '14px',
                      lineHeight: '1.8',
                      color: '#2C2318',
                    }}
                  >
                    {result.script}
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div 
              className="pt-4 mt-4 border-t text-center"
              style={{ borderColor: 'rgba(44, 35, 24, 0.1)' }}
            >
              <span className="text-xs tracking-widest text-gray-400">
                SCRIPTKIT COLLECTIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
