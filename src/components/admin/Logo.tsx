import React from "react";

/** Full brand logo shown on the admin login screen. */
export const Logo = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "14px",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "48px",
          height: "48px",
          backgroundColor: "#f5a623",
          color: "#0a1120",
          fontWeight: 700,
          fontSize: "26px",
          fontFamily:
            "Oswald, ui-sans-serif, system-ui, -apple-system, sans-serif",
        }}
      >
        N
      </span>
      <span
        style={{
          fontFamily:
            "Oswald, ui-sans-serif, system-ui, -apple-system, sans-serif",
          fontSize: "24px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Natanem <span style={{ color: "#f5a623" }}>Engineering</span>
      </span>
    </div>
    <div
      style={{
        width: "180px",
        height: "6px",
        backgroundImage:
          "repeating-linear-gradient(-45deg, #f5a623 0 10px, #0a1120 10px 20px)",
      }}
    />
  </div>
);
