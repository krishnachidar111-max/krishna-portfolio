import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile, nav } from "../data.js";
import { Icon, Socials } from "./ui.jsx";

export const Loader = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        className="loader"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        role="status"
        aria-label="Loading"
      >
        <div className="loader-mark">KC</div>
        <div className="loader-bar">
          <span />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const trail = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setOn(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let trailX = mouseX;
    let trailY = mouseY;
    let raf;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const over = (e) => {
      const isInteractive = !!e.target.closest("a, button, input, textarea, .card, .cert-img-container, .dot-pill");
      ring.current?.classList.toggle("hot", isInteractive);
    };

    const down = () => {
      ring.current?.classList.add("click");
    };

    const up = () => {
      ring.current?.classList.remove("click");
    };

    const loop = () => {
      // Smooth dual-layer spring interpolation
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;

      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      if (trail.current) {
        trail.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
      }

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!on) return null;

  return (
    <>
      <div ref={trail} className="cursor-trail" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const f = () => setSolid(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header className={`nav ${solid ? "solid" : ""}`}>
      <a href="#top" className="logo" aria-label="Krishna Chidar, home">
        KC<span>.</span>
      </a>
      <button
        className="burger"
        aria-expanded={open}
        aria-controls="menu"
        aria-label="Toggle menu"
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
      <nav id="menu" className={open ? "open" : ""} aria-label="Primary">
        {nav.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <p>Designed &amp; Built with Passion by Krishna Chidar</p>
      <Socials profile={profile} />
      <motion.a
        href="#top"
        className="icon-btn to-top"
        aria-label="Back to top"
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
      >
        <Icon name="up" />
      </motion.a>
    </footer>
  );
}
