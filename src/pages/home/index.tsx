import { FormEvent } from "react";
import { onLogoutRequest } from "../../app/services/Requests";
import { useAuth } from "../../hooks/useAuth";

function HomePage() {
  const { logout } = useAuth();

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

  return (
    <>
      <div>Hellow There ...</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default HomePage;
