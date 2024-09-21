import { FormEvent, useEffect, useState } from "react";
import {
  onGetInfoRequest,
  onGetListRequest,
  onLogoutRequest,
} from "../../app/services/Requests";
import { useAuth } from "../../hooks/useAuth";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ITEMS_PER_PAGE } from "../../app/utils/Constants";

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
          {console.log("data", data)}
          {data.pages.map((page) => (
            <div key={page.nextPage}>
              {page.result.map((project) => (
                <p
                  style={{
                    border: "1px solid gray",
                    borderRadius: "5px",
                    padding: "10rem 1rem",
                  }}
                  key={project.boarding}
                >
                  {project.boarding}
                </p>
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
