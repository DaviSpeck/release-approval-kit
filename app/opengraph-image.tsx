import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "56px",
          background: "linear-gradient(135deg, #08101c 0%, #12263f 55%, #1d4f91 100%)",
          color: "#f7fbff",
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(247, 251, 255, 0.18)",
            borderRadius: "28px",
            padding: "42px",
            background: "rgba(8, 16, 28, 0.34)"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "28px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#9ec5ff"
              }}
            >
              NEXO
            </div>
            <div style={{ display: "flex", fontSize: "64px", lineHeight: 1.05, fontWeight: 700 }}>
              Automated Markdown-to-PDF for engineering teams
            </div>
            <div style={{ display: "flex", fontSize: "28px", lineHeight: 1.35, color: "#d5e7ff" }}>
              Convert Markdown into branded, corporate-ready PDFs with an API and web UI.
            </div>
          </div>
          <div style={{ display: "flex", gap: "16px", fontSize: "24px", color: "#d9ebff" }}>
            <div>Markdown</div>
            <div>{">"}</div>
            <div>NEXO</div>
            <div>{">"}</div>
            <div>Corporate PDF</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
