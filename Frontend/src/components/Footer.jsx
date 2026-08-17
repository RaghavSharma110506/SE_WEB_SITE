function Footer({ navigate }) {
  return (
    <footer className="footer">

      <div className="footer-glow"></div>

      <div className="footer-content">

        <div className="footer-brand">
          <button className="brand footer-logo" onClick={() => navigate("home")}>
            <span className="brand-mark">S</span>

            <span className="brand-text">
              <strong>STEP</strong>
              <span>UP</span>
            </span>
          </button>

          <p>
            A student project focused on making physical activity
            more engaging through technology.
          </p>
        </div>

        <div className="footer-column">
          <h4>Project</h4>
          <button onClick={() => navigate("home")}>Home</button>
          <button onClick={() => navigate("softwaregrid")}>
            Software Grid
          </button>
          <a href="#team">Team</a>
        </div>

        <div className="footer-column">
          <h4>Team</h4>
          <span>Disha Goyal</span>
          <span>Raghav Sharma</span>
          <span>Kashish Singhal</span>
          <span>Anvi</span>
        </div>

        <div className="footer-column">
          <h4>Project Status</h4>
          <div className="footer-status">
            <span className="status-dot"></span>
            Currently in development
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <span>STEPUP • Team Project</span>
        <span>Built with React + Vite</span>
      </div>

    </footer>
  );
}

export default Footer;