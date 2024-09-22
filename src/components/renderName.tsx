export function renderName(airlineName: string) {
  const splitAirlineName = airlineName.split(" ");

  if (splitAirlineName.length > 2) {
    return (
      <>
        {splitAirlineName[0]} {splitAirlineName[1]} <br />
        {splitAirlineName.slice(2).join(" ")}
      </>
    );
  }

  if (splitAirlineName.length > 1) {
    return (
      <>
        {splitAirlineName[0]} <br />
        {splitAirlineName.slice(1).join(" ")}
      </>
    );
  }

  return airlineName;
}
