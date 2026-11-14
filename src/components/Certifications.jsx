import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, Section, Icon } from "./ui.jsx";
import { certificates } from "../data.js";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 320 : -320,
    opacity: 0,
    scale: 0.92,
    rotateY: direction > 0 ? 12 : -12,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 320 : -320,
    opacity: 0,
    scale: 0.92,
    rotateY: direction < 0 ? 12 : -12,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function CertificateDisplay({ cert, onOpenModal }) {
  return (
    <article className="card cert-card active-carousel-card">
      {/* Certificate Image Frame */}
      <div className="cert-img-container" onClick={() => onOpenModal(cert)}>
        <img
          src={cert.image}
          alt={`${cert.title} Certificate`}
          loading="lazy"
          className="cert-img"
        />
        <div className="cert-img-overlay">
          <span className="zoom-btn">
            🔍 Click to Enlarge View
          </span>
        </div>
        <span className="cert-badge-tag">{cert.badge}</span>
      </div>

      {/* Certificate Content */}
      <div className="cert-body">
        <div className="cert-header">
          <div className="issuer-row">
            {cert.issuer === "Microsoft" ? (
              <span className="issuer-icon ms-icon" aria-hidden="true">
                <span className="ms-sq ms-red" />
                <span className="ms-sq ms-green" />
                <span className="ms-sq ms-blue" />
                <span className="ms-sq ms-yellow" />
              </span>
            ) : cert.issuer.includes("IIT") ? (
              <span className="issuer-icon gold-seal">🏛️</span>
            ) : cert.issuer.includes("Gameovibe") ? (
              <span className="issuer-icon neon-pad">🎮</span>
            ) : (
              <span className="issuer-icon">📜</span>
            )}
            <span className="cert-issuer">{cert.issuer}</span>
            {cert.verified && (
              <span className="verified-pill">
                <span className="v-check">✓</span> Verified Credential
              </span>
            )}
          </div>
          <h3>{cert.title}</h3>
          <p className="cert-signatory">Issued by: <strong>{cert.signatory}</strong></p>
        </div>

        <p className="muted cert-desc">{cert.desc}</p>

        <div className="cert-meta">
          <div>
            <span className="meta-lbl">Credential ID</span>
            <code>{cert.credentialId}</code>
          </div>
          <div>
            <span className="meta-lbl">Session / Year</span>
            <span>{cert.date}</span>
          </div>
        </div>

        <ul className="chips cert-skills">
          {cert.skills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <div className="cert-actions">
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn small primary"
            >
              Verify Credential <Icon name="arrow" />
            </a>
          )}
          {cert.pdf && (
            <a
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="btn small ghost"
            >
              View PDF <Icon name="download" />
            </a>
          )}
          <button
            onClick={() => onOpenModal(cert)}
            className="btn small ghost"
            type="button"
          >
            Full Preview
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Certifications() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [activeModal, setActiveModal] = useState(null);
  const [viewMode, setViewMode] = useState("carousel"); // 'carousel' | 'grid'
  const [isPaused, setIsPaused] = useState(false);

  const certIndex = ((page % certificates.length) + certificates.length) % certificates.length;
  const currentCert = certificates[certIndex];

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  // Autoplay for carousel when not hovered
  useEffect(() => {
    if (viewMode !== "carousel" || isPaused) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5500);
    return () => clearInterval(timer);
  }, [page, isPaused, viewMode]);

  return (
    <Section
      id="certifications"
      eyebrow="Credentials &amp; Achievements"
      title="Verified Certifications &amp; Accreditations"
    >
      {/* View Switcher Controls */}
      <div className="carousel-top-bar">
        <div className="carousel-count-badge">
          <span>{certIndex + 1}</span> of <span>{certificates.length}</span> Credentials
        </div>

        <div className="view-toggle-pills">
          <button
            className={`toggle-pill ${viewMode === "carousel" ? "active" : ""}`}
            onClick={() => setViewMode("carousel")}
            type="button"
          >
            🎠 Animated Carousel
          </button>
          <button
            className={`toggle-pill ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
            type="button"
          >
            ⊞ View All Grid
          </button>
        </div>
      </div>

      {viewMode === "carousel" ? (
        <div
          className="carousel-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Animated Card Frame */}
          <div className="carousel-viewport">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="carousel-slide"
              >
                <CertificateDisplay cert={currentCert} onOpenModal={setActiveModal} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="carousel-nav-controls">
            <button
              className="carousel-arrow prev-btn"
              onClick={() => paginate(-1)}
              aria-label="Previous certificate"
            >
              ←
            </button>

            {/* Pagination Dots */}
            <div className="carousel-dots">
              {certificates.map((c, i) => (
                <button
                  key={c.id}
                  className={`dot-pill ${i === certIndex ? "active" : ""}`}
                  onClick={() => setPage([i, i > certIndex ? 1 : -1])}
                  aria-label={`Go to ${c.title}`}
                >
                  <span className="dot-thumb" />
                  <span className="dot-label">{c.issuer.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            <button
              className="carousel-arrow next-btn"
              onClick={() => paginate(1)}
              aria-label="Next certificate"
            >
              →
            </button>
          </div>
        </div>
      ) : (
        <div className="certifications-grid">
          {certificates.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.08}>
              <CertificateDisplay cert={cert} onOpenModal={setActiveModal} />
            </Reveal>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              className="modal-dialog"
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <h4>{activeModal.title}</h4>
                  <p className="muted small">
                    {activeModal.issuer} • Credential ID: {activeModal.credentialId}
                  </p>
                </div>
                <button
                  className="modal-close"
                  onClick={() => setActiveModal(null)}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="modal-body">
                <img
                  src={activeModal.image}
                  alt={`${activeModal.title} full certificate`}
                  className="modal-img"
                />
              </div>

              <div className="modal-footer">
                {activeModal.verifyUrl && (
                  <a
                    href={activeModal.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn small primary"
                  >
                    Open Live Verification <Icon name="arrow" />
                  </a>
                )}
                {activeModal.pdf && (
                  <a
                    href={activeModal.pdf}
                    download
                    className="btn small ghost"
                  >
                    Download Certificate PDF <Icon name="download" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
