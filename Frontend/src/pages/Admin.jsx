import { useState } from "react";

function Admin({ navigate }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    /*
      TEMPORARY FRONTEND STATE ONLY.

      This will later call:
      POST /api/auth/login

      The final system must use backend authentication.
    */

    if (username.trim() && password.trim()) {
      setLoggedIn(true);
    }
  };

  if (!loggedIn) {
    return (
      <section className="admin-page">

        <div className="container admin-container">

          <span className="eyebrow">
            INSTRUCTOR / ADMIN
          </span>

          <h1>
            Admin Login
          </h1>

          <p>
            Authorized users can upload and publish project
            deliverables.
          </p>

          <form
            className="login-form"
            onSubmit={handleLogin}
          >

            <label>
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Enter username"
            />

            <label>
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter password"
            />

            <button
              type="submit"
              className="primary-button"
            >
              Login →
            </button>

          </form>

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

  return (
    <section className="admin-page">

      <div className="container admin-container">

        <div className="admin-header">

          <div>
            <span className="eyebrow">
              INSTRUCTOR / ADMIN
            </span>

            <h1>
              Project Admin
            </h1>
          </div>

          <button
            className="secondary-button"
            onClick={() => setLoggedIn(false)}
          >
            Logout
          </button>

        </div>


        {/* UPLOAD */}

        <div className="upload-card">

          <span className="section-label">
            01 / UPLOAD
          </span>

          <h2>
            Upload deliverable
          </h2>

          <p>
            Drag and drop a file or folder. The final
            backend will process, validate and store the
            upload.
          </p>

          <div className="drop-zone">

            <div className="upload-icon">
              ↑
            </div>

            <h3>
              Drag & Drop
            </h3>

            <p>
              PPT, PDF, images or folders
            </p>

            <input
              type="file"
              multiple
            />

          </div>

        </div>


        {/* METADATA */}

        <div className="metadata-card">

          <span className="section-label">
            02 / METADATA
          </span>

          <h2>
            Version details
          </h2>

          <div className="admin-form-grid">

            <div>
              <label>
                Title
              </label>

              <input
                type="text"
                placeholder="Deliverable title"
              />
            </div>

            <div>
              <label>
                Deliverable Type
              </label>

              <select>
                <option>
                  Software Grid
                </option>

                <option>
                  Planning
                </option>

                <option>
                  Mid-Sem
                </option>

                <option>
                  Later Work
                </option>
              </select>
            </div>

            <div>
              <label>
                Version
              </label>

              <input
                type="text"
                placeholder="V1"
              />
            </div>

            <div>
              <label>
                Date
              </label>

              <input
                type="date"
              />
            </div>

            <div className="full-width">
              <label>
                Change Summary
              </label>

              <textarea
                placeholder="Describe what changed..."
              ></textarea>
            </div>

          </div>

        </div>


        {/* PUBLISH */}

        <div className="publish-card">

          <span className="section-label">
            03 / PUBLISH
          </span>

          <h2>
            Preview & Publish
          </h2>

          <p>
            The final implementation will connect this
            action to the backend publishing workflow.
          </p>

          <button className="primary-button">
            Publish Version →
          </button>

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

export default Admin;