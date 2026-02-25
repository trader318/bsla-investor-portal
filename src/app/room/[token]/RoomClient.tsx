'use client';

import { useMemo, useState } from 'react';

type DocType = 'pdf' | 'xlsx' | 'docx';
type CategoryKey = 'all' | 'deck' | 'offering' | 'summary' | 'financial' | 'pipeline' | 'corporate' | 'team' | 'market';

type DocumentItem = {
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
  { key: 'deck', num: '01', title: 'Deck', documents: [{ name: 'Big Star Land Acquisition — Investor Deck', meta: 'PDF · Final Version', type: 'pdf', viewHref: '#', downloadHref: '#' }] },
  {
    key: 'offering',
    num: '02',
    title: 'Offering Documents',
    documents: [
      { name: 'BSLA, LLC — Private Placement Memorandum', meta: 'PDF · Final', type: 'pdf', viewHref: '#', downloadHref: '#' },
      { name: 'BSLA Subscription Agreement', meta: 'PDF · Final', type: 'pdf', viewHref: '#', downloadHref: '#' },
      { name: 'BSLA Convertible Promissory Note', meta: 'PDF · Final', type: 'pdf', viewHref: '#', downloadHref: '#' },
      { name: 'Operating Agreement — BSLA, LLC', meta: 'PDF · Final', type: 'pdf', viewHref: '#', downloadHref: '#' },
      { name: 'Wire Instructions — BSLA, LLC', meta: 'PDF · Final', type: 'pdf', viewHref: '#', downloadHref: '#' },
    ],
  },
  {
    key: 'summary',
    num: '03',
    title: 'Investment Summary',
    documents: [
      { name: 'BSLA Term Sheet', meta: 'PDF · Final', type: 'pdf', viewHref: '#', downloadHref: '#' },
      { name: 'Investment Summary — Power-Ready Land for the AI Supercycle', meta: 'DOCX · Overview', type: 'docx', downloadHref: '#' },
    ],
  },
  {
    key: 'financial',
    num: '04',
    title: 'Financial Model',
    documents: [
      { name: 'Big Star Land Acquisition Model v11.3', meta: 'XLSX · Financial Model', type: 'xlsx', downloadHref: '#' },
      { name: 'Financial Model Overview for Investors', meta: 'DOCX · Narrative Guide', type: 'docx', downloadHref: '#' },
    ],
  },
  {
    key: 'pipeline',
    num: '05',
    title: 'Asset Pipeline',
    documents: [{ name: 'BSLA — Energy Ready Sites', meta: 'PDF · Pipeline Overview', type: 'pdf', viewHref: '#', downloadHref: '#' }],
  },
  {
    key: 'corporate',
    num: '06',
    title: 'Corporate Documents',
    documents: [
      { name: 'LLC Articles / Certificate of Organization', meta: 'PDF · Formation', type: 'pdf', viewHref: '#', downloadHref: '#' },
      { name: 'Operating Agreement — BSLA, LLC', meta: 'PDF · Corporate', type: 'pdf', viewHref: '#', downloadHref: '#' },
    ],
  },
  { key: 'team', num: '07', title: 'Management & Team', documents: [{ name: 'Management & Leadership Team', meta: 'DOCX · Team Bios', type: 'docx', downloadHref: '#' }] },
  {
    key: 'market',
    num: '08',
    title: 'Market Validation & Industry Research',
    navTitle: 'Market Validation',
    documents: [{ name: 'BSLA Market Validation', meta: 'PDF · Research', type: 'pdf', viewHref: '#', downloadHref: '#' }],
  },
];

function DocumentCard({ doc }: { doc: DocumentItem }) {
  return (
    <div className="dr-doc-card">
      <div className={`dr-doc-icon ${doc.type}`}><span className="dr-doc-icon-label">{doc.type.toUpperCase()}</span></div>
      <div className="dr-doc-info">
        <div className="dr-doc-name">{doc.name}</div>
        <div className="dr-doc-meta">{doc.meta}</div>
      </div>
      <div className="dr-doc-actions">
        {doc.viewHref && <a href={doc.viewHref} className="dr-doc-btn dr-doc-btn-view">View</a>}
        <a href={doc.downloadHref || '#'} className="dr-doc-btn dr-doc-btn-dl">Download</a>
      </div>
    </div>
  );
}

export default function RoomClient() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const totalDocs = useMemo(() => categories.reduce((sum, c) => sum + c.documents.length, 0), []);

  return (
    <>
      <div className="dr-layout">
        <div className="dr-topbar">
          <div className="dr-topbar-left">
            <div className="dr-topbar-wm"><span className="dr-topbar-wm-top">BIGSTAR</span><span className="dr-topbar-wm-bot">LAND ACQUISITION</span></div>
            <div className="dr-topbar-divider" />
            <span className="dr-topbar-label">Private Deal Room</span>
          </div>
          <div className="dr-topbar-right"><span className="dr-topbar-user">Welcome, <strong>Investor</strong></span><span className="dr-topbar-badge">Verified · Accredited</span></div>
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
            <div className="dr-contact-photo" aria-label="Cecil Robles portrait" role="img" />
            <div className="dr-contact-body">
              <div className="dr-contact-name">Cecil Robles</div>
              <div className="dr-contact-role">Chief Revenue Officer</div>
              <div className="dr-contact-info">
                <a href="tel:4697760908" className="dr-contact-row"><span>(469) 776-0908</span></a>
                <a href="mailto:cecil@bigstarblockchain.com" className="dr-contact-row"><span>cecil@bigstarblockchain.com</span></a>
              </div>
              <a href="#" className="dr-contact-book">Book a Call</a>
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
                <div className="dr-doc-grid">{category.documents.map((doc) => <DocumentCard key={doc.name} doc={doc} />)}</div>
              </section>
            ))}
          </div>
        </main>
      </div>
      <div className="dr-watermark">Confidential · BSLA, LLC · Do Not Distribute</div>
    </>
  );
}
