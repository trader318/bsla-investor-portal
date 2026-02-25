import { notFound } from 'next/navigation';

const ALLOWED_DOCS: Record<string, string> = {
  'investor-deck': '/docs/investor-deck.pdf',
  'private-placement-memorandum': '/docs/private-placement-memorandum.pdf',
  'subscription-agreement': '/docs/subscription-agreement.pdf',
  'convertible-promissory-note': '/docs/convertible-promissory-note.pdf',
  'wire-instructions': '/docs/wire-instructions.pdf',
  'operating-agreement-bsla': '/docs/operating-agreement-bsla.pdf',
  'bsla-term-sheet': '/docs/bsla-term-sheet.pdf',
  'energy-ready-sites': '/docs/energy-ready-sites.pdf',
  'llc-articles': '/docs/llc-articles.pdf',
  'operating-agreement': '/docs/operating-agreement.pdf',
  'market-validation': '/docs/market-validation.pdf',
};

const DOC_NAMES: Record<string, string> = {
  'investor-deck': 'Investor Deck',
  'private-placement-memorandum': 'Private Placement Memorandum',
  'subscription-agreement': 'Subscription Agreement',
  'convertible-promissory-note': 'Convertible Promissory Note',
  'wire-instructions': 'Wire Instructions',
  'operating-agreement-bsla': 'Operating Agreement (BSLA)',
  'bsla-term-sheet': 'Term Sheet',
  'energy-ready-sites': 'Energy Ready Sites',
  'llc-articles': 'LLC Articles',
  'operating-agreement': 'Operating Agreement',
  'market-validation': 'Market Validation',
};

type Props = { params: Promise<{ doc: string }> };

export default async function ViewDoc({ params }: Props) {
  const { doc } = await params;
  const pdfPath = ALLOWED_DOCS[doc];
  if (!pdfPath) return notFound();
  const docName = DOC_NAMES[doc] || doc;

  return (
    <div style={{ margin: 0, padding: 0, background: '#0a0e1a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
          textTransform: 'uppercase' as const,
          color: 'rgba(201,165,78,.7)',
          whiteSpace: 'nowrap' as const,
        }}>
          {docName}
        </span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '8px',
          letterSpacing: '1.5px',
          textTransform: 'uppercase' as const,
          color: 'rgba(148,163,184,.4)',
          display: 'none',
        }}>
          Confidential
        </span>
        <a
          href="javascript:history.back()"
          style={{
            color: 'rgba(201,165,78,.7)',
            textDecoration: 'none',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            letterSpacing: '1px',
            textTransform: 'uppercase' as const,
            border: '1px solid rgba(201,165,78,.2)',
            padding: '6px 14px',
            whiteSpace: 'nowrap' as const,
          }}
        >
          ← Back
        </a>
      </div>
      <div style={{ flex: 1, position: 'relative' as const, overflow: 'hidden' }}>
        {/* Desktop/tablet: iframe with hidden toolbar */}
        <iframe
          src={`${pdfPath}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            position: 'absolute' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          title={docName}
        />
      </div>
      {/* Mobile fallback: if iframe doesn't scroll, user can tap to open PDF directly */}
      <div style={{
        position: 'fixed' as const,
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
      }}>
        <a
          href={`${pdfPath}#toolbar=0`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase' as const,
            color: '#0a0e1a',
            background: '#C9A54E',
            padding: '10px 24px',
            textDecoration: 'none',
            borderRadius: '0',
            boxShadow: '0 4px 20px rgba(0,0,0,.4)',
          }}
        >
          Open Full Document
        </a>
      </div>
    </div>
  );
}
