'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type DocType = 'pdf' | 'xlsx' | 'docx';
type CategoryKey = 'all' | 'deck' | 'offering' | 'summary' | 'financial' | 'pipeline' | 'corporate' | 'team' | 'market';

type DocumentItem = {
  id: string;
  name: string;
  meta: string;
  type: DocType;
  viewHref?: string;
  downloadHref?: string;
};

type Category = {
  key: Exclude<CategoryKey, 'all'>;
  num: string;
  title: string;
  navTitle?: string;
  documents: DocumentItem[];
};

const categories: Category[] = [
  {
    key: 'deck',
    num: '01',
    title: 'Deck',
    documents: [
      {
        id: 'investor-deck',
        name: 'Big Star Land Acquisition — Investor Deck',
        meta: 'PDF · Final Version',
        type: 'pdf',
        viewHref: '/docs/investor-deck.pdf',
        downloadHref: '/docs/investor-deck.pdf',
      },
    ],
  },
  {
    key: 'offering',
    num: '02',
    title: 'Offering Documents',
    documents: [
      {
        id: 'private-placement-memorandum',
        name: 'BSLA, LLC — Private Placement Memorandum',
        meta: 'PDF · Final',
        type: 'pdf',
        viewHref: '/docs/private-placement-memorandum.pdf',
        downloadHref: '/docs/private-placement-memorandum.pdf',
      },
      {
        id: 'subscription-agreement',
        name: 'BSLA Subscription Agreement',
        meta: 'PDF · Final',
        type: 'pdf',
        viewHref: '/docs/subscription-agreement.pdf',
        downloadHref: '/docs/subscription-agreement.pdf',
      },
      {
        id: 'convertible-promissory-note',
        name: 'BSLA Convertible Promissory Note',
        meta: 'PDF · Final',
        type: 'pdf',
        viewHref: '/docs/convertible-promissory-note.pdf',
        downloadHref: '/docs/convertible-promissory-note.pdf',
      },
      {
        id: 'operating-agreement-bsla',
        name: 'Operating Agreement — BSLA, LLC',
        meta: 'PDF · Final',
        type: 'pdf',
        viewHref: '/docs/operating-agreement-bsla.pdf',
        downloadHref: '/docs/operating-agreement-bsla.pdf',
      },
      {
        id: 'wire-instructions',
        name: 'Wire Instructions — BSLA, LLC',
        meta: 'PDF · Final',
        type: 'pdf',
        viewHref: '/docs/wire-instructions.pdf',
        downloadHref: '/docs/wire-instructions.pdf',
      },
    ],
  },
  {
    key: 'summary',
    num: '03',
    title: 'Investment Summary',
    documents: [
      {
        id: 'bsla-term-sheet',
        name: 'BSLA Term Sheet',
        meta: 'PDF · Final',
        type: 'pdf',
        viewHref: '/docs/bsla-term-sheet.pdf',
        downloadHref: '/docs/bsla-term-sheet.pdf',
      },
      {
        id: 'investment-summary',
        name: 'Investment Summary — Power-Ready Land for the AI Supercycle',
        meta: 'DOCX · Overview',
        type: 'docx',
        downloadHref: '/docs/investment-summary.docx',
      },
    ],
  },
  {
    key: 'financial',
    num: '04',
    title: 'Financial Model',
    documents: [
      {
        id: 'financial-model-v11.3',
        name: 'Big Star Land Acquisition Model v11.3',
        meta: 'XLSX · Financial Model',
        type: 'xlsx',
        downloadHref: '/docs/financial-model-v11.3.xlsx',
      },
      {
        id: 'financial-model-overview',
        name: 'Financial Model Overview for Investors',
        meta: 'DOCX · Narrative Guide',
        type: 'docx',
        downloadHref: '/docs/financial-model-overview.docx',
      },
    ],
  },
  {
    key: 'pipeline',
    num: '05',
    title: 'Asset Pipeline',
    documents: [
      {
        id: 'energy-ready-sites',
        name: 'BSLA — Energy Ready Sites',
        meta: 'PDF · Pipeline Overview',
        type: 'pdf',
        viewHref: '/docs/energy-ready-sites.pdf',
        downloadHref: '/docs/energy-ready-sites.pdf',
      },
    ],
  },
  {
    key: 'corporate',
    num: '06',
    title: 'Corporate Documents',
    documents: [
      {
        id: 'llc-articles',
        name: 'LLC Articles / Certificate of Organization',
        meta: 'PDF · Formation',
        type: 'pdf',
        viewHref: '/docs/llc-articles.pdf',
        downloadHref: '/docs/llc-articles.pdf',
      },
      {
        id: 'operating-agreement',
        name: 'Operating Agreement — BSLA, LLC',
        meta: 'PDF · Corporate',
        type: 'pdf',
        viewHref: '/docs/operating-agreement.pdf',
        downloadHref: '/docs/operating-agreement.pdf',
      },
    ],
  },
  {
    key: 'team',
    num: '07',
    title: 'Management & Team',
    documents: [
      {
        id: 'management-team',
        name: 'Management & Leadership Team',
        meta: 'DOCX · Team Bios',
        type: 'docx',
        downloadHref: '/docs/management-team.docx',
      },
    ],
  },
  {
    key: 'market',
    num: '08',
    title: 'Market Validation & Industry Research',
    navTitle: 'Market Validation',
    documents: [
      {
        id: 'market-validation',
        name: 'BSLA Market Validation',
        meta: 'PDF · Research',
        type: 'pdf',
        viewHref: '/docs/market-validation.pdf',
        downloadHref: '/docs/market-validation.pdf',
      },
    ],
  },
];

