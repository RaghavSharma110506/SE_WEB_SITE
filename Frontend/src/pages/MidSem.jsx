function MidSem({ navigate }) {
  return (
    <section className="document-page">

      <div className="container">

        <span className="eyebrow">
          DELIVERABLE / MID-SEM
        </span>

        <h1>Mid-Sem Presentation</h1>

        <p className="document-description">
          The team's mid-semester presentation and associated
          project work.
        </p>

        <div className="document-card">

          <div className="file-icon">
            PPT
          </div>

          <div>
            <h3>
              Mid-Sem Presentation
            </h3>

            <p>
              The presentation will be published here when
              available.
            </p>
          </div>

          <button className="secondary-button">
            View Presentation
          </button>

        </div>

        <div className="metadata-grid">

          <div>
            <span>VERSION</span>
            <strong>V1</strong>
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

export default MidSem;