import { useAuth } from "../../hooks/useAuth";

function HomePage() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div>Hellow There ...</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default HomePage;
