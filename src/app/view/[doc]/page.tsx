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

type Props = { params: Promise<{ doc: string }> };

export default async function ViewDoc({ params }: Props) {
  const { doc } = await params;
  const pdfPath = ALLOWED_DOCS[doc];
  if (!pdfPath) return notFound();

  return (
    <html>
      <head>
        <title>BSLA Document Viewer</title>
        <style>{`
          * { margin: 0; padding: 0; }
          body { background: #0a0e1a; overflow: hidden; }
          .viewer-bar { height: 48px; background: #0a0e1a; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; border-bottom: 1px solid rgba(201,165,78,.1); }
          .viewer-title { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(201,165,78,.7); }
          .viewer-badge { font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(148,163,184,.4); }
          .viewer-close { color: rgba(148,163,184,.5); text-decoration: none; font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; }
          .viewer-close:hover { color: #C9A54E; }
          iframe { width: 100%; height: calc(100vh - 48px); border: none; }
        `}</style>
      </head>
      <body>
        <div className="viewer-bar">
          <span className="viewer-title">BSLA Document Viewer</span>
          <span className="viewer-badge">Confidential · Do Not Distribute</span>
          <a href="javascript:window.close()" className="viewer-close">Close ✕</a>
        </div>
        <iframe src={`${pdfPath}#toolbar=0&navpanes=0&scrollbar=1`} />
      </body>
    </html>
  );
}
