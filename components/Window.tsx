"use client";

import { useEffect } from "react";

interface WindowProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  color: string;
}

export function Window({ title, onClose, children, color }: WindowProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center px-8 py-8 animate-fade-in"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(2px)'
      }}
      onClick={onClose}
    >
      <div 
        className="window-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '1200px',
          maxHeight: '85vh',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '2px solid #2C2318',
          boxShadow: '8px 8px 0px rgba(44, 35, 24, 0.2)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Title Bar */}
        <div 
          className="window-title-bar flex items-center justify-between px-4 py-3 border-b-2 select-none"
          style={{
            backgroundColor: color,
            borderColor: '#2C2318'
          }}
        >
          <h2 
            className="font-medium tracking-widest text-sm"
            style={{ 
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}
          >
            {title}
          </h2>
          
          {/* Window Controls */}
          <div className="flex items-center gap-2">
            {/* Minimize button (disabled for now) */}
            <button
              className="window-control"
              disabled
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '2px',
                opacity: 0.5
              }}
            >
              <span style={{ fontSize: '10px', color: '#FFF' }}>_</span>
            </button>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="window-control hover:bg-red-500 transition-colors"
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '12px',
                color: '#FFF'
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Window Body */}
        <div 
          className="window-body flex-1 overflow-auto p-8"
          style={{
            backgroundColor: '#FAF7F2'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
