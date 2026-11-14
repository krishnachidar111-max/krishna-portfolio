import { useRef } from "react";
import { Reveal, Section, Icon } from "./ui.jsx";
import { projects } from "../data.js";

function Card({ p, i }) {
  const ref = useRef(null);

  const tilt = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const Link = ({ href, label, icon }) =>
    href ? (
      <a
        className="btn small ghost action-btn"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label} <Icon name={icon} />
      </a>
    ) : (
      <span className="btn small ghost off" aria-disabled="true">
        {label}: in progress
      </span>
    );

  return (
    <Reveal delay={i * 0.08}>
      <article
        ref={ref}
        className="card project-card"
        onMouseMove={tilt}
        onMouseLeave={reset}
      >
        <div className="project-thumb-container" style={{ "--h": p.hue }}>
          {p.image ? (
            <img
              src={p.image}
              alt={`${p.name} preview showcase`}
              loading="lazy"
              width="800"
              height="450"
              className="project-img"
            />
          ) : (
            <div className="thumb-fallback">
              <span>{p.name.split(" ").map((w) => w[0]).join("")}</span>
            </div>
          )}
          <span className="project-category-tag">{p.tag}</span>
        </div>

        <div className="project-body">
          <div className="project-title-row">
            <h3>{p.name}</h3>
          </div>
          <p className="muted project-desc">{p.desc}</p>
          <ul className="chips project-stack">
            {p.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="row project-actions">
            <Link href={p.github} label="View Code" icon="github" />
            {p.demo && <Link href={p.demo} label="Live Demo" icon="arrow" />}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Featured Innovations"
      title="Projects &amp; AI Applications"
    >
      <div className="projects-grid">
        {projects.map((p, i) => (
          <Card key={p.id} p={p} i={i} />
        ))}
      </div>
    </Section>
  );
}
