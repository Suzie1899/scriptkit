"use client";

import { useState } from "react";

const FORMATS = ["TALKING HEAD", "SKIT", "STORYTELLING", "MONTAGE"];
const PLATFORMS = ["REELS", "TIKTOK", "SHORTS", "TWITTER"];
const TONES = ["CASUAL", "HYPE", "CINEMATIC", "RAW"];

interface ToggleCardProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  color: string;
}

function ToggleCard({ label, isActive, onClick, color }: ToggleCardProps) {
  return (
    <button
      onClick={onClick}
      className="px-3 md:px-4 py-3 text-sm font-medium tracking-wider transition-all duration-200 hover:scale-[1.02] min-h-[44px] flex items-center justify-center"
      style={{
        backgroundColor: isActive ? color : "white",
        color: isActive ? "white" : "var(--text-primary)",
        border: `1px solid ${isActive ? color : "var(--text-primary)"}`,
        borderRadius: "4px",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        fontFamily: "var(--font-body)",
        fontSize: "clamp(9px, 2vw, 11px)",
        fontWeight: 600,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }}
    >
      {label}
    </button>
  );
}

export default function ScriptsTool() {
  const [selectedFormat, setSelectedFormat] = useState("TALKING HEAD");
  const [selectedPlatform, setSelectedPlatform] = useState("REELS");
  const [selectedTone, setSelectedTone] = useState("CASUAL");
  const [concept, setConcept] = useState("");

  const TOOL_COLOR = "#5A6B7A";
  const wordCount = concept.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 md:mb-12 text-center">
        <h1
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(11px, 2.5vw, 13px)",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-primary)",
            marginBottom: "12px"
          }}
        >
          SCRIPT STUDIO — EDITION 01
        </h1>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "clamp(14px, 3vw, 16px)",
            color: "var(--text-secondary)",
            lineHeight: "1.6",
            padding: "0 1rem"
          }}
        >
          "Every great video starts with a script. Let's make yours unforgettable."
        </p>
      </div>

      {/* Mobile: Single column, Desktop: Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* LEFT COLUMN - Options */}
        <div className="space-y-6 md:space-y-10">
          {/* 01 / FORMAT */}
          <div>
            <h3
              className="mb-3 md:mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(16px, 3.5vw, 18px)",
                color: "var(--text-primary)",
                marginBottom: "16px"
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontStyle: "normal",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  marginRight: "8px"
                }}
              >
                01 /
              </span>
              Format
            </h3>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {FORMATS.map((format) => (
                <ToggleCard
                  key={format}
                  label={format}
                  isActive={selectedFormat === format}
                  onClick={() => setSelectedFormat(format)}
                  color={TOOL_COLOR}
                />
              ))}
            </div>
          </div>

          {/* 02 / PLATFORM */}
          <div>
            <h3
              className="mb-3 md:mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(16px, 3.5vw, 18px)",
                color: "var(--text-primary)",
                marginBottom: "16px"
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontStyle: "normal",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  marginRight: "8px"
                }}
              >
                02 /
              </span>
              Platform
            </h3>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {PLATFORMS.map((platform) => (
                <ToggleCard
                  key={platform}
                  label={platform}
                  isActive={selectedPlatform === platform}
                  onClick={() => setSelectedPlatform(platform)}
                  color={TOOL_COLOR}
                />
              ))}
            </div>
          </div>

          {/* 03 / TONE */}
          <div>
            <h3
              className="mb-3 md:mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(16px, 3.5vw, 18px)",
                color: "var(--text-primary)",
                marginBottom: "16px"
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontStyle: "normal",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  marginRight: "8px"
                }}
              >
                03 /
              </span>
              Tone
            </h3>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {TONES.map((tone) => (
                <ToggleCard
                  key={tone}
                  label={tone}
                  isActive={selectedTone === tone}
                  onClick={() => setSelectedTone(tone)}
                  color={TOOL_COLOR}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Concept Input */}
        <div className="flex flex-col">
          {/* Concept Header */}
          <h3
            className="mb-3 md:mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(18px, 4vw, 20px)",
              color: "var(--text-primary)"
            }}
          >
            Concept
          </h3>

          {/* Textarea */}
          <textarea
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="What's your video about?"
            className="flex-1 p-4 md:p-6 resize-none focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: "white",
              border: "1px solid var(--text-primary)",
              borderRadius: "4px",
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              lineHeight: "1.7",
              color: "var(--text-primary)",
              minHeight: "200px"
            }}
          />

          {/* Word Count */}
          <div
            className="mt-3 text-right"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              color: "var(--text-tertiary)",
              letterSpacing: "0.05em"
            }}
          >
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </div>

          {/* Generate Button */}
          <button
            className="mt-4 md:mt-6 py-4 px-8 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
            style={{
              backgroundColor: TOOL_COLOR,
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase"
            }}
            disabled={!concept.trim()}
          >
            Generate Script
          </button>
        </div>
      </div>

      {/* Footer */}
      <div
        className="mt-12 md:mt-16 pt-6 md:pt-8 text-center border-t"
        style={{
          borderColor: "rgba(44, 35, 24, 0.1)"
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-tertiary)"
          }}
        >
          SCRIPTKIT COLLECTIVE
        </p>
      </div>
    </div>
  );
}
