'use client';

import { useEffect, useState } from 'react';

export default function ViewerClient({ pdfPath, docName }: { pdfPath: string; docName: string }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(mobile);
    if (mobile) {
      // On mobile, redirect directly to the PDF — Safari's native viewer handles scrolling
      window.location.replace(`${pdfPath}#toolbar=0`);
    }
  }, [pdfPath]);

  if (isMobile) {
    return (
      <div style={{ background: '#0a0e1a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: 'rgba(201,165,78,.7)', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Opening document...
        </span>
      </div>
    );
  }

  return (
    <div style={{ margin: 0, padding: 0, background: '#0a0e1a', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{
        height: '48px',
        background: '#0a0e1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        borderBottom: '1px solid rgba(201,165,78,.1)',
        flexShrink: 0,
        gap: '12px',
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'rgba(201,165,78,.7)',
          whiteSpace: 'nowrap',
        }}>
          {docName}
        </span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '8px',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: 'rgba(148,163,184,.4)',
        }}>
          Confidential · Do Not Distribute
        </span>
        <button
          onClick={() => { try { window.close(); } catch { /* */ } history.back(); }}
          style={{
            color: 'rgba(201,165,78,.7)',
            background: 'transparent',
            cursor: 'pointer',
            textDecoration: 'none',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            border: '1px solid rgba(201,165,78,.2)',
            padding: '6px 14px',
            whiteSpace: 'nowrap',
          }}
        >
          ← Back
        </button>
      </div>
      <iframe
        src={`${pdfPath}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
        style={{
          flex: 1,
          width: '100%',
          border: 'none',
        }}
        title={docName}
      />
    </div>
  );
}
