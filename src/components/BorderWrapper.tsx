import React from "react";

interface BorderWrapperProps {
  children: React.ReactNode;
  width?: string;
  padding?: string;
}

function BorderWrapper({
  children,
  width = "600px",
  padding = "10px 10px 0px 10px",
}: BorderWrapperProps) {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: padding,
        alignItems: "center",
        width: width,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        justifyContent: "space-between",
        height: "150px",
        backgroundColor: "white",
      }}
    >
      {children}
    </div>
  );
}

export default BorderWrapper;
