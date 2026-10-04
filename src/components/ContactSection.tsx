import React, { useState } from 'react';
import { Send, Mail, Copy, Check, Github, Linkedin, Sparkles, MessageSquare, Terminal } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const email = 'yathinkumar.a2026@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || sending) return;

    setSending(true);
    setError('');

    try {
      // FormSubmit forwards the message straight to the inbox below (no backend needed).
      const res = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          _subject: `Portfolio message: ${formData.subject}`,
          subject: formData.subject,
          message: formData.message,
          _template: 'table',
          _captcha: 'false'
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === 'false' || data.success === false) {
        throw new Error(data.message || 'Request failed');
      }
      setSubmitted(true);
    } catch {
      setError('Transmission failed. Please try again, or email me directly using the address on the left.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto z-20">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-sm">
          <Send className="w-3.5 h-3.5" />
          <span>TRANSMISSION // 05</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-['Space_Grotesk'] text-white">
          ESTABLISH <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-300">COMMUNICATION</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
          Have an exciting AI project, hackathon idea, research collaboration, or just want to discuss neural networks and 3D graphics? Let's connect.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Links & Status - Solid Dark Surface */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0b20] border-2 border-slate-700/80 space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
              Direct Frequency Channels
            </h3>

            {/* Email quick copy */}
            <div className="p-4 rounded-2xl bg-[#12122f] border-2 border-slate-700/80">
              <span className="text-xs font-mono font-bold text-rose-300 block mb-1.5 uppercase">
                PRIMARY EMAIL TRANSMISSION
              </span>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-mono text-white font-bold truncate">
                  {email}
                </span>
                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social channels */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-slate-300 block uppercase">
                NETWORKS & REPOSITORIES
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://github.com/playingkinggame"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-[#12122f] border-2 border-slate-700/80 hover:border-rose-500 hover:bg-[#16163a] transition-all flex items-center gap-3 group shadow-md"
                >
                  <Github className="w-5 h-5 text-rose-300 group-hover:text-white transition-colors" />
                  <span className="text-sm font-mono font-bold text-white">
                    GitHub
                  </span>
                </a>
                <a
                  href="https://in.linkedin.com/in/yathin-kumar-55b97141b"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-[#12122f] border-2 border-slate-700/80 hover:border-rose-500 hover:bg-[#16163a] transition-all flex items-center gap-3 group shadow-md"
                >
                  <Linkedin className="w-5 h-5 text-rose-300 group-hover:text-white transition-colors" />
                  <span className="text-sm font-mono font-bold text-white">
                    LinkedIn
                  </span>
                </a>
              </div>
            </div>

            {/* University affiliation */}
            <div className="pt-4 border-t border-slate-700/80 text-xs font-mono text-slate-300 space-y-1.5">
              <div><strong className="text-rose-300">STATUS:</strong> Verified First-Year Undergrad</div>
              <div><strong className="text-rose-300">CAMPUS:</strong> VIT Chennai, Tamil Nadu, India</div>
              <div><strong className="text-rose-300">TIMEZONE:</strong> IST (UTC+05:30)</div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Dispatch Form - High Contrast Inputs */}
        <div className="lg:col-span-7 rounded-3xl bg-[#0b0b20] border-2 border-slate-700/80 p-6 sm:p-8 shadow-2xl">
          <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] mb-2">
            Send Encrypted Transmission
          </h3>
          <p className="text-sm text-slate-300 mb-6 font-normal">
            Dispatch a message directly to Yathin's inbox.
          </p>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/50 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white font-['Space_Grotesk']">
                TRANSMISSION DISPATCHED
              </h4>
              <p className="text-sm text-slate-200 max-w-md mx-auto">
                Thank you! Your message has been sent to Yathin's inbox. He will review your transmission and get back to you promptly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="mt-4 px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-mono font-bold text-white transition-colors"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-200 mb-1.5 uppercase">
                    YOUR CALLSIGN / NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Vance"
                    className="w-full px-4 py-3 rounded-xl bg-[#141433] border-2 border-slate-700 focus:border-rose-500 text-white placeholder:text-slate-500 text-sm focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-200 mb-1.5 uppercase">
                    YOUR EMAIL FREQUENCY
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#141433] border-2 border-slate-700 focus:border-rose-500 text-white placeholder:text-slate-500 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-200 mb-1.5 uppercase">
                  MISSION SUBJECT
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Hackathon Partnership / AI Research / Project Collaboration"
                  className="w-full px-4 py-3 rounded-xl bg-[#141433] border-2 border-slate-700 focus:border-rose-500 text-white placeholder:text-slate-500 text-sm focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-200 mb-1.5 uppercase">
                  MESSAGE PAYLOAD
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide details about your collaboration, inquiry, or question..."
                  className="w-full px-4 py-3 rounded-xl bg-[#141433] border-2 border-slate-700 focus:border-rose-500 text-white placeholder:text-slate-500 text-sm focus:outline-none transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="text-sm font-mono text-rose-300 bg-rose-500/10 border border-rose-500/40 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-mono text-sm font-bold tracking-wider uppercase shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 group"
              >
                <span>{sending ? 'TRANSMITTING...' : 'TRANSMIT DISPATCH'}</span>
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};