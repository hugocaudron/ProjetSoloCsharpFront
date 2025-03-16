import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromCookie } from "../services/authentification";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const token = getTokenFromCookie();

    if (!token) {
      navigate("/");
      notify("Vous n'avez pas accès à cette page", "error");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => navigate("/site")}
          className="bg-gray-300 text-black px-8 py-4 text-lg rounded-2xl hover:bg-gray-500 transition-all"
        >
          Site
        </button>
        <button
          onClick={() => navigate("/service")}
          className="bg-gray-300 text-black px-8 py-4 text-lg rounded-2xl hover:bg-gray-500 transition-all"
        >
          Service
        </button>
        <button
          onClick={() => navigate("/salarie")}
          className="bg-gray-300 text-black px-8 py-4 text-lg rounded-2xl hover:bg-gray-500 transition-all"
        >
          Salarié
        </button>
        <button
          onClick={() => navigate("/createAdmin")}
          className="bg-gray-300 text-black px-8 py-4 text-lg rounded-2xl hover:bg-gray-500 transition-all"
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default AdminPage;

export const notify = (message: string, type: "success" | "error" | "info") => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    default:
      toast.info(message);
      break;
  }
};
