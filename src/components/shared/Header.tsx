import { useNavigate } from "react-router-dom";
import { logOut } from '../../services/authentification';


const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <header className="flex items-center w-full justify-between p-4 bg-gray-100">
        <button onClick={() => navigate("/")} className="text-lg font-semibold">
          Home
        </button>

        {document.cookie.includes("token") ? (
          window.location.pathname === "/admin" ? (
            <button 
              onClick={() => {
                logOut();
                navigate("/login");
              }} 
              className="text-lg font-semibold"
            >
              Déconnexion
            </button>
          ) : (
            <button onClick={() => navigate("/admin")} className="text-lg font-semibold">
              Page admin
            </button>
          )
        ) : null}
      </header>
      <div className="h-0.5 bg-black w-full"></div>
    </>
  );
};

export default Header;
