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
      className="folder-item flex flex-col items-center gap-2 md:gap-3 transition-all duration-200"
      style={{ transform: shouldHighlight ? 'scale(1.05)' : 'scale(1)' }}
    >
      {/* Folder Icon - Solid filled like Stitch mockup, smaller on mobile */}
      <svg 
        className="w-14 h-11 md:w-[72px] md:h-14 transition-all duration-200"
        viewBox="0 0 72 56" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
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
        className="tracking-widest font-medium transition-colors duration-200 text-center"
        style={{ 
          color: shouldHighlight ? color : "var(--text-secondary)",
          fontSize: 'clamp(9px, 2vw, 11px)',
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
      {/* Main Content Area - Mobile: centered column, Desktop: sidebar + center */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center">
        
        {/* Mobile: Everything stacked and centered */}
        <div className="flex flex-col items-center justify-center w-full md:contents">
          
          {/* Mobile: Folders in 2x2 grid, Desktop: Left Sidebar */}
          <aside className="w-full md:w-48 flex flex-col items-center md:justify-center py-6 px-6 md:py-12 md:h-full md:absolute md:left-0 md:top-0">
            <div className="grid grid-cols-2 gap-4 md:flex md:flex-col md:gap-12 w-full max-w-[200px] md:max-w-none">
              {FOLDERS.map((folder) => (
                <button
                  key={folder.id}
                  onMouseEnter={() => setHoveredFolder(folder.id)}
                  onMouseLeave={() => setHoveredFolder(null)}
                  onClick={() => handleFolderClick(folder.id)}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 flex justify-center"
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
            </div>
          </aside>

          {/* Center Content - Logo & Tagline */}
          <main className="flex flex-col items-center justify-center px-6 md:px-12 py-8 md:py-0">
            {/* Logo - Elegant italic serif like Stitch mockup */}
            <h1 
              className="mb-3 md:mb-6 text-center"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontWeight: 600,
                fontSize: 'clamp(40px, 12vw, 88px)',
                lineHeight: '1.1',
                color: '#2C2318',
                letterSpacing: '-0.02em'
              }}
            >
              scriptkit
            </h1>

            {/* Tagline - Light letterspaced small caps like Stitch */}
            <p 
              className="mb-4 md:mb-8 text-center px-4"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(9px, 2.5vw, 13px)',
                fontWeight: 400,
                color: '#8A8075',
                letterSpacing: '0.2em',
                textTransform: 'uppercase'
              }}
            >
              CREATOR TOOLS THAT ACTUALLY WORK.
            </p>

            {/* Bottom instruction */}
            <p 
              className="text-center"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(13px, 3vw, 16px)',
                color: 'var(--text-tertiary)'
              }}
            >
              select a tool to begin
            </p>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 md:py-6 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 border-t border-gray-200">
        <span 
          className="text-xs tracking-widest text-center"
          style={{ color: 'var(--text-tertiary)' }}
        >
          © 2024 SCRIPTKIT COLLECTIVE
        </span>
        <span 
          className="text-xs tracking-widest text-center hidden md:block"
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
