'use client';

import { FormEvent, useMemo, useState } from 'react';

type AccessForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  accreditationBasis: string;
  investmentRange: string;
  source: string;
  notes: string;
  ndaAccepted: boolean;
  accredConfirmed: boolean;
  riskAccepted: boolean;
};

const initialState: AccessForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  accreditationBasis: '',
  investmentRange: '',
  source: '',
  notes: '',
  ndaAccepted: false,
  accredConfirmed: false,
  riskAccepted: false,
};

export default function AccessPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dealRoomUrl, setDealRoomUrl] = useState('#');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<AccessForm>(initialState);

  const step1Valid = useMemo(
    () => Boolean(formData.name.trim() && formData.email.trim() && formData.phone.trim()),
    [formData],
  );
  const step2Valid = useMemo(
    () => Boolean(formData.accreditationBasis && formData.investmentRange),
    [formData],
  );
  const step3Valid = useMemo(
    () => formData.ndaAccepted && formData.accredConfirmed && formData.riskAccepted,
    [formData],
  );

  const goStep = (next: 1 | 2 | 3 | 4) => {
    setStep(next);
    setError('');
    document.querySelector('.access-gate')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const submitAccess = async (e: FormEvent) => {
    e.preventDefault();
    if (!step3Valid) return;
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = (await response.json()) as {
        success?: boolean;
        dealRoomUrl?: string;
        error?: string;
      };

      if (!response.ok || !json.success || !json.dealRoomUrl) {
        throw new Error(json.error || 'Unable to submit request');
      }

      setDealRoomUrl(json.dealRoomUrl);
      goStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="access-page">
      <nav className="access-nav">
        <div className="access-nav-inner">
          <a href="/" className="access-nav-wm">
            <span className="access-nav-wm-top">BIGSTAR</span>
            <span className="access-nav-wm-bot">LAND ACQUISITION</span>
          </a>
          <span className="access-nav-badge">Private Placement · Deal Room</span>
        </div>
      </nav>

      <main className="access-main">
        <div className="access-bg-grid" />
        <div className="access-bg-orb" />

        <div className="access-gate">
          <div className="access-gate-label">Accredited Investors Only</div>
          <h1>Request Deal Room Access</h1>
          <p className="access-gate-sub">
            Complete verification to access our private placement memorandum, financial projections,
            and subscription documents.
          </p>

          <div className="access-steps">
            <div className="access-step"><div className={`access-step-dot ${step >= 2 ? 'done' : step === 1 ? 'active' : ''}`}>1</div></div>
            <div className={`access-step-line ${step >= 3 ? 'done' : step === 2 ? 'active' : ''}`} />
            <div className="access-step"><div className={`access-step-dot ${step >= 3 ? 'done' : step === 2 ? 'active' : ''}`}>2</div></div>
            <div className={`access-step-line ${step >= 4 ? 'done' : step === 3 ? 'active' : ''}`} />
            <div className="access-step"><div className={`access-step-dot ${step >= 4 ? 'done' : step === 3 ? 'active' : ''}`}>3</div></div>
          </div>

          <div className="access-form-card">
            <div className="access-form-card-bar" />

            {step === 1 && (
              <div className="access-step-panel active">
                <div className="access-form-card-header">
                  <span className="access-form-card-step">Step 1 of 3</span>
                  <span className="access-form-card-title">Personal Information</span>
                </div>
                <div className="access-form-body">
                  <div className="access-field">
                    <label>Full Name <span className="req">*</span></label>
                    <input type="text" placeholder="Enter your full name" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="access-field">
                    <label>Email Address <span className="req">*</span></label>
                    <input type="email" placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} />
                  </div>
                  <div className="access-field">
                    <label>Phone Number <span className="req">*</span></label>
                    <input type="tel" placeholder="(555) 000-0000" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} />
                  </div>
                  <div className="access-field">
                    <label>Company / Entity <span className="access-optional">(Optional)</span></label>
                    <input type="text" placeholder="Company or entity name" value={formData.company} onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))} />
                  </div>
                  <div className="access-form-actions">
                    <button className="btn-p" onClick={() => goStep(2)} disabled={!step1Valid}>Continue</button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="access-step-panel active">
                <div className="access-form-card-header">
                  <span className="access-form-card-step">Step 2 of 3</span>
                  <span className="access-form-card-title">Accredited Investor Verification</span>
                </div>
                <div className="access-form-body">
                  <div className="access-field">
                    <label>Accreditation Basis <span className="req">*</span></label>
                    <select value={formData.accreditationBasis} onChange={(e) => setFormData((p) => ({ ...p, accreditationBasis: e.target.value }))}>
                      <option value="" disabled>Select your qualification</option>
                      <option>Individual — $200K+ income ($300K+ joint) for 2+ years</option>
                      <option>Individual — $1M+ net worth (excluding primary residence)</option>
                      <option>Entity — $5M+ in assets</option>
                      <option>Licensed Series 7, 65, or 82 holder</option>
                      <option>Family office or family client</option>
                      <option>Qualified institutional buyer</option>
                    </select>
                  </div>
                  <div className="access-field">
                    <label>Investment Range <span className="req">*</span></label>
                    <select value={formData.investmentRange} onChange={(e) => setFormData((p) => ({ ...p, investmentRange: e.target.value }))}>
                      <option value="" disabled>Anticipated allocation size</option>
                      <option>$50,000 – $100,000</option>
                      <option>$100,000 – $250,000</option>
                      <option>$250,000 – $500,000</option>
                      <option>$500,000 – $1,000,000</option>
                      <option>$1,000,000+</option>
                    </select>
                  </div>
                  <div className="access-field">
                    <label>How Did You Hear About Us? <span className="access-optional">(Optional)</span></label>
                    <select value={formData.source} onChange={(e) => setFormData((p) => ({ ...p, source: e.target.value }))}>
                      <option value="" disabled>Select source</option>
                      <option>Direct referral</option>
                      <option>Investor event / dinner</option>
                      <option>Online research</option>
                      <option>Professional network</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="access-form-actions">
                    <button className="access-btn-back" onClick={() => goStep(1)}>Back</button>
                    <button className="btn-p" onClick={() => goStep(3)} disabled={!step2Valid}>Continue</button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="access-step-panel active">
                <div className="access-form-card-header">
                  <span className="access-form-card-step">Step 3 of 3</span>
                  <span className="access-form-card-title">Agreement & Submission</span>
                </div>
                <form className="access-form-body" onSubmit={submitAccess}>
                  <div className="access-check-field">
                    <input type="checkbox" id="nda" checked={formData.ndaAccepted} onChange={(e) => setFormData((p) => ({ ...p, ndaAccepted: e.target.checked }))} />
                    <label htmlFor="nda">I acknowledge that the materials in the deal room are confidential and proprietary. I agree to treat all information as strictly confidential and will not share, distribute, or disclose any materials without written consent from BSLA, LLC.</label>
                  </div>
                  <div className="access-check-field">
                    <input type="checkbox" id="accred-confirm" checked={formData.accredConfirmed} onChange={(e) => setFormData((p) => ({ ...p, accredConfirmed: e.target.checked }))} />
                    <label htmlFor="accred-confirm">I confirm that I meet the definition of an "accredited investor" as defined in Rule 501 of Regulation D under the Securities Act of 1933, and I understand that verification may be required.</label>
                  </div>
                  <div className="access-check-field">
                    <input type="checkbox" id="risk" checked={formData.riskAccepted} onChange={(e) => setFormData((p) => ({ ...p, riskAccepted: e.target.checked }))} />
                    <label htmlFor="risk">I understand that all investments carry risk, including the potential loss of principal, and that past performance is not indicative of future results.</label>
                  </div>
                  <div className="access-field">
                    <label>Questions or Notes <span className="access-optional">(Optional)</span></label>
                    <textarea placeholder="Anything you'd like us to know" value={formData.notes} onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))} />
                  </div>
                  {error && <p className="access-error">{error}</p>}
                  <div className="access-form-actions">
                    <button type="button" className="access-btn-back" onClick={() => goStep(2)}>Back</button>
                    <button className="btn-p" type="submit" disabled={!step3Valid || isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Request'}</button>
                  </div>
                </form>
              </div>
            )}

            {step === 4 && (
              <div className="access-step-panel active">
                <div className="access-success">
                  <div className="access-success-icon">✓</div>
                  <h3>Request Submitted</h3>
                  <p>Click below to get immediate access to the deal room. A private link has also been sent to your email.</p>
                  <a href={dealRoomUrl} className="btn-p access-success-btn">Enter Deal Room</a>
                </div>
              </div>
            )}
          </div>

          <div className="access-inside">
            <div className="access-inside-label">What's Inside the Deal Room</div>
            <div className="access-inside-items">
              <div className="access-inside-item"><span className="lock">🔒</span> Full Term Sheet & Projections</div>
              <div className="access-inside-item"><span className="lock">🔒</span> Full Case Study</div>
              <div className="access-inside-item"><span className="lock">🔒</span> Site Pipeline Details</div>
              <div className="access-inside-item"><span className="lock">🔒</span> Subscription Documents</div>
            </div>
          </div>

          <div className="access-back-link">
            <a href="/">← Back to Investment Overview</a>
          </div>
        </div>
      </main>

      <footer className="access-footer">
        <div className="access-ft-inner">
          <p className="access-ft-disc">This is not an offer to sell or solicitation to buy securities. Securities are offered only to accredited investors under Regulation D, Rule 506(c) of the Securities Act of 1933, as amended. All investments involve risk, including potential loss of principal.</p>
          <div className="access-ft-bot">
            <span className="access-ft-copy">© 2026 BigStar Blockchain Inc.</span>
            <span className="access-ft-copy">BSLA, LLC · Privacy · Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
