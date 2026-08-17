const team = [
  {
    initials: "DG",
    name: "Disha Goyal",
    id: "1024170144",
    role: "Team Member",
  },
  {
    initials: "RS",
    name: "Raghav Sharma",
    id: "1024170123",
    role: "Team Member",
  },
  {
    initials: "KS",
    name: "Kashish Singhal",
    id: "1024170076",
    role: "Team Member",
  },
  {
    initials: "AN",
    name: "Anvi",
    id: "1024170417",
    role: "Team Member",
  },
];

const deliverables = [
  {
    number: "01",
    title: "Software Grid",
    description:
      "Technology, software and development resources used by the team.",
    status: "Available",
  },
  {
    number: "02",
    title: "Planning V1",
    description:
      "Initial project planning, direction and proposed implementation.",
    status: "Upcoming",
  },
  {
    number: "03",
    title: "Planning V2",
    description:
      "Updated planning documentation when changes are introduced.",
    status: "Versioned",
  },
  {
    number: "04",
    title: "Mid-Sem Presentation",
    description:
      "Presentation documenting the project's progress and development.",
    status: "Upcoming",
  },
];

function Home({ navigate }) {
  return (
    <div className="home-page">

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-background-grid"></div>

        <div className="hero-orb hero-orb-one"></div>
        <div className="hero-orb hero-orb-two"></div>

        <div className="hero-content">

          <div className="eyebrow">
            <span className="pulse"></span>
            TEAM PROJECT • DEVELOPMENT IN PROGRESS
          </div>

          <h1>
            Make every
            <br />
            <span>step count.</span>
          </h1>

          <p className="hero-description">
            <strong>StepUp</strong> is a student project exploring how
            technology can make physical activity more engaging,
            measurable and motivating.
          </p>

          <div className="hero-actions">

            <button
              className="primary-button"
              onClick={() => navigate("softwaregrid")}
            >
              Explore Project
              <span>↗</span>
            </button>

            <a href="#team" className="secondary-button">
              Meet the Team
            </a>

          </div>

          <div className="hero-meta">

            <div>
              <strong>04</strong>
              <span>Team Members</span>
            </div>

            <div>
              <strong>01</strong>
              <span>Active Project</span>
            </div>

            <div>
              <strong>2026</strong>
              <span>Academic Year</span>
            </div>

          </div>

        </div>

        {/* VISUAL CARD */}

        <div className="hero-visual">

          <div className="dashboard-window">

            <div className="window-top">
              <div className="window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <span className="window-title">
                stepup / dashboard
              </span>
            </div>

            <div className="dashboard-body">

              <div className="dashboard-heading">
                <div>
                  <span>PROJECT OVERVIEW</span>
                  <h3>StepUp</h3>
                </div>

                <div className="live-badge">
                  <span></span>
                  LIVE
                </div>
              </div>

              <div className="progress-card">

                <div className="progress-header">
                  <span>Project Progress</span>
                  <strong>68%</strong>
                </div>

                <div className="progress-track">
                  <div className="progress-fill"></div>
                </div>

                <div className="progress-labels">
                  <span>Planning</span>
                  <span>Development</span>
                  <span>Deployment</span>
                </div>

              </div>

              <div className="mini-grid">

                <div className="mini-card">
                  <span className="mini-icon">↗</span>
                  <small>DELIVERABLES</small>
                  <strong>04</strong>
                </div>

                <div className="mini-card">
                  <span className="mini-icon">✓</span>
                  <small>STATUS</small>
                  <strong>Active</strong>
                </div>

              </div>

            </div>

          </div>

          <div className="floating-card floating-card-one">
            <span>PROJECT STATUS</span>
            <strong>On Track</strong>
          </div>

          <div className="floating-card floating-card-two">
            <span>TEAM</span>
            <strong>04 Members</strong>
          </div>

        </div>

      </section>

      {/* PROJECT */}

      <section className="project-section">

        <div className="section-heading">

          <div>
            <span className="section-label">01 / PROJECT</span>

            <h2>
              Built around
              <br />
              <span>a simple idea.</span>
            </h2>
          </div>

          <p>
            StepUp is being developed as a team project with the goal of
            combining technology, activity tracking and engaging
            experiences into one platform.
          </p>

        </div>

        <div className="feature-grid">

          <div className="feature-card feature-large">

            <div className="feature-number">01</div>

            <div className="feature-icon">◎</div>

            <h3>Track activity</h3>

            <p>
              Measure physical activity and turn movement into
              meaningful progress.
            </p>

            <div className="feature-line"></div>

          </div>

          <div className="feature-card">

            <div className="feature-number">02</div>

            <div className="feature-icon">✦</div>

            <h3>Stay motivated</h3>

            <p>
              Create an engaging experience that encourages users
              to stay active.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-number">03</div>

            <div className="feature-icon">↗</div>

            <h3>Build together</h3>

            <p>
              Develop the project collaboratively with documented
              versions and deliverables.
            </p>

          </div>

        </div>

      </section>

      {/* STATUS */}

      <section className="status-section">

        <div className="status-panel">

          <div className="status-left">

            <span className="section-label">CURRENT STATUS</span>

            <h2>
              Development
              <br />
              <span>in progress.</span>
            </h2>

            <p>
              The StepUp team is actively developing and documenting
              the project. New deliverables and versions will be
              published as the project progresses.
            </p>

          </div>

          <div className="status-right">

            <div className="status-circle">
              <span>ACTIVE</span>
              <strong>●</strong>
            </div>

            <div className="status-details">

              <div>
                <span>PROJECT</span>
                <strong>StepUp</strong>
              </div>

              <div>
                <span>TEAM</span>
                <strong>04 members</strong>
              </div>

              <div>
                <span>STATUS</span>
                <strong>In Development</strong>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* DELIVERABLES */}

      <section className="deliverables-section" id="deliverables">

        <div className="section-heading">

          <div>
            <span className="section-label">02 / WORK</span>

            <h2>
              Project
              <br />
              <span>deliverables.</span>
            </h2>
          </div>

          <p>
            All major project presentations and deliverables will be
            maintained here as the project evolves.
          </p>

        </div>

        <div className="deliverables-list">

          {deliverables.map((item) => (

            <div className="deliverable-row" key={item.number}>

              <span className="deliverable-number">
                {item.number}
              </span>

              <div className="deliverable-main">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>

              <div className="deliverable-status">
                <span></span>
                {item.status}
              </div>

              <button
                className="arrow-button"
                onClick={() =>
                  item.title === "Software Grid"
                    ? navigate("softwaregrid")
                    : null
                }
              >
                ↗
              </button>

            </div>

          ))}

        </div>

      </section>

      {/* TEAM */}

      <section className="team-section" id="team">

        <div className="section-heading team-heading">

          <div>
            <span className="section-label">03 / TEAM</span>

            <h2>
              The people
              <br />
              <span>behind StepUp.</span>
            </h2>
          </div>

          <p>
            Four team members working together to design, develop
            and document the StepUp project.
          </p>

        </div>

        <div className="team-grid">

          {team.map((member, index) => (

            <div className="team-card" key={member.id}>

              <div className="team-card-top">

                <span className="member-index">
                  0{index + 1}
                </span>

                <span className="member-role">
                  {member.role}
                </span>

              </div>

              <div className="avatar">
                {member.initials}
              </div>

              <h3>{member.name}</h3>

              <p>{member.id}</p>

              <div className="team-card-bottom">
                <span>TEAM MEMBER</span>
                <span>→</span>
              </div>

            </div>

          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="cta-section">

        <div className="cta-content">

          <span className="section-label">STEPUP / 2026</span>

          <h2>
            One project.
            <br />
            <span>Every step forward.</span>
          </h2>

          <button
            className="primary-button"
            onClick={() => navigate("softwaregrid")}
          >
            View Project Work
            <span>↗</span>
          </button>

        </div>

      </section>

    </div>
  );
}

export default Home;