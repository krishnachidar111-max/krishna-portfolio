import { useEffect, useState } from "react";
import { Loader, Cursor, Nav, Footer } from "./components/Chrome.jsx";
import Hero from "./components/Hero.jsx";
import { About, Skills } from "./components/AboutSkills.jsx";
import Projects from "./components/Projects.jsx";
import Certifications from "./components/Certifications.jsx";
import { Journey } from "./components/Journey.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Loader show={!ready} />
      <Cursor />
      <div className="bg-grid" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
