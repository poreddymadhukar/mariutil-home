import { useState } from "react";
import {
  ArrowUpRight,
  Braces,
  CodeXml,
  GitFork,
  Menu,
  MonitorUp,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Feedback from "./components/Feedback";

type Tool = {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: string;
};

const tools: Tool[] = [
  {
    name: "JSON Formatter",
    description:
      "Format, validate, and minify JSON online. Your data stays in your browser.",
    href: "https://json.mariutil.com/",
    icon: Braces,
    accent: "blue",
  },
  {
    name: "XML to JSON",
    description:
      "Convert XML to JSON online directly in your browser. Fast, private, and easy to use.",
    href: "https://xml2json.mariutil.com/",
    icon: CodeXml,
    accent: "teal",
  },
  {
    name: "Screen Recorder",
    description:
      "Record your screen online without installing software. Record directly in your browser.",
    href: "https://screen.mariutil.com/",
    icon: MonitorUp,
    accent: "coral",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <nav className="nav-wrap" aria-label="Main navigation">
          <a className="brand" href="/" aria-label="Mariutil home">
            <span className="brand-mark" aria-hidden="true">
              m
            </span>
            <span>Mariutil</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            <a href="#tools" onClick={closeMenu}>
              Tools
            </a>
            <a href="#about" onClick={closeMenu}>
              About
            </a>
            <a href="#blog" onClick={closeMenu}>
              Blog
            </a>
            <a
              className="github-link"
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              <GitFork size={17} aria-hidden="true" /> GitHub
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">
            <Sparkles size={15} aria-hidden="true" /> Browser-first utilities
          </p>
          <h1 id="page-title">
            Free online tools for developers and everyday work.
          </h1>
          <p className="intro-copy">
            Format JSON, convert XML to JSON, record your screen, and use more
            lightweight browser-based utilities. No signup required.
          </p>
          <a className="browse-link" href="#tools">
            Explore tools <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </section>

        <section
          className="tools-section"
          id="tools"
          aria-labelledby="tools-title"
        >
          <div className="section-heading">
            <p className="section-label">Toolbox</p>
            <h2 id="tools-title">Get straight to the useful part.</h2>
          </div>
          <div className="tool-grid">
            {tools.map(({ name, description, href, icon: Icon, accent }) => (
              <a
                className="tool-card"
                href={href}
                key={name}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${name}`}
              >
                <div className={`tool-icon ${accent}`}>
                  <Icon size={27} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3>{name}</h3>
                <p>{description}</p>
                <span className="open-tool">
                  Open Tool <ArrowUpRight size={17} aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="benefits" aria-label="Mariutil benefits">
          <div>
            <ShieldCheck size={21} aria-hidden="true" />
            <span>
              <strong>Runs locally</strong>Your data remains yours
            </span>
          </div>
          <div>
            <Zap size={21} aria-hidden="true" />
            <span>
              <strong>No installation</strong>Open and get to work
            </span>
          </div>
          <div>
            <MonitorUp size={21} aria-hidden="true" />
            <span>
              <strong>Any device</strong>Built for the modern browser
            </span>
          </div>
          <div>
            <Braces size={21} aria-hidden="true" />
            <span>
              <strong>Developer-minded</strong>Made for useful daily tasks
            </span>
          </div>
        </section>

        <section
          className="about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <p className="section-label">About Mariutil</p>
          <h2 id="about-title">Useful utilities, without the busywork.</h2>
          <p>
            We build focused browser tools that respect your time and privacy.
            No account walls, no software to manage, just dependable help when
            you need it.
          </p>
        </section>

        <section
          className="blog-section"
          id="blog"
          aria-labelledby="blog-title"
        >
          <div>
            <p className="section-label">Notes &amp; updates</p>
            <h2 id="blog-title">Useful reading is on the way.</h2>
          </div>
          <p>
            We are collecting practical notes on browser privacy, focused
            workflows, and the small details that make everyday tools better.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden="true">
            m
          </span>
          <span>Mariutil</span>
        </div>
        <p>Simple tools. Less friction.</p>
        <div className="footer-links" aria-label="Footer navigation">
          <a href="#about">About</a>
          <a href="#blog">Blog</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="mailto:hello@mariutil.com">Contact</a>
          <Feedback />
        </div>
        <small>Copyright {new Date().getFullYear()} Mariutil.</small>
      </footer>
    </div>
  );
}

export default App;
