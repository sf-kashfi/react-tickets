import { FormEvent, useEffect, useState } from "react";
import {
  onGetInfoRequest,
  onGetListRequest,
  onLogoutRequest,
} from "../../app/services/Requests";
import { useAuth } from "../../hooks/useAuth";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ITEMS_PER_PAGE } from "../../app/utils/Constants";
import Inside from "../../components/flightTicket/Inside";
import Topside from "../../components/flightTicket/topside";

function HomePage() {
  const { logout } = useAuth();
  const [username, setUsername] = useState<string | null>(null);

  const handleLogout = async (e: FormEvent) => {
    e.preventDefault();
    const data = await onLogoutRequest();
    if (data == "success") {
      logout();
    } else {
      alert("Invalid token");
      logout();
    }
  };

  useEffect(() => {
    const fetchUsername = async () => {
      const response = await onGetInfoRequest();
      if (response) {
        setUsername(response);
      } else {
        console.error("Failed to fetch username");
      }
    };
    fetchUsername();
  }, []);

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["list"],
    queryFn: async ({ pageParam }) => {
      const response = await onGetListRequest({ page: pageParam, size: 3 });
      if (!response) {
        throw new Error("Failed to fetch data");
      }
      return {
        result: response.result,
        total: response.total,
        nextPage:
          response.result.length < ITEMS_PER_PAGE ? undefined : pageParam + 1,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const flightData = {
    logoSrc: "https://beebom.com/wp-content/uploads/2018/12/Lufthansa-Logo.jpg",
    logoStyle: { height: "51px", margin: "22px 12px" },
    src: {
      country: "Algeria",
      iso3: "DZA",
      time: "2021-05-28T09:35:11.523Z",
      airline: "Kempegowda International",
    },
    dst: {
      country: "United States of America",
      iso3: "USA",
      time: "2021-05-28T11:22:27.523Z",
      airline: "Indira Gandhi International",
    },
    boarding: "17017",
    transfer: false,
    gates: 5,
    seat: "20A",
    price: "3000",
    class: "economy",
  };

  return (
    <>
      <div>Hello {username ? username : "There"} ...</div>
      <button onClick={handleLogout}>Logout</button>

      {status === "pending" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          {data.pages.map((page) => (
            <div key={page.nextPage}>
              {page.result.map((project) => (
                <Inside key={project.boarding} {...project} />
              ))}
            </div>
          ))}
          <div>
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load Newer"
                : "Nothing more to load"}
            </button>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? "Background Updating..."
              : null}
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;
