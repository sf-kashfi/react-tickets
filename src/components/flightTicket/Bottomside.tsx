import { Flight } from "../../app/model/General";
import { calculateFlightDuration, formatTime } from "../../app/utils/Helper";
import BorderWrapper from "../BorderWrapper";

function Bottomside(FlightProps: Flight) {
  return (
    <>
      <BorderWrapper>
        <div
          style={{
            padding: "10px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            width: "100%",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "black" }}
            >
              {formatTime(FlightProps.src.time)} -
              {formatTime(FlightProps.dst.time)}
            </div>
            <div style={{ color: "gray" }}>Flight Time</div>
          </div>

          <div style={{ textAlign: "left" }}>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "black" }}
            >
              {calculateFlightDuration(
                FlightProps.src.time,
                FlightProps.dst.time
              )}
            </div>
            <div style={{ color: "gray" }}>Duration</div>
          </div>

          <div style={{ textAlign: "left" }}>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "black" }}
            >
              {formatTime(FlightProps.boarding)}
            </div>
            <div style={{ color: "gray" }}>Boarding</div>
          </div>

          <div style={{ textAlign: "left" }}>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "black" }}
            >
              {FlightProps.transfer ? "Yes" : "No"}
            </div>
            <div style={{ color: "gray" }}>Transfer</div>
          </div>

          <div style={{ textAlign: "left" }}>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "black" }}
            >
              {FlightProps.gates}
            </div>
            <div style={{ color: "gray" }}>Gate</div>
          </div>

          <div style={{ textAlign: "left" }}>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "black" }}
            >
              {FlightProps.seat}
            </div>
            <div style={{ color: "gray" }}>Seat</div>
          </div>
        </div>

        <div></div>
      </BorderWrapper>
    </>
  );
}

export default Bottomside;
