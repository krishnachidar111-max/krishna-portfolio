import { useRef } from "react";
import { motion } from "framer-motion";
import { profile } from "../data.js";
import { Icon, Socials } from "./ui.jsx";

const words = "Building Digital Experiences That Matter.".split(" ");

export default function Hero() {
  const ref = useRef(null);
  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="top" className="hero" ref={ref} onMouseMove={onMove}>
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-inner">
        <div>
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <span className="pulse-dot" />
            <span>Available for Internships &amp; Collaborations</span>
          </motion.div>

          <motion.p
            className="eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            Hi, I&apos;m Krishna Chidar.
          </motion.p>

          <h1 className="h1" aria-label="Building Digital Experiences That Matter.">
            {words.map((w, i) => (
              <motion.span
                key={i}
                className="word"
                aria-hidden="true"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.08, duration: 0.55 }}
              >
                {w}{" "}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1 }}
          >
            Frontend Developer <i>|</i> AI &amp; Data Science Undergrad <i>|</i> Creative Technologist
          </motion.p>

          <motion.div
            className="cta"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3 }}
          >
            <a className="btn primary" href="#projects">
              Explore Projects <Icon name="arrow" />
            </a>
            <a className="btn ghost" href="#about">
              About Me
            </a>
            <a className="btn ghost" href="#contact">
              Contact
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <Socials profile={profile} />
          </motion.div>
        </div>

        {/* Avatar Container with Floating Badges */}
        <motion.div
          className="hero-media-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
        >
          <div className="avatar-frame">
            <div className="avatar-glow-ring" />
            <div className="avatar">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt="Krishna Chidar at IIT Delhi"
                  width="400"
                  height="400"
                  fetchPriority="high"
                />
              ) : (
                <span aria-label="Krishna Chidar monogram">KC</span>
              )}
            </div>
          </div>

          {/* Floating Pill Badges */}
          <motion.div
            className="float-badge top-badge"
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
          >
            <span className="badge-icon">🏛️</span>
            <div>
              <strong>IIT Delhi</strong>
              <small>Hackathon &amp; Tech Visit</small>
            </div>
          </motion.div>

          <motion.div
            className="float-badge bottom-badge"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.5 }}
          >
            <span className="badge-icon">💻</span>
            <div>
              <strong>React &amp; AI Tech</strong>
              <small>Building Real-world Apps</small>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
