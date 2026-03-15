import { useState } from "react";
import Login from "./Login";
import Analyzer from "./Analyzer";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="app-root">
      <div className="app-shell">
        <section className="app-hero">
          <span className="app-badge">
            <span>AI-powered insights</span>
          </span>
          <h1 className="app-title">
            Understand your <span className="app-highlight">hair health</span>{" "}
            in seconds.
          </h1>
          <p className="app-subtitle">
            Upload a scalp image and get an instant, visual analysis of your
            hair density with personalized care recommendations.
          </p>
          <div className="app-hero-metrics">
            <div className="metric-pill">
              <div className="metric-label">Analysis time</div>
              <div className="metric-value">&lt; 5 seconds</div>
            </div>
            <div className="metric-pill">
              <div className="metric-label">Best for</div>
              <div className="metric-value">Daily self-checks</div>
            </div>
          </div>
        </section>

        {loggedIn ? <Analyzer /> : <Login setLoggedIn={setLoggedIn} />}
      </div>
    </div>
  );
}

export default App;