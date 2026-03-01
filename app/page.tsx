"use client";

import { useState } from "react";
import { Window } from "@/components/Window";
import ScriptsTool from "@/components/ScriptsTool";

const FOLDERS = [
  { id: "scripts", label: "SCRIPTS", color: "#5A6B7A", windowTitle: "SCRIPT STUDIO" },
  { id: "hooks", label: "HOOKS", color: "#B87D4B", windowTitle: "HOOK GENERATOR" },
  { id: "repurpose", label: "REPURPOSE", color: "#2D5A4A", windowTitle: "CONTENT REPURPOSER" },
  { id: "analyze", label: "ANALYZE", color: "#A67B73", windowTitle: "PERFORMANCE ANALYZER" },
];

function FolderIcon({ 
  color, 
  label, 
  isHovered, 
  isActive 
}: { 
  color: string; 
  label: string; 
  isHovered: boolean;
  isActive: boolean;
}) {
  const shouldHighlight = isHovered || isActive;
  
  // Lighten color for default state, full color for hover/active
  const folderFill = color;
  const folderOpacity = shouldHighlight ? 1 : 0.85;
  
  return (
    <div 
      className="folder-item flex flex-col items-center gap-3 transition-all duration-200"
      style={{ transform: shouldHighlight ? 'scale(1.05)' : 'scale(1)' }}
    >
      {/* Folder Icon - Solid filled like Stitch mockup */}
      <svg 
        width="72" 
        height="56" 
        viewBox="0 0 72 56" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-200"
        style={{ filter: shouldHighlight ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' : 'none' }}
      >
        {/* Folder tab - rounded top */}
        <path 
          d="M0 6C0 2.68629 2.68629 0 6 0H24C26.2091 0 28.2091 1.19523 29.2361 3.12311L32 8H66C69.3137 8 72 10.6863 72 14V50C72 53.3137 69.3137 56 66 56H6C2.68629 56 0 53.3137 0 50V6Z"
          fill={folderFill}
          opacity={folderOpacity}
        />
        {/* Inner fold line for depth */}
        <path 
          d="M0 14H72"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="1"
        />
      </svg>
      
      {/* Label */}
      <span 
        className="tracking-widest font-medium transition-colors duration-200"
        style={{ 
          color: shouldHighlight ? color : "var(--text-secondary)",
          fontSize: '11px',
          letterSpacing: '0.15em'
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Home() {
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);
  const [openTool, setOpenTool] = useState<string | null>(null);

  const handleFolderClick = (folderId: string) => {
    setOpenTool(folderId);
  };

  const handleCloseWindow = () => {
    setOpenTool(null);
  };

  const activeFolder = FOLDERS.find(f => f.id === openTool);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Folders */}
        <aside className="w-48 flex flex-col items-center justify-center gap-12 py-12 px-6">
          {FOLDERS.map((folder) => (
            <button
              key={folder.id}
              onMouseEnter={() => setHoveredFolder(folder.id)}
              onMouseLeave={() => setHoveredFolder(null)}
              onClick={() => handleFolderClick(folder.id)}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4"
              style={{ 
                outlineColor: folder.color
              }}
            >
              <FolderIcon 
                color={folder.color} 
                label={folder.label}
                isHovered={hoveredFolder === folder.id}
                isActive={openTool === folder.id}
              />
            </button>
          ))}
        </aside>

        {/* Center Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-12">
          {/* Logo - Elegant italic serif like Stitch mockup */}
          <h1 
            className="mb-6"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontWeight: 600,
              fontSize: 'clamp(48px, 10vw, 88px)',
              lineHeight: '1.1',
              color: '#2C2318',
              letterSpacing: '-0.02em'
            }}
          >
            scriptkit
          </h1>

          {/* Tagline - Light letterspaced small caps like Stitch */}
          <p 
            className="mb-12"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '13px',
              fontWeight: 400,
              color: '#8A8075',
              letterSpacing: '0.25em',
              textTransform: 'uppercase'
            }}
          >
            CREATOR TOOLS THAT ACTUALLY WORK.
          </p>

          {/* Bottom instruction */}
          <p 
            className="mt-auto mb-12"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: '16px',
              color: 'var(--text-tertiary)'
            }}
          >
            select a tool to begin
          </p>
        </main>
      </div>

      {/* Footer */}
      <footer className="py-6 px-12 flex items-center justify-between border-t border-gray-200">
        <span 
          className="text-xs tracking-widest"
          style={{ color: 'var(--text-tertiary)' }}
        >
          © 2024 SCRIPTKIT COLLECTIVE
        </span>
        <span 
          className="text-xs tracking-widest"
          style={{ color: 'var(--text-tertiary)' }}
        >
          SYSTEM READY / V1.0.4
        </span>
      </footer>

      {/* Window Popup */}
      {activeFolder && (
        <Window 
          title={activeFolder.windowTitle}
          color={activeFolder.color}
          onClose={handleCloseWindow}
        >
          {activeFolder.id === "scripts" && <ScriptsTool />}
          {activeFolder.id === "hooks" && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#8A8075' }}>
              <p>Hook Generator coming soon...</p>
            </div>
          )}
          {activeFolder.id === "repurpose" && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#8A8075' }}>
              <p>Content Repurposer coming soon...</p>
            </div>
          )}
          {activeFolder.id === "analyze" && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#8A8075' }}>
              <p>Performance Analyzer coming soon...</p>
            </div>
          )}
        </Window>
      )}
    </div>
  );
}
