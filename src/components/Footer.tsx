export default function Footer() {
  return (
    <footer className="section-dark">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          {/* BIGSTAR Wordmark */}
          <div style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: '24px', 
            fontWeight: '800', 
            color: 'rgba(248, 250, 252, 0.6)',
            textTransform: 'uppercase',
            letterSpacing: '-0.5px',
            marginBottom: '32px'
          }}>
            BIGSTAR
          </div>

          {/* Regulatory Disclaimer */}
          <div style={{ marginBottom: '40px' }}>
            <p style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '14px', 
              color: 'var(--text-light-secondary)',
              lineHeight: '1.6',
              marginBottom: '16px'
            }}>
              This is not an offer to sell or solicitation to buy securities. Securities are
              offered only to accredited investors under Regulation D, Rule 506(c) of the
              Securities Act of 1933, as amended. Prospective investors must verify their
              accredited investor status. Past performance is not indicative of future results.
              All investments involve risk, including potential loss of principal.
            </p>
            <p style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '12px', 
              color: 'var(--slate)',
              marginBottom: '8px'
            }}>
              BSLA, LLC is a wholly-owned subsidiary of BigStar Blockchain Inc.
              Securities offered through BSLA, LLC.
            </p>
          </div>

          {/* Footer Badges */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '16px', 
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            <div className="badge badge-gold">SEC Regulation D</div>
            <div className="badge badge-gold">Rule 506(c)</div>
            <div className="badge badge-gold">Accredited Only</div>
            <div className="badge badge-gold">Private Placement</div>
          </div>

          {/* Copyright */}
          <div style={{ 
            borderTop: '1px solid var(--border-dark)', 
            paddingTop: '24px',
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            color: 'var(--slate)'
          }}>
            © 2026 BigStar Blockchain Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}