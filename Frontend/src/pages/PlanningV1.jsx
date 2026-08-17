function PlanningV1({ navigate }) {
  return (
    <section className="document-page">

      <div className="container">

        <span className="eyebrow">
          PLANNING / VERSION 1
        </span>

        <h1>Planning V1</h1>

        <p className="document-description">
          The original Planning V1 presentation for the
          team project.
        </p>

        <div className="document-card">

          <div className="file-icon">
            V1
          </div>

          <div>
            <h3>
              Planning V1 Presentation
            </h3>

            <p>
              This version remains permanently accessible
              even if a later Planning V2 is published.
            </p>
          </div>

          <button className="secondary-button">
            View Presentation
          </button>

        </div>

        <div className="metadata-grid">

          <div>
            <span>VERSION</span>
            <strong>1.0</strong>
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
            <span>DEPLOYMENT</span>
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

export default PlanningV1;