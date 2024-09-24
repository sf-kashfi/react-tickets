import { FormEvent, useEffect, useState } from "react";
import {
  onGetInfoRequest,
  onGetListRequest,
  onLogoutRequest,
} from "../../app/services/Requests";
import { useAuth } from "../../hooks/useAuth";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ITEMS_PER_PAGE } from "../../app/utils/Constants";
import FlightTicket from "../../components/flightTicket";
import { Popover, Button, Row, Col } from "antd";

function HomePage() {
  const { logout } = useAuth();
  const [username, setUsername] = useState<string | null>(null);

  const handleLogout = async (e: FormEvent) => {
    e.preventDefault();
    const data = await onLogoutRequest();
    if (data == "success") {
      logout();
    } else {
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

  const viewed = data
    ? data.pages.reduce((acc, page) => acc + page.result.length, 0)
    : 0;

  const total = data?.pages[0]?.total || 0;

  const popoverContent = <Button onClick={handleLogout}>Logout</Button>;

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col></Col>
        <Col>
          <Popover content={popoverContent} arrow={false} trigger="click">
            <Button size="large">{username ? username : "Admin"}</Button>
          </Popover>
        </Col>
      </Row>

      <Row
        justify="space-between"
        align="middle"
        style={{ padding: "10px 100px" }}
      >
        <Col>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 16, fontWeight: "bold", marginRight: 20 }}>
              Viewed: {viewed}
            </span>
          </div>
        </Col>
        <Col>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 16, fontWeight: "bold" }}>
              Total: {total}
            </span>
          </div>
        </Col>
      </Row>

      {status === "pending" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <Row gutter={[16, 16]} justify="center" style={{ padding: "20px" }}>
            {data.pages.map((page) => (
              <div key={page.nextPage}>
                {page.result.map((project) => (
                  <Col key={project.boarding}>
                    <FlightTicket {...project} />
                  </Col>
                ))}
              </div>
            ))}
          </Row>

          <Row justify="center" style={{ margin: "20px 0" }}>
            <Button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              style={{ marginRight: 10 }}
              loading={isFetchingNextPage}
              color="primary"
              variant="solid"
            >
              {isFetchingNextPage
                ? "Get Dtat"
                : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
            </Button>
          </Row>

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
