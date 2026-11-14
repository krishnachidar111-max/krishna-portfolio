import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay, ease: "easeOut" }}>
    {children}
  </motion.div>
);

export const Section = ({ id, eyebrow, title, children }) => (
  <section id={id} className="section" aria-labelledby={`${id}-h`}>
    <Reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={`${id}-h`} className="h2">{title}</h2>
    </Reveal>
    {children}
  </section>
);

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
export const Icon = ({ name }) => {
  const paths = {
    github: <path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />,
    linkedin: <path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.05c.53-1 1.84-2.04 3.78-2.04 4.04 0 4.79 2.66 4.79 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.69V21h-4V9.75Z" />,
    instagram: <g {...P}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></g>,
    mail: <g {...P}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></g>,
    arrow: <path {...P} d="M7 17 17 7M8 7h9v9" />,
    up: <path {...P} d="M12 19V5M5 12l7-7 7 7" />,
    download: <path {...P} d="M12 4v11m-5-4 5 5 5-5M5 20h14" />,
  };
  return <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">{paths[name]}</svg>;
};

export const Socials = ({ profile }) => (
  <ul className="socials">
    {[["github", "GitHub", profile.github], ["linkedin", "LinkedIn", profile.linkedin], ["instagram", "Instagram", profile.instagram]].map(([i, l, h]) => (
      <li key={i}><a href={h} target="_blank" rel="noopener noreferrer" aria-label={l} className="icon-btn"><Icon name={i} /></a></li>
    ))}
  </ul>
);
