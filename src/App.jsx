import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BracketsCurly,
  Check,
  CircleNotch,
  Database,
  GithubLogo,
  List,
  MagnifyingGlass,
  Play,
  Stack,
  X,
} from "@phosphor-icons/react";
import "@fontsource/bebas-neue";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";

const layers = [
  { number: "01", label: "Routes", note: "Nine product routes with nested detail views.", color: "purple", items: ["/discover", "/search", "/community", "/watchlist", "/title/:id"] },
  { number: "02", label: "States", note: "Every screen accounts for what can go wrong.", color: "coral", items: ["Loading", "Empty", "Error", "Ready"] },
  { number: "03", label: "API + data", note: "Server state stays separate from interface state.", color: "lime", items: ["Client", "Query", "Transform", "Cache"] },
  { number: "04", label: "Shared state", note: "Auth, watchlist and player stay in sync.", color: "purple", items: ["Auth", "Watchlist", "UI", "Player"] },
  { number: "05", label: "Persistence", note: "Useful choices survive refresh and return visits.", color: "coral", items: ["Local storage", "Query cache", "Session"] },
  { number: "06", label: "Testing", note: "Confidence from component logic to real journeys.", color: "blue", items: ["Vitest", "Testing Library", "Playwright"] },
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function TrailerDashboard() {
  return (
    <div className="dashboard" aria-label="Trailer Park interface preview">
      <aside className="dash-sidebar">
        <strong>TRAILER<br />PARK</strong>
        <div className="dash-links">
          <span className="active"><Stack size={14} /> Overview</span>
          <span><MagnifyingGlass size={14} /> Discover</span>
          <span>Search</span>
          <span>Community</span>
          <span>Watchlist</span>
        </div>
        <small>Settings</small>
      </aside>
      <div className="dash-main">
        <header><span>Overview</span><span className="avatar">DI</span></header>
        <h3>Welcome back, David.</h3>
        <p>Here’s what’s happening in your park.</p>
        <div className="feature-card">
          <img src="/assets/trailer-park-hero.png" alt="Fictional science-fiction landscape" />
          <div className="feature-copy">
            <small>CONTINUE WATCHING</small>
            <strong>Beyond the quiet planet</strong>
            <span className="resume-chip" aria-hidden="true"><Play weight="fill" size={16} /> Resume</span>
          </div>
        </div>
        <div className="mini-row" aria-hidden="true">
          <span>SCI-FI</span><span>THRILLER</span><span>DOCUMENTARY</span>
        </div>
      </div>
    </div>
  );
}

function LayerRow({ layer, index }) {
  return (
    <article className={`layer-row color-${layer.color}`} style={{ "--delay": `${index * 60}ms` }} data-reveal>
      <div className="layer-meta">
        <small>{layer.number}</small>
        <h4>{layer.label}</h4>
        <p>{layer.note}</p>
      </div>
      <div className="layer-track">
        {layer.items.map((item) => <span key={item}>{item}</span>)}
      </div>
    </article>
  );
}

function CaseReveal() {
  const [mode, setMode] = useState("front");
  const [split, setSplit] = useState(56);
  const [isDragging, setIsDragging] = useState(false);
  const stage = useRef(null);
  const dragging = useRef(false);

  const updateSplitFromPointer = (event) => {
    if (!stage.current) return;
    const rect = stage.current.getBoundingClientRect();
    setSplit(Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100)));
  };

  const startSplit = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    setMode("front");
    dragging.current = true;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updateSplitFromPointer(event);
  };

  const moveSplit = (event) => {
    if (!dragging.current) return;
    updateSplitFromPointer(event);
  };

  const stopSplit = (event) => {
    if (!dragging.current) return;
    dragging.current = false;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className={`case-reveal mode-${mode} ${isDragging ? "is-dragging" : ""}`}>
      <div className="case-toolbar">
        <div className="segmented" aria-label="Case study layer">
          <button type="button" className={mode === "front" ? "selected" : ""} onClick={() => setMode("front")}>FRONT</button>
          <button type="button" className={mode === "behind" ? "selected" : ""} onClick={() => setMode("behind")}>BEHIND</button>
        </div>
        <p>{mode === "front" ? "The interface people experience." : "The product system that makes it hold."}</p>
      </div>
      <div
        className="split-stage"
        ref={stage}
        onPointerDown={startSplit}
        onPointerMove={moveSplit}
        onPointerUp={stopSplit}
        onPointerCancel={stopSplit}
      >
        <div className="behind-sheet">
          <div className="sheet-title"><span>BEHIND</span><small>THE THINKING / THE BUILD</small></div>
          <div className="blueprint-flow">
            <span>DISCOVER</span><ArrowRight size={18} /><span>DECIDE</span><ArrowRight size={18} /><span>ENGAGE</span><ArrowRight size={18} /><span>RETURN</span>
          </div>
          <div className="blueprint-grid">
            <section><small>ROUTING</small><strong>Feature-first navigation</strong><p>Layouts and route groups mirror how the product is used.</p></section>
            <section><small>SERVER STATE</small><strong>TanStack Query</strong><p>Fetching, caching and error recovery live in one predictable layer.</p></section>
            <section><small>UI STATE</small><strong>React Context</strong><p>Only genuinely shared state leaves the component boundary.</p></section>
            <section><small>QUALITY</small><strong>Test the journey</strong><p>Critical paths are verified from component behavior through browser flows.</p></section>
          </div>
        </div>
        <div className="front-sheet" style={{ clipPath: mode === "front" ? `inset(0 ${100 - split}% 0 0)` : "inset(0 100% 0 0)" }}>
          <div className="front-label"><span>FRONT</span><small>THE EXPERIENCE</small></div>
          <TrailerDashboard />
        </div>
        <input
          className="split-control"
          type="range"
          min="0"
          max="100"
          value={mode === "front" ? split : 0}
          aria-label="Reveal front and behind layers"
          onChange={(event) => { setMode("front"); setSplit(Number(event.target.value)); }}
          onInput={(event) => { setMode("front"); setSplit(Number(event.currentTarget.value)); }}
          style={{ left: `${mode === "front" ? split : 0}%` }}
        />
        <div className="split-line" style={{ left: `${mode === "front" ? split : 0}%` }} aria-hidden="true"><span>DRAG</span></div>
      </div>
    </div>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(0);
  useReveal();

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <div className="scroll-progress" style={{ width: `${scroll}%` }} />
      <aside className="folio" aria-label="Case index">
        <a className="monogram" href="#top">DI</a>
        <span>CASE INDEX</span>
        <a href="#trailer"><strong>01</strong><small>TRAILER PARK</small></a>
        <a href="#other-work"><strong>02</strong><small>OTHER WORK</small></a>
        <a href="#contact"><strong>03</strong><small>CONTACT</small></a>
        <span className="folio-location">ABUJA / NIGERIA</span>
      </aside>

      <header className="topbar" id="top">
        <a className="brand" href="#top"><b>DAVID IMAFIDON</b><small>FRONTEND ENGINEER</small></a>
        <nav>
          <a href="#trailer">Work</a><a href="#about">About</a><a href="#contact">Contact</a>
        </nav>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? <X size={22} /> : <List size={22} />}</button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="#trailer" onClick={closeMenu}>01 — Work</a><a href="#about" onClick={closeMenu}>02 — About</a><a href="#contact" onClick={closeMenu}>03 — Contact</a>
      </div>

      <section className="hero">
        <div className="hero-kicker"><span className="status-dot" /> AVAILABLE FOR THE RIGHT TEAM <span>ABUJA · REMOTE</span></div>
        <h1 aria-label="David Imafidon"><span>DAVID</span><span>IMAFIDON</span></h1>
        <div className="hero-bottom">
          <p>I build the surface—and the product systems that make every click hold up.</p>
          <a className="primary-link" href="mailto:imafidondavid1@gmail.com">LET’S WORK TOGETHER <ArrowUpRight size={18} /></a>
          <div className="manifesto">THE INTERFACE<br />IS THE FRONT<br />OF HOUSE.</div>
        </div>
        <a className="scroll-cue" href="#trailer">OPEN CASE FILE <ArrowDown size={18} /></a>
      </section>

      <section className="intro-strip" id="about">
        <span>THE SURFACE</span><p>is only where the product introduces itself.</p><span>THE DEPTH</span><p>is what happens after people click.</p>
      </section>

      <section className="case-study" id="trailer">
        <div className="case-heading" data-reveal>
          <div><small>CASE FILE — 01 / 2026</small><h2>TRAILER PARK</h2></div>
          <p>A media discovery dashboard expanded from one supplied screen into a complete, responsive product experience.</p>
        </div>
        <div className="case-tags" data-reveal><span>REACT</span><span>TYPESCRIPT</span><span>TANSTACK QUERY</span><span>TAILWIND</span><a href="https://github.com/Davemafy/trailer-park" target="_blank" rel="noreferrer">VIEW REPOSITORY <GithubLogo size={15} /></a></div>
        <CaseReveal />

        <div className="question-band" data-reveal><small>NEXT LAYER</small><h3>WHAT HAPPENS NEXT?</h3><p>Not a feature list. A product model—from first route to returning user.</p></div>

        <div className="layers">
          {layers.map((layer, index) => <LayerRow key={layer.label} layer={layer} index={index} />)}
        </div>

        <div className="decision-block" data-reveal>
          <div><small>THE DECISION THAT CHANGED THE BUILD</small><h3>Stop treating screens as pages.</h3></div>
          <p>The breakthrough was modeling Trailer Park as a set of repeatable product states. Search, discovery, details, watchlist and community could then share patterns without sharing assumptions.</p>
          <ul><li><Check size={17} /> Feature-first structure</li><li><Check size={17} /> Consistent async states</li><li><Check size={17} /> Responsive behavior by intent</li></ul>
        </div>
      </section>

      <section className="other-work" id="other-work">
        <div className="section-label"><small>SELECTED WORK / SUPPORTING FILES</small><span>02—03</span></div>
        <a className="project-row ember" href="https://embersage.vercel.app/" target="_blank" rel="noreferrer" aria-label="Open the Ember and Sage restaurant experience" data-reveal>
          <div className="project-copy"><small>CASE FILE — 02</small><h2>EMBER<br />& SAGE</h2><p>Restaurant discovery that moves from atmosphere to menu to reservation without losing its calm.</p><span>PRODUCT UI · RESPONSIVE DESIGN</span></div>
          <img src="/assets/ember-sage-dish.png" alt="Premium plated dish in a dark restaurant setting" />
          <ArrowUpRight className="row-arrow" size={28} />
        </a>
        <a className="project-row brillo" href="https://trybrillo.vercel.app" target="_blank" rel="noreferrer" aria-label="Open the Brillo learning workspace" data-reveal>
          <div className="project-copy"><small>CASE FILE — 03</small><h2>BRILLO</h2><p>A product build focused on reliable auth, persistent data, subtitles and accessible performance.</p><span>REACT · SUPABASE · ACCESSIBILITY</span></div>
          <div className="brillo-window" aria-label="Brillo product interface preview">
            <div className="window-top"><i /><i /><i /><span>BRILLO / WORKSPACE</span></div>
            <div className="window-body"><aside><b>B</b><span>Today</span><span>Notes</span><span>Tasks</span></aside><section><small>WELCOME BACK</small><h4>Make today count.</h4><div className="task"><CircleNotch size={16} /> Finish case study notes</div><div className="task done"><Check size={16} /> Review component tests</div><div className="task"><BracketsCurly size={16} /> Ship the next build</div></section></div>
          </div>
          <ArrowUpRight className="row-arrow" size={28} />
        </a>
      </section>

      <section className="contact" id="contact">
        <div data-reveal><small>FINAL PAGE / GET IN TOUCH</small><h2>LET’S MAKE<br />SOMETHING<br />WORTH USING.</h2></div>
        <div className="contact-details" data-reveal>
          <p><small>EMAIL</small><a href="mailto:imafidondavid1@gmail.com">imafidondavid1@gmail.com</a></p>
          <p><small>LOCATION</small>Abuja, Nigeria<br />Available remotely</p>
          <p><small>PROOF</small><a href="https://github.com/Davemafy" target="_blank" rel="noreferrer">github.com/Davemafy <ArrowUpRight size={15} /></a></p>
        </div>
        <a className="contact-stamp" href="mailto:imafidondavid1@gmail.com"><span>FRONTEND ENGINEER</span><b>DAVID IMAFIDON</b><ArrowRight size={26} /></a>
      </section>
      <footer><span>THANK YOU FOR READING.</span><span>BUILT WITH CARE FOR REAL PEOPLE.</span><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}
