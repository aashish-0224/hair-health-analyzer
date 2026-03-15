import { useState } from "react";
import axios from "axios";

function Analyzer() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!image) {
      alert("Upload an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.post(
      "http://127.0.0.1:8000/analyze",
      formData
    );

    setResult(response.data);
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        background: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", paddingTop: "40px" }}>
        Hair Health Analyzer
      </h1>

      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <input type="file" onChange={handleImageUpload} />

          <br />
          <br />

          <button
            onClick={handleAnalyze}
            style={{
              padding: "10px 20px",
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Analyze Hair
          </button>
        </div>

        <br />

        {image && (
          <div style={{ textAlign: "center" }}>
            <h3>Uploaded Image</h3>
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              width="250"
            />
          </div>
        )}

        {result && (
          <div
            style={{
              marginTop: "24px",
              display: "flex",
              gap: "24px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {/* Left: numeric cards */}
            <div
              style={{
                minWidth: "260px",
                padding: "18px 20px",
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, #eff6ff 0%, #e0f2fe 45%, #ecfdf3 100%)",
                boxShadow: "0 14px 35px rgba(15,23,42,0.18)",
                border: "1px solid rgba(148,163,184,0.5)",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#64748b",
                  marginBottom: "10px",
                  fontWeight: 600,
                }}
              >
                Hair metrics
              </div>

              <div style={{ marginBottom: "12px" }}>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>
                  Hair density score
                </div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    marginTop: "2px",
                  }}
                >
                  {result.hair_density_score}
                </div>
              </div>

              <div style={{ marginBottom: "10px" }}>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>
                  Hairfall level
                </div>
                <div
                  style={{
                    marginTop: "4px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "4px 10px",
                    borderRadius: "999px",
                    background:
                      result.hairfall_level === "High"
                        ? "rgba(248,113,113,0.12)"
                        : result.hairfall_level === "Medium"
                        ? "rgba(250,204,21,0.16)"
                        : "rgba(22,163,74,0.12)",
                    color:
                      result.hairfall_level === "High"
                        ? "#b91c1c"
                        : result.hairfall_level === "Medium"
                        ? "#854d0e"
                        : "#166534",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "999px",
                      background:
                        result.hairfall_level === "High"
                          ? "#ef4444"
                          : result.hairfall_level === "Medium"
                          ? "#eab308"
                          : "#22c55e",
                    }}
                  />
                  {result.hairfall_level} hairfall
                </div>
              </div>

              <div>
                <div style={{ fontSize: "13px", color: "#6b7280" }}>
                  Hair health
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    marginTop: "2px",
                    color: "#0f766e",
                  }}
                >
                  {result.hair_health}
                </div>
              </div>
            </div>

            {/* Right: recommendation */}
            <div
              style={{
                minWidth: "260px",
                flex: "1 1 260px",
                padding: "18px 20px",
                borderRadius: "12px",
                background: "#f9fafb",
                border: "1px solid rgba(148,163,184,0.6)",
                boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#6b7280",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                Recommendation
              </div>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "#374151",
                  margin: 0,
                }}
              >
                {result.recommendation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Analyzer;