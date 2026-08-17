function PlanningV2({ navigate }) {
  return (
    <section className="document-page">

      <div className="container">

        <span className="eyebrow">
          PLANNING / VERSION 2
        </span>

        <h1>Planning V2</h1>

        <p className="document-description">
          This page is reserved for a revised Planning
          presentation if the project plan changes.
        </p>

        <div className="document-card">

          <div className="file-icon">
            V2
          </div>

          <div>
            <h3>
              Planning V2 Presentation
            </h3>

            <p>
              Planning V2 will be published as a new page
              without replacing Planning V1.
            </p>
          </div>

          <button className="secondary-button">
            View Presentation
          </button>

        </div>

        <div className="changes-card">

          <h3>What changed?</h3>

          <p>
            Changes will be recorded here when Planning V2
            is actually published.
          </p>

        </div>

        <div className="metadata-grid">

          <div>
            <span>VERSION</span>
            <strong>2.0</strong>
          </div>

          <div>
            <span>DATE</span>
            <strong>To be added</strong>
          </div>

          <div>
            <span>AUTHORS</span>
            <strong>StepUp Team</strong>
          </div>

          <div>
            <span>COMMIT</span>
            <strong>To be linked</strong>
          </div>

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

export default PlanningV2;