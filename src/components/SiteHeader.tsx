import { useState } from "react";
import { Menu, X } from "lucide-react";

const mariutilUrl = "https://mariutil.com/";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="nav-wrap" aria-label="Main navigation">
        <a className="brand" href={mariutilUrl} aria-label="Mariutil home">
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
          <a href={`${mariutilUrl}#tools`} onClick={closeMenu}>
            Tools
          </a>
          <a href={`${mariutilUrl}#about`} onClick={closeMenu}>
            About
          </a>
          <a href={`${mariutilUrl}#blog`} onClick={closeMenu}>
            Blog
          </a>
          <a href={`${mariutilUrl}#privacy`} onClick={closeMenu}>
            Privacy
          </a>
          <a href="mailto:hello@mariutil.com" onClick={closeMenu}>
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
