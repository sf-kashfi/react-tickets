import { Flight } from "../../app/model/General";
import flightIcon from "../../assets/imgs/airplane.png";
import BorderWrapper from "../BorderWrapper";
import { renderName } from "../RenderName";
import Ribbon from "../Ribbon";

function Topside(FlightProps: Flight) {
  return (
    <>
      <BorderWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "50px",
            }}
          >
            <Ribbon ticketClass={FlightProps.class} />

            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: "bold", color: "darkblue" }}>From</div>
              <div
                style={{ fontSize: "24px", fontWeight: "bold", color: "black" }}
              >
                {FlightProps.src.iso3}
              </div>
              <div style={{ color: "gray" }}>
                {renderName(FlightProps.src.airline)}
              </div>
            </div>
          </div>

          <div style={{ alignSelf: "end" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{
                  transform: "translateY(-50%)",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "gray",
                }}
              />
              <img src={flightIcon} alt="Flight" style={{ width: "40px" }} />
              <div
                style={{
                  transform: "translateY(-50%)",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "gray",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#000",
                border: "2px solid lightgray",
                backgroundColor: "lightgray",
                borderRadius: "6px",
                padding: "1px 20px",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              ${FlightProps.price}
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: "bold", color: "darkblue" }}>To</div>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "black" }}
            >
              {FlightProps.dst.iso3}
            </div>
            <div style={{ color: "gray" }}>
              {renderName(FlightProps.dst.airline)}
            </div>
          </div>
        </div>

        <div></div>
      </BorderWrapper>
    </>
  );
}

export default Topside;
