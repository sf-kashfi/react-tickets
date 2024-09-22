interface RibbonProps {
  ticketClass: string;
}

function Ribbon({ ticketClass }: RibbonProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 1,
        overflow: "hidden",
        width: "75px",
        height: "75px",
        textAlign: "right",
      }}
    >
      <span
        style={{
          fontSize: "10px",
          fontWeight: "bold",
          color: "#FFF",
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: "20px",
          transform: "rotate(-45deg)",
          WebkitTransform: "rotate(-45deg)",
          width: "100px",
          display: "block",
          background: "#fb0d0d",
          boxShadow: "0 3px 10px -5px rgba(0, 0, 0, 1)",
          position: "absolute",
          top: "19px",
          left: "-21px",
        }}
      >
        {ticketClass.toUpperCase()}
      </span>
    </div>
  );
}

export default Ribbon;
