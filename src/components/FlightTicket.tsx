import { Flight } from "../app/model/General";
import { formatDate, formatTime } from "../app/utils/Helper";
import flightIcon from "../assets/imgs/airplane.png";

function FlightTicket(FlightProps: Flight) {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "10px",
        alignItems: "center",
        width: "600px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexGrow: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="ribbon ">
            <span>Economy</span>
          </div>

          <img
            src={FlightProps.logoSrc}
            alt="Airline Logo"
            style={FlightProps.logoStyle}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <div>{FlightProps.src.airline}</div>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            {formatTime(FlightProps.src.time)}
          </div>
          <div>{formatDate(FlightProps.src.time)}</div>
        </div>

        <div>
          <img
            src={flightIcon}
            alt="Flight"
            style={{ width: "40px" }}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <div>{FlightProps.dst.airline}</div>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            {formatTime(FlightProps.dst.time)}
          </div>
          <div>{formatDate(FlightProps.dst.time)}</div>
        </div>
      </div>

      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#000",
          border: "2px dashed #999",
          padding: "10px",
          marginTop: "10px",
          textAlign: "center",
        }}
      >
        ${FlightProps.price}
      </div>
    </div>
  );
}

export default FlightTicket;
