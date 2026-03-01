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
    <>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center px-8 py-8"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          animation: 'fadeIn 0.2s ease-out'
        }}
        onClick={onClose}
      >
        <div 
          className="window-container"
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '80%',
            maxWidth: '1400px',
            height: '85vh',
            backgroundColor: '#FAF7F2',
            borderRadius: '8px',
            border: '1px solid rgba(44, 35, 24, 0.1)',
            boxShadow: '0 20px 60px rgba(44, 35, 24, 0.15), 0 8px 24px rgba(44, 35, 24, 0.08)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            animation: 'popupScale 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Title Bar */}
          <div 
            className="window-title-bar flex items-center justify-between px-6 select-none"
            style={{
              height: '48px',
              background: `linear-gradient(180deg, ${color}15 0%, ${color}08 100%)`,
              borderBottom: `1px solid ${color}30`,
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px'
            }}
          >
            <h2 
              className="font-semibold tracking-wider text-xs"
              style={{ 
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontFamily: 'var(--font-body)'
              }}
            >
              {title}
            </h2>
            
            {/* Close Button - "Cursor Tab" */}
            <button
              onClick={onClose}
              className="transition-all duration-150 hover:scale-110"
              style={{
                width: '24px',
                height: '24px',
                backgroundColor: color,
                borderRadius: '4px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '14px',
                color: '#FFFFFF',
                cursor: 'url(/cursor-pointer.svg) 8 0, pointer'
              }}
              aria-label="Close window"
            >
              ×
            </button>
          </div>

          {/* Window Body */}
          <div 
            className="window-body flex-1 overflow-auto p-8"
            style={{
              backgroundColor: '#FFFFFF'
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Popup Animation Keyframes */}
      <style jsx>{`
        @keyframes popupScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
