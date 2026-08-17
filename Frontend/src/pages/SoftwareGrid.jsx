function SoftwareGrid({ navigate }) {
  const technologies = [
    {
      category: "Frontend",
      items: ["React", "Vite", "JavaScript", "HTML5", "CSS3"],
    },
    {
      category: "Backend",
      items: ["API Layer", "Authentication", "File Upload", "Metadata"],
    },
    {
      category: "Database",
      items: ["MySQL", "Aiven", "SQL"],
    },
    {
      category: "Development",
      items: ["VS Code", "Git", "GitHub", "Deployment"],
    },
  ];

  return (
    <div className="inner-page">

      <section className="inner-hero">

        <span className="section-label">01 / SOFTWARE GRID</span>

        <h1>
          Tools that
          <br />
          <span>power StepUp.</span>
        </h1>

        <p>
          A central overview of the technologies and development
          resources being used by the team.
        </p>

        <button
          className="secondary-button"
          onClick={() => navigate("home")}
        >
          ← Back to Home
        </button>

      </section>

      <section className="software-grid-section">

        <div className="software-grid">

          {technologies.map((tech, index) => (

            <div className="software-card" key={tech.category}>

              <div className="software-card-top">

                <span className="software-number">
                  0{index + 1}
                </span>

                <span className="software-arrow">↗</span>

              </div>

              <h2>{tech.category}</h2>

              <div className="tech-list">

                {tech.items.map((item) => (
                  <span key={item} className="tech-pill">
                    {item}
                  </span>
                ))}

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default SoftwareGrid;