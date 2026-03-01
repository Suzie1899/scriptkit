"use client";

import { useState } from "react";

const FORMATS = [
  { id: "talking-head", label: "TALKING HEAD", desc: "Direct to camera" },
  { id: "skit", label: "SKIT", desc: "Narrative scene" },
  { id: "storytelling", label: "STORYTELLING", desc: "Personal narrative" },
  { id: "montage", label: "MONTAGE", desc: "Visual sequence" },
  { id: "voxpop", label: "VOXPOP", desc: "Street interviews" },
  { id: "explainer", label: "EXPLAINER", desc: "Educational content" },
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

export default function ScriptsTool() {
  const [selectedFormat, setSelectedFormat] = useState("talking-head");
  const [selectedPlatform, setSelectedPlatform] = useState("reels");
  const [selectedTone, setSelectedTone] = useState("casual");
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
  const [concept, setConcept] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const wordCount = concept.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="h-full flex flex-col">
      {/* Header Bar */}
      <div 
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: 'rgba(44, 35, 24, 0.1)' }}
      >
        <div className="flex items-center gap-4">
          <span 
            className="px-3 py-1.5 text-white text-xs font-semibold tracking-widest"
            style={{ backgroundColor: TOOL_COLOR, borderRadius: '2px' }}
          >
            SCRIPT.V1
          </span>
          <span className="text-xs tracking-widest text-gray-400">
            NARRATIVE ENGINE ACTIVE
          </span>
        </div>
        <span className="text-xs tracking-wider text-gray-400">
          SYSTEM: OPERATIONAL
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 h-full">
          
          {/* LEFT PANEL - Configuration */}
          <div 
            className="lg:col-span-4 p-6 lg:p-8 border-r overflow-auto"
            style={{ borderColor: 'rgba(44, 35, 24, 0.1)' }}
          >
            {/* 01 / FORMAT */}
            <div className="mb-8">
              <h3 className="flex items-baseline gap-2 mb-4">
                <span className="text-xs font-semibold tracking-widest" style={{ color: TOOL_COLOR }}>01 /</span>
                <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '18px' }}>
                  Format
                </span>
              </h3>
              <div className="space-y-2">
                {FORMATS.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className="w-full text-left px-4 py-3 transition-all duration-200 flex items-center justify-between group"
                    style={{
                      backgroundColor: selectedFormat === format.id ? TOOL_COLOR : 'white',
                      color: selectedFormat === format.id ? 'white' : '#2C2318',
                      border: `1px solid ${selectedFormat === format.id ? TOOL_COLOR : '#E5E0D8'}`,
                      borderRadius: '4px',
                    }}
                  >
                    <span className="text-xs font-semibold tracking-wider">{format.label}</span>
                    {selectedFormat === format.id && (
                      <span className="text-white">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 02 / PLATFORM */}
            <div className="mb-8">
              <h3 className="flex items-baseline gap-2 mb-4">
                <span className="text-xs font-semibold tracking-widest" style={{ color: TOOL_COLOR }}>02 /</span>
                <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '18px' }}>
                  Platform
                </span>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {PLATFORMS.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className="px-3 py-3 transition-all duration-200 flex items-center gap-2"
                    style={{
                      backgroundColor: selectedPlatform === platform.id ? TOOL_COLOR : 'white',
                      color: selectedPlatform === platform.id ? 'white' : '#2C2318',
                      border: `1px solid ${selectedPlatform === platform.id ? TOOL_COLOR : '#E5E0D8'}`,
                      borderRadius: '4px',
                    }}
                  >
                    <span className="text-sm">{platform.icon}</span>
                    <span className="text-xs font-semibold tracking-wider">{platform.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 03 / TONE */}
            <div className="mb-8">
              <h3 className="flex items-baseline gap-2 mb-4">
                <span className="text-xs font-semibold tracking-widest" style={{ color: TOOL_COLOR }}>03 /</span>
                <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '18px' }}>
                  Tone
                </span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {TONES.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setSelectedTone(tone.id)}
                    className="px-4 py-2 transition-all duration-200"
                    style={{
                      backgroundColor: selectedTone === tone.id ? TOOL_COLOR : 'white',
                      color: selectedTone === tone.id ? 'white' : '#2C2318',
                      border: `1px solid ${selectedTone === tone.id ? TOOL_COLOR : '#E5E0D8'}`,
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                    }}
                  >
                    {tone.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 04 / EMOTIONAL TRIGGER */}
            <div>
              <h3 className="flex items-baseline gap-2 mb-4">
                <span className="text-xs font-semibold tracking-widest" style={{ color: TOOL_COLOR }}>04 /</span>
                <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '18px' }}>
                  Trigger
                </span>
                <span className="text-xs text-gray-400 ml-2">(optional)</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {TRIGGERS.map((trigger) => (
                  <button
                    key={trigger.id}
                    onClick={() => setSelectedTrigger(selectedTrigger === trigger.id ? null : trigger.id)}
                    className="px-4 py-2 transition-all duration-200"
                    style={{
                      backgroundColor: selectedTrigger === trigger.id ? TOOL_COLOR : 'white',
                      color: selectedTrigger === trigger.id ? 'white' : '#2C2318',
                      border: `1px solid ${selectedTrigger === trigger.id ? TOOL_COLOR : '#E5E0D8'}`,
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                    }}
                  >
                    {trigger.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MIDDLE PANEL - Input */}
          <div className="lg:col-span-4 p-6 lg:p-8 flex flex-col border-r" style={{ borderColor: 'rgba(44, 35, 24, 0.1)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '20px' }}>
                Concept
              </h3>
              <span className="text-xs tracking-wider text-gray-400">
                TYPE_HERE
              </span>
            </div>
            
            <div 
              className="flex-1 mb-4 p-5 flex flex-col"
              style={{ 
                backgroundColor: '#F8F6F3',
                border: '1px solid #E5E0D8',
                borderRadius: '4px',
                minHeight: '280px'
              }}
            >
              <textarea
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="What's your video about? A topic, an idea, a story you want to tell..."
                className="flex-1 bg-transparent resize-none focus:outline-none"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#2C2318',
                }}
              />
              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: '#E5E0D8' }}>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white rounded transition-colors">
                    <span className="text-gray-400">📋</span>
                  </button>
                  <button className="p-2 hover:bg-white rounded transition-colors">
                    <span className="text-gray-400">🔗</span>
                  </button>
                </div>
                <span className="text-xs tracking-wider text-gray-400">
                  WORD COUNT: {wordCount.toString().padStart(3, '0')}
                </span>
              </div>
            </div>

            <span className="text-xs text-gray-400 mb-4 block">
              PROCESSING... ✧
            </span>

            <button
              onClick={() => setIsGenerating(true)}
              disabled={!concept.trim() || isGenerating}
              className="py-4 px-6 transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                backgroundColor: TOOL_COLOR,
                color: 'white',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.15em',
              }}
            >
              <span>✦</span>
              <span>GENERATE SCRIPT</span>
            </button>
          </div>

          {/* RIGHT PANEL - Output Preview */}
          <div className="lg:col-span-4 p-6 lg:p-8 flex flex-col bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '20px' }}>
                Output
              </h3>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <span className="text-xs">⊞</span>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <span className="text-xs">☰</span>
                </button>
              </div>
            </div>

            {/* Preview Cards */}
            <div className="space-y-4 flex-1">
              {/* Script Preview Card */}
              <div 
                className="p-5 border"
                style={{ 
                  borderColor: TOOL_COLOR,
                  borderRadius: '4px',
                  borderLeftWidth: '3px'
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="px-2 py-1 text-xs font-semibold tracking-wider"
                    style={{ 
                      backgroundColor: `${TOOL_COLOR}15`,
                      color: TOOL_COLOR,
                      borderRadius: '2px'
                    }}
                  >
                    SCRIPT
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <span>📋</span>
                  </button>
                </div>
                <p className="text-sm text-gray-400 italic">
                  Your generated script will appear here...
                </p>
              </div>

              {/* Stats Preview */}
              <div className="grid grid-cols-2 gap-3">
                <div 
                  className="p-4 text-center"
                  style={{ 
                    border: '1px solid #E5E0D8',
                    borderRadius: '4px'
                  }}
                >
                  <span className="text-xs tracking-wider text-gray-400 block mb-1">EST. DURATION</span>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px' }}>--</span>
                  <span className="text-xs text-gray-400">sec</span>
                </div>
                <div 
                  className="p-4 text-center"
                  style={{ 
                    border: '1px solid #E5E0D8',
                    borderRadius: '4px'
                  }}
                >
                  <span className="text-xs tracking-wider text-gray-400 block mb-1">HOOK STRENGTH</span>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px' }}>--</span>
                  <span className="text-xs text-gray-400">/100</span>
                </div>
              </div>

              {/* Structure Preview */}
              <div 
                className="p-4"
                style={{ 
                  backgroundColor: '#F8F6F3',
                  borderRadius: '4px'
                }}
              >
                <span className="text-xs tracking-wider text-gray-400 block mb-3">STRUCTURE BREAKDOWN</span>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: TOOL_COLOR }}></span>
                    <span className="text-xs text-gray-500">Hook (0-3s)</span>
                    <div className="flex-1 h-1 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: TOOL_COLOR, opacity: 0.7 }}></span>
                    <span className="text-xs text-gray-500">Setup (3-15s)</span>
                    <div className="flex-1 h-1 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: TOOL_COLOR, opacity: 0.5 }}></span>
                    <span className="text-xs text-gray-500">Payoff (15-30s)</span>
                    <div className="flex-1 h-1 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div 
              className="pt-4 mt-6 border-t flex items-center justify-between"
              style={{ borderColor: 'rgba(44, 35, 24, 0.1)' }}
            >
              <span className="text-xs tracking-widest text-gray-400">
                SCRIPTKIT COLLECTIVE
              </span>
              <span className="text-xs tracking-wider text-gray-400">
                VECTORS: 0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
