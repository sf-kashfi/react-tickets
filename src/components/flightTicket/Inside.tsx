import { Flight } from "../../app/model/General";
import { formatDate, formatTime } from "../../app/utils/Helper";
import flightIcon from "../../assets/imgs/airplane.png";
import BorderWrapper from "../BorderWrapper";
import Ribbon from "../Ribbon";

function Inside(FlightProps: Flight) {
  return (
    <>
      <BorderWrapper padding="10px 10px 0px 10px">
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Ribbon ticketClass={FlightProps.class} />

            <img
              src={FlightProps.logoSrc}
              alt="Airline Logo"
              style={FlightProps.logoStyle}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ color: "gray" }}>{FlightProps.src.country}</div>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "black" }}
            >
              {formatTime(FlightProps.src.time)}
            </div>
            <div style={{ color: "gray" }}>
              {formatDate(FlightProps.src.time)}
            </div>
          </div>

          <div style={{ alignSelf: "center" }}>
            <img src={flightIcon} alt="Flight" style={{ width: "40px" }} />
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ color: "gray" }}>{FlightProps.dst.country}</div>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "black" }}
            >
              {formatTime(FlightProps.dst.time)}
            </div>
            <div style={{ color: "gray" }}>
              {formatDate(FlightProps.dst.time)}
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#000",
            border: "2px dashed #999",
            borderRadius: "6px",
            padding: "1px 20px",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          ${FlightProps.price}
        </div>
      </BorderWrapper>
    </>
  );
}

export default Inside;
