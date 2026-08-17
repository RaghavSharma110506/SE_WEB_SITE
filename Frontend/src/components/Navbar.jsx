import { useState } from "react";

function Navbar({ page, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (target) => {
    navigate(target);
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">

        <button className="brand" onClick={() => goTo("home")}>
          <span className="brand-mark">S</span>

          <span className="brand-text">
            <strong>STEP</strong>
            <span>UP</span>
          </span>
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <button
            className={page === "home" ? "nav-link active" : "nav-link"}
            onClick={() => goTo("home")}
          >
            Home
          </button>

          <button
            className={
              page === "softwaregrid" ? "nav-link active" : "nav-link"
            }
            onClick={() => goTo("softwaregrid")}
          >
            Software Grid
          </button>

          <a href="#team" className="nav-link" onClick={() => setMenuOpen(false)}>
            Team
          </a>

          <a
            href="#deliverables"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Deliverables
          </a>
        </nav>

        <button className="admin-button">
          <span className="status-dot"></span>
          Instructor
        </button>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
}

export default Navbar;