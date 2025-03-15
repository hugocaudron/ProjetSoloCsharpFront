import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromCookie } from "../services/authentification";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableauSiteAdmin from "../components/TableauSiteAdmin";
import {
  getSite,
  updateSite,
  deleteSite,
  createSite,
} from "../services/siteService";
import { notify } from "./Login";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [newSite, setNewSite] = useState({ villeID: 0, ville: "" });

  useEffect(() => {
    const token = getTokenFromCookie();
    if (!token) {
      navigate("/");
      notify("Vous n'avez pas accès à cette page", "error"); // Redirige vers l'accueil si pas de token
    }
  }, [navigate]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSite((prevSite) => ({ ...prevSite, [name]: value }));
  };

  const handleAddSite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSite(newSite); // Appeler le service pour ajouter un site
      setShowForm(false); // Fermer le formulaire après ajout
      setNewSite({ villeID: 0, ville: "" }); // Réinitialiser le formulaire
      notify("Site ajouté avec succès", "success");
    } catch (error) {
      notify("Erreur lors de l'ajout du site", "error");
    }
  };

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500 hover:text-white mb-4"
        >
          Ajouter un site
        </button>

        {showForm && (
          <form
            onSubmit={handleAddSite}
            className="bg-gray-100 p-4 rounded shadow-md"
          >
            <div className="mb-4 flex flex-col">
              <label htmlFor="ville" className="block text-sm font-medium">
                Ville
              </label>
              <input
                type="text"
                id="ville"
                name="ville"
                value={newSite.ville}
                onChange={handleFormChange}
                className="w-full p-2 border rounded mt-1"
                required
              />
            </div>
            <div className="mb-4 flex">
              <button
                type="submit"
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500 hover:text-white"
              >
                Ajouter
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500 hover:text-white ml-2"
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="min-w-full">
        <TableauSiteAdmin
          fetchSites={getSite}
          updateSite={updateSite}
          deleteSite={deleteSite}
        />
      </div>
    </div>
  );
};

export default AdminPage;
