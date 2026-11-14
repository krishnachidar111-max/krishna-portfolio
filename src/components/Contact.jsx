import { useState } from "react";
import { Reveal, Section, Icon } from "./ui.jsx";
import { profile } from "../data.js";

const check = (v) => {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email.";
  if (v.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  return e;
};

export default function Contact() {
  const [v, setV] = useState({ name: "", email: "", message: "" });
  const [err, setErr] = useState({});
  const [note, setNote] = useState("");
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const er = check(v); setErr(er); setNote("");
    if (Object.keys(er).length) return;
    if (!profile.email) { setNote("Email delivery isn't set up yet. Please reach out via LinkedIn, GitHub or Instagram."); return; }
    const body = encodeURIComponent(`${v.message}\n\nFrom: ${v.name} (${v.email})`);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Portfolio enquiry from " + v.name)}&body=${body}`;
    setNote("Your email app should open with the message ready to send.");
  };
  const links = [
    profile.email && ["mail", "Email", profile.email, `mailto:${profile.email}`],
    ["linkedin", "LinkedIn", "krishna-chidar", profile.linkedin],
    ["github", "GitHub", "krishnachidar111-max", profile.github],
    ["instagram", "Instagram", profile.instagramHandle, profile.instagram],
  ].filter(Boolean);
  const Field = ({ k, label, area }) => {
    const T = area ? "textarea" : "input";
    return (
      <label className="field">{label}
        <T value={v[k]} onChange={set(k)} rows={area ? 5 : undefined} type={k === "email" ? "email" : undefined}
          aria-invalid={!!err[k]} aria-describedby={err[k] ? `${k}-e` : undefined} />
        {err[k] && <span id={`${k}-e`} className="error" role="alert">{err[k]}</span>}
      </label>
    );
  };
  return (
    <Section id="contact" eyebrow="Contact" title="Have an Idea? Let's Build Something Amazing.">
      <div className="contact-grid">
        <Reveal className="contact-links">
          {links.map(([i, l, t, h]) => (
            <a key={l} className="card link-row" href={h} target={i === "mail" ? undefined : "_blank"} rel="noopener noreferrer">
              <Icon name={i} /><span><strong>{l}</strong><small>{t}</small></span>
            </a>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <form className="card form" onSubmit={submit} noValidate>
            <Field k="name" label="Name" /><Field k="email" label="Email" /><Field k="message" label="Message" area />
            <button className="btn primary" type="submit">Send Message</button>
            <p className="muted small" aria-live="polite">{note || "This form opens your email app; nothing is stored on a server."}</p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
