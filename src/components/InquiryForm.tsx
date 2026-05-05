import React, { useState, useEffect, useRef } from 'react';
import './InquiryForm.css';

interface InquiryFormProps {
  onClose?: () => void;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<any>({
    programs: [],
    fullName: '',
    dob: '',
    gender: '',
    nationality: '',
    contact: '',
    email: '',
    addrTemp: '',
    addrPerm: '',
    parentName: '',
    parentContact: '',
    academic: {},
    remarks: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formRefId, setFormRefId] = useState('');

  const nameInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dobInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Generate a reference ID like in the original script
    const id = 'INQ-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    setFormRefId(id);
  }, []);

  const handleProgramChange = (name: string, checked: boolean) => {
    const prev = formData.programs || [];
    const next = checked ? [...prev, name] : prev.filter((p: string) => p !== name);
    setFormData({ ...formData, programs: next });
    updateProgress({ ...formData, programs: next });
  };

  const handleNameInput = (index: number, val: string) => {
    const v = val.toUpperCase().replace(/[^A-Z. ]/g, '').slice(0, 1);
    const currentName = (formData.fullName || '').padEnd(28, ' ').split('');
    currentName[index] = v || ' ';
    const fullName = currentName.join('').trimEnd();
    setFormData({ ...formData, fullName });
    
    if (v && index < 27) {
      nameInputRefs.current[index + 1]?.focus();
    }
    updateProgress({ ...formData, fullName });
  };

  const handleDobInput = (index: number, val: string) => {
    const v = val.replace(/\D/g, '').slice(0, 1);
    const currentDob = (formData.dob || '').padEnd(8, ' ').split('');
    currentDob[index] = v || ' ';
    const dob = currentDob.join('').trimEnd();
    setFormData({ ...formData, dob });

    if (v && index < 7) {
      dobInputRefs.current[index + 1]?.focus();
    }
    updateProgress({ ...formData, dob });
  };

  const updateProgress = (data: any) => {
    const REQ = [
      () => (data.fullName || '').length >= 3,
      () => (data.dob || '').length === 8,
      () => !!(data.gender || '').trim(),
      () => /^\d{10}$/.test((data.contact || '').replace(/\D/g, '')),
      () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || ''),
      () => !!(data.addrPerm || '').trim(),
      () => !!(data.parentName || '').trim(),
      () => /^\d{10}$/.test((data.parentContact || '').replace(/\D/g, '')),
      () => (data.programs || []).length > 0,
    ];
    const done = REQ.filter(fn => fn()).length;
    setProgress(Math.round((done / REQ.length) * 100));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const body = new FormData(form);
    
    body.append('programs', formData.programs.join(', '));
    body.append('fullName', formData.fullName);
    body.append('dob', formData.dob);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(body as any).toString(),
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Submission failed", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="if-inquiry-form-container">
      <div className="inquiry-form-page">
        <div className="progress-rail">
          <div className="progress-inner">
            <span className="progress-num">{progress}% complete</span>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="confirm-overlay">
            <div className="confirm-card">
              <div className="check">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12.5L10 17.5L19 7.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>Inquiry Received</h2>
              <p>Thank you for your interest in NIET. Our admissions team will contact you within 2 working days to guide you through the next steps.</p>
              <div className="ref-id">{formRefId}</div>
              <div>
                <button type="button" onClick={() => window.location.href = '/'}>Go to Homepage</button>
              </div>
            </div>
          </div>
        ) : (
          <form className="form-card" name="inquiry" method="POST" data-netlify="true" onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value="inquiry" />
            <input type="hidden" name="ref-id" value={formRefId} />
            
            <header className="masthead">
              <img className="logo" src="/logo.png" alt="NIET Logo" />
              <div className="masthead-text">
                <div className="institute">National Institute of Engineering and Technology</div>
                <div className="tagline">Happy · Healthy · Learning</div>
                <div className="affil">Affiliated to Purbanchal University · Estd. 2005</div>
              </div>
              <div className="masthead-meta">
                <div><span className="label">Web</span><br /><span className="val">niet.edu.np</span></div>
                <div style={{ marginTop: '8px' }}><span className="label">Form</span><br /><span className="val">INQ-2026 / Rev.1</span></div>
              </div>
            </header>

            <div className="form-title-bar">
              <h1>INQUIRY&nbsp;FORM</h1>
              <span className="ref">{formRefId}</span>
            </div>

            <section>
              <div className="section-head"><span className="num">01</span><span>Program of Interest</span></div>
              <div className="section-body">
                <p className="section-intro">Tick (✓) the box next to the program(s) you are interested in.</p>
                <div className="program-list" role="group">
                  {[
                    { id: 'be-biomed', name: 'B.E. Biomedical Engineering', val: 'BE Biomedical' },
                    { id: 'be-comp', name: 'B.E. Computer Engineering', val: 'BE Computer' },
                    { id: 'btech-ai', name: 'B.Tech in Artificial Intelligence', val: 'BTech AI' }
                  ].map(p => (
                    <label key={p.id} className={`program-item ${formData.programs.includes(p.val) ? 'checked' : ''}`}>
                      <input 
                        type="checkbox" 
                        name="program" 
                        value={p.val} 
                        checked={formData.programs.includes(p.val)}
                        onChange={(e) => handleProgramChange(p.val, e.target.checked)}
                      />
                      <span className="program-checkbox">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path d="M1.5 5.5L4 8L9.5 2.5" stroke="white" strokeWidth="2" strokeLinecap="square"/>
                        </svg>
                      </span>
                      <span className="program-info"><span className="name">{p.name}</span></span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <div className="section-head"><span className="num">02</span><span>Personal Information</span></div>
              <div className="section-body">
                <div className="if-grid">
                  <div className="field">
                    <label className="lbl">Student's Full Name <span className="req">*</span><span className="hint">In capital letters</span></label>
                    <div className="name-boxes">
                      {Array.from({ length: 28 }).map((_, i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength={1}
                          value={formData.fullName[i] || ''}
                          ref={el => nameInputRefs.current[i] = el}
                          onChange={(e) => handleNameInput(i, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !formData.fullName[i] && i > 0) {
                              nameInputRefs.current[i - 1]?.focus();
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="if-grid if-grid-3">
                    <div className="field">
                      <label className="lbl">Date of Birth <span className="req">*</span><span className="hint">DD / MM / YYYY</span></label>
                      <div className="dob-row">
                        <div className="dob-group">
                          <input type="text" maxLength={1} value={formData.dob[0] || ''} ref={el => dobInputRefs.current[0] = el} onChange={e => handleDobInput(0, e.target.value)} onKeyDown={e => e.key === 'Backspace' && !formData.dob[0] && dobInputRefs.current[0]?.focus()}/>
                          <input type="text" maxLength={1} value={formData.dob[1] || ''} ref={el => dobInputRefs.current[1] = el} onChange={e => handleDobInput(1, e.target.value)} onKeyDown={e => e.key === 'Backspace' && !formData.dob[1] && dobInputRefs.current[0]?.focus()}/>
                        </div>
                        <span className="dob-sep">/</span>
                        <div className="dob-group">
                          <input type="text" maxLength={1} value={formData.dob[2] || ''} ref={el => dobInputRefs.current[2] = el} onChange={e => handleDobInput(2, e.target.value)} onKeyDown={e => e.key === 'Backspace' && !formData.dob[2] && dobInputRefs.current[1]?.focus()}/>
                          <input type="text" maxLength={1} value={formData.dob[3] || ''} ref={el => dobInputRefs.current[3] = el} onChange={e => handleDobInput(3, e.target.value)} onKeyDown={e => e.key === 'Backspace' && !formData.dob[3] && dobInputRefs.current[2]?.focus()}/>
                        </div>
                        <span className="dob-sep">/</span>
                        <div className="dob-group">
                          <input type="text" maxLength={1} value={formData.dob[4] || ''} ref={el => dobInputRefs.current[4] = el} onChange={e => handleDobInput(4, e.target.value)} onKeyDown={e => e.key === 'Backspace' && !formData.dob[4] && dobInputRefs.current[3]?.focus()}/>
                          <input type="text" maxLength={1} value={formData.dob[5] || ''} ref={el => dobInputRefs.current[5] = el} onChange={e => handleDobInput(5, e.target.value)} onKeyDown={e => e.key === 'Backspace' && !formData.dob[5] && dobInputRefs.current[4]?.focus()}/>
                          <input type="text" maxLength={1} value={formData.dob[6] || ''} ref={el => dobInputRefs.current[6] = el} onChange={e => handleDobInput(6, e.target.value)} onKeyDown={e => e.key === 'Backspace' && !formData.dob[6] && dobInputRefs.current[5]?.focus()}/>
                          <input type="text" maxLength={1} value={formData.dob[7] || ''} ref={el => dobInputRefs.current[7] = el} onChange={e => handleDobInput(7, e.target.value)} onKeyDown={e => e.key === 'Backspace' && !formData.dob[7] && dobInputRefs.current[6]?.focus()}/>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <label className="lbl" htmlFor="gender">Gender <span className="req">*</span></label>
                      <input type="text" id="gender" name="gender" list="genderOpts" value={formData.gender} onChange={e => { setFormData({ ...formData, gender: e.target.value }); updateProgress({ ...formData, gender: e.target.value }); }} />
                      <datalist id="genderOpts"><option value="Female"/><option value="Male"/><option value="Other"/></datalist>
                    </div>
                    <div className="field">
                      <label className="lbl" htmlFor="nationality">Nationality</label>
                      <input type="text" id="nationality" name="nationality" value={formData.nationality} onChange={e => setFormData({ ...formData, nationality: e.target.value })} />
                    </div>
                  </div>

                  <div className="if-grid if-grid-2">
                    <div className="field">
                      <label className="lbl" htmlFor="contact">Contact Number <span className="req">*</span><span className="hint">10 digits</span></label>
                      <input type="tel" id="contact" name="contact" value={formData.contact} onChange={e => { setFormData({ ...formData, contact: e.target.value }); updateProgress({ ...formData, contact: e.target.value }); }} />
                    </div>
                    <div className="field">
                      <label className="lbl" htmlFor="email">Email Address <span className="req">*</span></label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={e => { setFormData({ ...formData, email: e.target.value }); updateProgress({ ...formData, email: e.target.value }); }} />
                    </div>
                  </div>

                  <div className="if-grid if-grid-2">
                    <div className="field">
                      <label className="lbl" htmlFor="addr-temp">Temporary Address</label>
                      <input type="text" id="addr-temp" name="addr-temp" value={formData.addrTemp} onChange={e => setFormData({ ...formData, addrTemp: e.target.value })} />
                    </div>
                    <div className="field">
                      <label className="lbl" htmlFor="addr-perm">Permanent Address <span className="req">*</span></label>
                      <input type="text" id="addr-perm" name="addr-perm" value={formData.addrPerm} onChange={e => { setFormData({ ...formData, addrPerm: e.target.value }); updateProgress({ ...formData, addrPerm: e.target.value }); }} />
                    </div>
                  </div>

                  <div className="if-grid if-grid-2">
                    <div className="field">
                      <label className="lbl" htmlFor="parent-name">Parent / Guardian's Name <span className="req">*</span></label>
                      <input type="text" id="parent-name" name="parent-name" value={formData.parentName} onChange={e => { setFormData({ ...formData, parentName: e.target.value }); updateProgress({ ...formData, parentName: e.target.value }); }} />
                    </div>
                    <div className="field">
                      <label className="lbl" htmlFor="parent-contact">Parent / Guardian's Contact <span className="req">*</span><span className="hint">10 digits</span></label>
                      <input type="tel" id="parent-contact" name="parent-contact" value={formData.parentContact} onChange={e => { setFormData({ ...formData, parentContact: e.target.value }); updateProgress({ ...formData, parentContact: e.target.value }); }} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="section-head"><span className="num">03</span><span>Academic Record</span></div>
              <div className="section-body">
                <p className="section-intro">Provide details of your most recent qualifications.</p>
                <table className="academic">
                  <thead><tr><th>Certificate</th><th>Name &amp; Address of Institution</th><th>Board / University</th><th>Year</th><th>Grade / GPA</th></tr></thead>
                  <tbody>
                    <tr>
                      <td className="cert">SEE or Equivalent</td>
                      <td><input type="text" name="see-inst" onChange={e => setFormData({ ...formData, academic: { ...formData.academic, seeInst: e.target.value } })} /></td>
                      <td><input type="text" name="see-board" onChange={e => setFormData({ ...formData, academic: { ...formData.academic, seeBoard: e.target.value } })} /></td>
                      <td><input type="text" name="see-year" maxLength={4} onChange={e => setFormData({ ...formData, academic: { ...formData.academic, seeYear: e.target.value } })} /></td>
                      <td><input type="text" name="see-grade" onChange={e => setFormData({ ...formData, academic: { ...formData.academic, seeGrade: e.target.value } })} /></td>
                    </tr>
                    <tr>
                      <td className="cert">+2 / Higher Secondary</td>
                      <td><input type="text" name="plus2-inst" onChange={e => setFormData({ ...formData, academic: { ...formData.academic, plus2Inst: e.target.value } })} /></td>
                      <td><input type="text" name="plus2-board" onChange={e => setFormData({ ...formData, academic: { ...formData.academic, plus2Board: e.target.value } })} /></td>
                      <td><input type="text" name="plus2-year" maxLength={4} onChange={e => setFormData({ ...formData, academic: { ...formData.academic, plus2Year: e.target.value } })} /></td>
                      <td><input type="text" name="plus2-grade" onChange={e => setFormData({ ...formData, academic: { ...formData.academic, plus2Grade: e.target.value } })} /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>


            <div className="form-footer">
              <div className="footer-meta"><span>NIET · INQ-2026</span></div>
            </div>
            
            <div className="actions">
              <button type="submit" className="primary">Submit Inquiry →</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
