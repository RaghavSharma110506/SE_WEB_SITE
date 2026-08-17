const versions = [
  {
    version: "Planning V1",
    date: "To be added",
    authors: "StepUp Team",
    changes: "Initial planning submission.",
    commit: "To be linked",
    deployment: "To be linked",
  },
];

function Versions({ navigate }) {
  return (
    <section className="document-page">

      <div className="container">

        <span className="eyebrow">
          PROJECT HISTORY
        </span>

        <h1>Version Management</h1>

        <p className="document-description">
          Every published version remains accessible.
          Version records show what changed, when it
          changed, who published it and the related
          development history.
        </p>

        <div className="version-list">

          {versions.map((item, index) => (

            <div
              className="version-card"
              key={item.version}
            >

              <div className="version-number">
                V{index + 1}
              </div>

              <div>

                <h2>
                  {item.version}
                </h2>

                <p>
                  {item.changes}
                </p>

                <div className="version-details">

                  <span>
                    Date: {item.date}
                  </span>

                  <span>
                    Authors: {item.authors}
                  </span>

                  <span>
                    Commit: {item.commit}
                  </span>

                  <span>
                    Deployment: {item.deployment}
                  </span>

                </div>

              </div>

            </div>

          ))}

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

export default Versions;