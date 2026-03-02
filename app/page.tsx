"use client";

import { useState } from "react";
import ScriptsTool from "@/components/ScriptsTool";

const FOLDERS = [
  { id: "scripts", label: "SCRIPTS", color: "#5A6B7A" },
  { id: "hooks", label: "HOOKS", color: "#B87D4B" },
  { id: "repurpose", label: "REPURPOSE", color: "#2D5A4A" },
  { id: "analyze", label: "ANALYZE", color: "#A67B73" },
];

function FolderIcon({ 
  color, 
  isActive 
}: { 
  color: string; 
  isActive: boolean;
}) {
  return (
    <svg 
      className="transition-all duration-200"
      width="56" 
      height="44" 
      viewBox="0 0 72 56" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ 
        filter: isActive ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'none',
        transform: isActive ? 'scale(1.05)' : 'scale(1)'
      }}
    >
      <path 
        d="M0 6C0 2.68629 2.68629 0 6 0H24C26.2091 0 28.2091 1.19523 29.2361 3.12311L32 8H66C69.3137 8 72 10.6863 72 14V50C72 53.3137 69.3137 56 66 56H6C2.68629 56 0 53.3137 0 50V6Z"
        fill={color}
        opacity={isActive ? 1 : 0.8}
      />
      <path 
        d="M0 14H72"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function Home() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const activeFolder = FOLDERS.find(f => f.id === activeTool);

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#FAF7F2' }}>
      
      {/* LEFT SIDEBAR - Folders */}
      <aside 
        className="w-24 flex flex-col items-center py-8 border-r"
        style={{ borderColor: 'rgba(44, 35, 24, 0.1)' }}
      >
        {FOLDERS.map((folder) => (
          <button
            key={folder.id}
            onClick={() => setActiveTool(activeTool === folder.id ? null : folder.id)}
            className="flex flex-col items-center gap-2 py-4 px-2 transition-all duration-200 hover:bg-white/50 rounded-lg w-full"
          >
            <FolderIcon 
              color={folder.color} 
              isActive={activeTool === folder.id}
            />
            <span 
              className="text-xs font-medium tracking-wider transition-colors"
              style={{ 
                color: activeTool === folder.id ? folder.color : '#8A8075',
                fontSize: '9px',
                letterSpacing: '0.1em'
              }}
            >
              {folder.label}
            </span>
          </button>
        ))}
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex">
        
        {/* CENTER - Logo (shrinks when tool is open) */}
        <div 
          className={`flex flex-col items-center justify-center transition-all duration-300 ${
            activeTool ? 'w-0 overflow-hidden opacity-0' : 'flex-1 opacity-100'
          }`}
        >
          <h1 
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontWeight: 600,
              fontSize: '72px',
              lineHeight: '1.1',
              color: '#2C2318',
              letterSpacing: '-0.02em'
            }}
          >
            scriptkit
          </h1>
          <p 
            className="mt-4"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              color: '#8A8075',
              letterSpacing: '0.2em',
              textTransform: 'uppercase'
            }}
          >
            CREATOR TOOLS THAT ACTUALLY WORK.
          </p>
          <p 
            className="mt-8"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: '14px',
              color: '#B5AFA5'
            }}
          >
            select a tool to begin
          </p>
        </div>

        {/* RIGHT - Tool Panel (appears when folder clicked) */}
        {activeTool && (
          <div 
            className="flex-1 flex flex-col animate-fadeIn"
            style={{ 
              borderLeft: `3px solid ${activeFolder?.color}`,
              backgroundColor: 'white'
            }}
          >
            {/* Tool Header */}
            <div 
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ 
                borderColor: 'rgba(44, 35, 24, 0.1)',
                background: `linear-gradient(90deg, ${activeFolder?.color}08 0%, transparent 100%)`
              }}
            >
              <div className="flex items-center gap-4">
                <span 
                  className="px-3 py-1.5 text-white text-xs font-semibold tracking-widest"
                  style={{ backgroundColor: activeFolder?.color, borderRadius: '2px' }}
                >
                  {activeTool.toUpperCase()}.V1
                </span>
                <span 
                  className="text-xs tracking-widest"
                  style={{ color: activeFolder?.color }}
                >
                  {activeTool === 'scripts' && 'NARRATIVE ENGINE'}
                  {activeTool === 'hooks' && 'SCROLL-STOP GENERATOR'}
                  {activeTool === 'repurpose' && 'CONTENT TRANSFORMER'}
                  {activeTool === 'analyze' && 'PERFORMANCE DECODER'}
                </span>
              </div>
              <button 
                onClick={() => setActiveTool(null)}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                style={{ color: '#8A8075' }}
              >
                ✕
              </button>
            </div>

            {/* Tool Content */}
            <div className="flex-1 overflow-auto">
              {activeTool === "scripts" && <ScriptsTool />}
              {activeTool === "hooks" && (
                <div className="h-full flex items-center justify-center p-12">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🪝</div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '24px', marginBottom: '8px' }}>
                      Hook Generator
                    </h2>
                    <p className="text-sm text-gray-400">Coming soon...</p>
                  </div>
                </div>
              )}
              {activeTool === "repurpose" && (
                <div className="h-full flex items-center justify-center p-12">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🔄</div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '24px', marginBottom: '8px' }}>
                      Content Repurposer
                    </h2>
                    <p className="text-sm text-gray-400">Coming soon...</p>
                  </div>
                </div>
              )}
              {activeTool === "analyze" && (
                <div className="h-full flex items-center justify-center p-12">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📊</div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '24px', marginBottom: '8px' }}>
                      Performance Analyzer
                    </h2>
                    <p className="text-sm text-gray-400">Coming soon...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Tool Footer */}
            <div 
              className="px-6 py-3 border-t flex items-center justify-between"
              style={{ borderColor: 'rgba(44, 35, 24, 0.1)' }}
            >
              <span className="text-xs tracking-widest text-gray-400">
                © 2024 SCRIPTKIT COLLECTIVE
              </span>
              <span className="text-xs tracking-widest text-gray-400">
                SYSTEM READY / V1.0.4
              </span>
            </div>
          </div>
        )}
      </main>

      {/* Footer (only when no tool open) */}
      {!activeTool && (
        <footer 
          className="fixed bottom-0 left-0 right-0 py-4 px-6 flex items-center justify-between"
          style={{ backgroundColor: '#FAF7F2' }}
        >
          <span className="text-xs tracking-widest text-gray-400">
            © 2024 SCRIPTKIT COLLECTIVE
          </span>
          <span className="text-xs tracking-widest text-gray-400">
            SYSTEM READY / V1.0.4
          </span>
        </footer>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
