import { logout } from "./firebase";

function Logout() {
  const handleLogout = async () => {
    try {
      await logout();
      alert("Sesión cerrada");
    } catch (error) {
      alert(error.message);
    }
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
}
