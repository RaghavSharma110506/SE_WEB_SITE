function LaterWork({ navigate }) {
  return (
    <section className="document-page">

      <div className="container">

        <span className="eyebrow">
          DELIVERABLE / LATER WORK
        </span>

        <h1>Later Work</h1>

        <p className="document-description">
          Future presentations and deliverables will be
          published here as separate pages or records.
        </p>

        <div className="empty-work">

          <div className="file-icon">
            +
          </div>

          <h3>
            Future deliverables
          </h3>

          <p>
            New work will be added here throughout the
            semester without removing previous versions.
          </p>

        </div>

        <button
          className="back-button"
          onClick={() => navigate("home")}
        >
          ← Back to Home
        </button>

      </div>

    </section>
  );
}

export default LaterWork;