const documentIdToName: Record<string, string> = {
  'investor-deck': 'Investor Deck',
  'private-placement-memorandum': 'Private Placement Memorandum',
  'subscription-agreement': 'Subscription Agreement',
  'convertible-promissory-note': 'Convertible Promissory Note',
  'wire-instructions': 'Wire Instructions',
  'operating-agreement-bsla': 'Operating Agreement',
  'bsla-term-sheet': 'BSLA Term Sheet',
  'investment-summary': 'Investment Summary',
  'financial-model-v11.3': 'Financial Model',
  'financial-model-overview': 'Financial Model Overview',
  'energy-ready-sites': 'Energy Ready Sites',
  'llc-articles': 'LLC Articles',
  'operating-agreement': 'Operating Agreement',
  'management-team': 'Management & Leadership Team',
  'market-validation': 'Market Validation',
};

function DocumentCard({ doc, onTrack }: { doc: DocumentItem; onTrack: (doc: DocumentItem, action: 'view' | 'download') => void }) {
  const isPdf = doc.type === 'pdf';
  const canDownload = Boolean(doc.downloadHref) && (!isPdf || doc.id === 'investor-deck');

  return (
    <div className="dr-doc-card">
      <div className={`dr-doc-icon ${doc.type}`}><span className="dr-doc-icon-label">{doc.type.toUpperCase()}</span></div>
      <div className="dr-doc-info">
        <div className="dr-doc-name">{doc.name}</div>
        <div className="dr-doc-meta">{doc.meta}</div>
      </div>
      <div className="dr-doc-actions">
        {isPdf && doc.viewHref && (
          <a
            href={`/view/${doc.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="dr-doc-btn dr-doc-btn-view"
            onClick={() => onTrack(doc, 'view')}
          >
            View
          </a>
        )}
        {canDownload && (
          <a
            href={doc.downloadHref}
            download
            className="dr-doc-btn dr-doc-btn-dl"
            onClick={() => onTrack(doc, 'download')}
          >
            Download
          </a>
        )}
      </div>
    </div>
  );
}

export default function RoomClient({ token, investorName }: { token: string; investorName: string }) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const totalDocs = useMemo(() => categories.reduce((sum, c) => sum + c.documents.length, 0), []);
  const hasTrackedEntryRef = useRef(false);

  const sendTracking = (payload: { documentId: string; documentName: string; action: string }) => {
    if (!token) return;

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        documentId: payload.documentId,
        documentName: payload.documentName,
        action: payload.action,
        timestamp: new Date().toISOString(),
      }),
      keepalive: true,
    }).catch(() => {
      // fire-and-forget
    });
  };

  useEffect(() => {
    if (hasTrackedEntryRef.current || !token) return;
    hasTrackedEntryRef.current = true;

    sendTracking({
      documentId: 'deal-room-entry',
      documentName: 'Deal Room',
      action: 'entered-deal-room',
    });
  }, [token]);

  return (
    <>
      <div className="dr-layout">
        <div className="dr-topbar">
          <div className="dr-topbar-left">
            <div className="dr-topbar-wm"><span className="dr-topbar-wm-top">BIGSTAR</span><span className="dr-topbar-wm-bot">LAND ACQUISITION</span></div>
            <div className="dr-topbar-divider" />
            <span className="dr-topbar-label">Private Deal Room</span>
          </div>
          <div className="dr-topbar-right"><span className="dr-topbar-user">Welcome, <strong>{investorName}</strong></span><span className="dr-topbar-badge">Verified · Accredited</span><a href="https://go.bigstarblockchain.com/widget/bookings/big-star-land-acquisition-investor-call" target="_blank" rel="noopener noreferrer" className="dr-topbar-btn dr-topbar-btn-book">Book a Call</a><a href="https://apps.docusign.com/webforms/us/b73d8cb58b381f5b32717ba4c562b756" target="_blank" rel="noopener noreferrer" className="dr-topbar-btn dr-topbar-btn-invest" onClick={() => sendTracking({ documentId: 'invest-now-docusign', documentName: 'Invest Now (DocuSign)', action: 'view' })}>Invest Now</a></div>
        </div>

        <aside className="dr-sidebar">
          <div className="dr-sidebar-section">
            <div className="dr-sidebar-section-label">Documents</div>
            <nav className="dr-sidebar-nav">
              <button className={`dr-nav-item ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}><span className="dr-nav-num" /><span className="dr-nav-text">All Documents</span><span className="dr-nav-count">{totalDocs}</span></button>
              {categories.map((category) => (
                <button key={category.key} className={`dr-nav-item ${activeCategory === category.key ? 'active' : ''}`} onClick={() => setActiveCategory(category.key)}>
                  <span className="dr-nav-num">{category.num}</span><span className="dr-nav-text">{category.navTitle || category.title}</span><span className="dr-nav-count">{category.documents.length}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="dr-contact-card">
            <div className="dr-contact-photo" aria-label="Cecil Robles portrait" role="img">
              <img src="/cecil-headshot.jpg" alt="Cecil Robles" />
            </div>
            <div className="dr-contact-body">
              <div className="dr-contact-name">Cecil Robles</div>
              <div className="dr-contact-role">Chief Revenue Officer</div>
              <div className="dr-contact-info">
                <a href="tel:4697760908" className="dr-contact-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  <span>(469) 776-0908</span>
                </a>
                <a href="mailto:cecil@bigstarblockchain.com" className="dr-contact-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  <span>cecil@bigstarblockchain.com</span>
                </a>
              </div>
              <a href="https://go.bigstarblockchain.com/widget/bookings/big-star-land-acquisition-investor-call" target="_blank" rel="noopener noreferrer" className="dr-contact-book">Book a Call</a>
            </div>
          </div>
        </aside>

        <main className="dr-main">
          {activeCategory === 'all' && (
            <div className="dr-welcome">
              <div className="dr-welcome-grid" />
              <div className="dr-welcome-content">
                <div className="dr-welcome-label">Confidential · Private Placement</div>
                <h2>BSLA Deal Room</h2>
                <p>All materials in this room are confidential and proprietary. Do not share, distribute, or disclose any documents without written consent from BSLA, LLC.</p>
                <div className="dr-welcome-stats">
                  <div><div className="dr-welcome-stat-val">$7.5M</div><div className="dr-welcome-stat-label">Raise Target</div></div>
                  <div><div className="dr-welcome-stat-val">{totalDocs}</div><div className="dr-welcome-stat-label">Documents</div></div>
                  <div><div className="dr-welcome-stat-val">{categories.length}</div><div className="dr-welcome-stat-label">Categories</div></div>
                </div>
              </div>
            </div>
          )}

          <div className="dr-all-cats">
            {(activeCategory === 'all' ? categories : categories.filter((category) => category.key === activeCategory)).map((category) => (
              <section className="dr-cat-block" key={category.key}>
                <div className="dr-cat-block-header">
                  <span className="dr-cat-block-num">{category.num}</span>
                  <span className="dr-cat-block-title">{category.title}</span>
                  <span className="dr-cat-block-count">{category.documents.length} Document{category.documents.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="dr-doc-grid">
                  {category.documents.map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      doc={doc}
                      onTrack={(clickedDoc, action) =>
                        sendTracking({
                          documentId: clickedDoc.id,
                          documentName: documentIdToName[clickedDoc.id] || clickedDoc.name,
                          action,
                        })
                      }
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Mobile contact card — shown only on small screens */}
          <div className="dr-contact-card-mobile">
            <div className="dr-contact-photo" aria-label="Cecil Robles portrait" role="img">
              <img src="/cecil-headshot.jpg" alt="Cecil Robles" />
            </div>
            <div className="dr-contact-body">
              <div className="dr-contact-name">Cecil Robles</div>
              <div className="dr-contact-role">Chief Revenue Officer</div>
              <div className="dr-contact-info">
                <a href="tel:4697760908" className="dr-contact-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  <span>(469) 776-0908</span>
                </a>
                <a href="mailto:cecil@bigstarblockchain.com" className="dr-contact-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  <span>cecil@bigstarblockchain.com</span>
                </a>
              </div>
              <a href="https://go.bigstarblockchain.com/widget/bookings/big-star-land-acquisition-investor-call" target="_blank" rel="noopener noreferrer" className="dr-contact-book">Book a Call</a>
            </div>
          </div>
        </main>
      </div>
      <div className="dr-watermark">Confidential · BSLA, LLC · Do Not Distribute</div>
    </>
  );
}
