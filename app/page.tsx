"use client";

import { useState } from "react";

const FOLDERS = [
  { id: "scripts", label: "SCRIPTS", color: "#5A6B7A" },
  { id: "hooks", label: "HOOKS", color: "#B87D4B" },
  { id: "repurpose", label: "REPURPOSE", color: "#2D5A4A" },
  { id: "analyze", label: "ANALYZE", color: "#A67B73" },
];

function FolderIcon({ color, label, isHovered }: { color: string; label: string; isHovered: boolean }) {
  return (
    <div className="folder-item flex flex-col items-center gap-3 transition-all duration-200">
      {/* Folder Icon */}
      <svg 
        width="80" 
        height="64" 
        viewBox="0 0 80 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-200"
      >
        {/* Folder tab */}
        <rect 
          x="0" 
          y="0" 
          width="32" 
          height="12" 
          fill={isHovered ? color : "transparent"}
          stroke={color}
          strokeWidth="2"
        />
        {/* Folder body */}
        <rect 
          x="0" 
          y="12" 
          width="80" 
          height="52" 
          fill={isHovered ? color : "transparent"}
          stroke={color}
          strokeWidth="2"
        />
      </svg>
      
      {/* Label */}
      <span 
        className="text-xs tracking-widest font-medium transition-colors duration-200"
        style={{ color: isHovered ? color : "var(--text-secondary)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Home() {
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);

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
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4"
              style={{ 
                outlineColor: folder.color
              }}
            >
              <FolderIcon 
                color={folder.color} 
                label={folder.label}
                isHovered={hoveredFolder === folder.id}
              />
            </button>
          ))}
        </aside>

        {/* Center Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-12">
          {/* Logo */}
          <h1 
            className="mb-8"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: '96px',
              lineHeight: '1',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em'
            }}
          >
            scriptkit
          </h1>

          {/* Tagline - Make it MORE VISIBLE */}
          <p 
            className="mb-16"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: '22px',
              fontWeight: 600,
              color: '#1A1512',
              letterSpacing: '0.08em',
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
    </div>
  );
}
