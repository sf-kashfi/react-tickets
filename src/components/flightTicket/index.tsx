import { useState } from "react";
import { Flight } from "../../app/model/General";
import Topside from "./topside";
import Inside from "./Inside";
import Bottomside from "./Bottomside";

function FlightTicket(flightData: Flight) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <>
      <div
        className={`threeDee ${isFlipped ? "expanded" : ""}`}
        onClick={handleClick}
      >
        <div className={`inside ${isFlipped ? "flipped" : ""}`}>
          <Topside {...flightData} />
        </div>
        <div className={`fold topside ${isFlipped ? "flipped" : ""}`}>
          <Inside {...flightData} />
        </div>
        <div className={`fold bottomside ${isFlipped ? "flipped" : ""}`}>
          <Bottomside {...flightData} />
        </div>
      </div>
    </>
  );
}

export default FlightTicket;
