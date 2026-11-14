import { Reveal, Section } from "./ui.jsx";
import { skills, profile } from "../data.js";

export function About() {
  return (
    <Section id="about" eyebrow="About Krishna" title="Passionate Developer & Innovator">
      <div className="about-showcase">
        {/* Left Side: Photo Card showing IIT Delhi background */}
        <Reveal className="about-photo-card card">
          <div className="photo-wrapper">
            <img
              src={profile.photo || "/images/krishna.jpg"}
              alt="Krishna Chidar at Indian Institute of Technology Delhi"
              className="about-img"
              loading="lazy"
            />
            <div className="photo-overlay-glass">
              <div className="location-pill">
                <span className="dot-live" />
                <span>IIT Delhi • Tech &amp; Hackathon Participant</span>
              </div>
              <h4>Krishna Chidar</h4>
              <p className="photo-caption">B.Tech CSE (AI &amp; Data Science) @ SISTEC</p>
            </div>
          </div>
        </Reveal>

        {/* Right Side: Bio Narrative & Stats */}
        <div className="about-content">
          <Reveal delay={0.08} className="card about-bio-card">
            <h3>Turning Ideas into Modern Web &amp; AI Products</h3>
            <p className="about-paragraph">
              I&apos;m a B.Tech Computer Science student specializing in <strong>Artificial Intelligence &amp; Data Science</strong> at <strong>SISTEC Gandhinagar, Bhopal</strong>.
            </p>
            <p className="about-paragraph">
              I specialize in building responsive, modern frontend interfaces with <strong>React.js</strong> and exploring the integration of <strong>AI capabilities</strong> into real-world applications — from voice cloning fraud prevention to civic tech reporting platforms.
            </p>
            <p className="about-paragraph">
              Passionate about competitive problem-solving, I actively participate in hackathons (including at prestigious institutions like <strong>IIT Delhi</strong>), transforming conceptual ideas into clean, functional, and user-centric software.
            </p>

            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-num">4+</span>
                <span className="stat-label">Featured Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">IITD</span>
                <span className="stat-label">Hackathon Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">10+</span>
                <span className="stat-label">Tech Stack Tools</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16} className="card education-card">
            <div className="edu-header">
              <span className="edu-icon">🎓</span>
              <div>
                <p className="label">Current Education</p>
                <h4>Bachelor of Technology (B.Tech)</h4>
              </div>
            </div>
            <p className="edu-spec">Computer Science and Engineering (AI &amp; Data Science)</p>
            <p className="muted">Sagar Institute of Science &amp; Technology (SISTEC), Gandhinagar, Bhopal</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" eyebrow="Technical Arsenal" title="Skills &amp; Technologies">
      <div className="skills-grid">
        {skills.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.09} className="card skill-group-card">
            <div className="skill-group-head">
              <h3>{g.title}</h3>
              {g.desc && <p className="muted small">{g.desc}</p>}
            </div>
            <ul className="skill-badges">
              {g.items.map((item) => {
                const isObj = typeof item === "object";
                const name = isObj ? item.name : item;
                const icon = isObj ? item.icon : null;
                return (
                  <li key={name} className="skill-pill">
                    {icon && <img src={icon} alt="" className="skill-icon" aria-hidden="true" />}
                    <span>{name}</span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
