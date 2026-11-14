import { Reveal, Section } from "./ui.jsx";
import { timeline } from "../data.js";

export function Journey() {
  return (
    <Section
      id="journey"
      eyebrow="Milestones &amp; Experience"
      title="My Learning Journey &amp; Achievements"
    >
      <div className="journey-wrapper">
        <ol className="timeline">
          {timeline.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.08}>
              <li className="t-item">
                <span className="dot" aria-hidden="true" />
                <div className="t-card card">
                  <div className="t-header">
                    <h3>{t.title}</h3>
                    {t.badge && <span className="t-badge">{t.badge}</span>}
                  </div>
                  <p className="muted">{t.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
