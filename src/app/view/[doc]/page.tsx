import { notFound } from 'next/navigation';
import ViewerClient from './ViewerClient';

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

  return <ViewerClient pdfPath={pdfPath} docName={docName} />;
}
