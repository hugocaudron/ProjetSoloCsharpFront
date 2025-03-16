import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenFromCookie } from "../services/authentification";
import { notify } from "./Login";
import TableauSiteAdmin from "../components/TableauSiteAdmin";
import { getSite, updateSite, deleteSite, createSite } from "../services/siteService";
import { Site } from "../models/salarieModel";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [sites, setSites] = useState<Site[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newSite, setNewSite] = useState<Site>({ villeID: 0, ville: "" });

  //regarde si l'utilisateur est connecté
  useEffect(() => {
    const token = getTokenFromCookie();
    if (!token) {
      navigate("/");
      notify("Vous n'avez pas accès à cette page", "error");
    }
  }, [navigate]);

  //charge les sites
  useEffect(() => {
    const loadSites = async () => {
      const sitesData = await getSite();
      setSites(sitesData);
    };
    loadSites();
  }, []);

  //modifie les sites
  const handleChange = (villeID: number, field: string, value: string) => {
    const updatedSites = sites.map(site =>
      site.villeID === villeID ? { ...site, [field]: value } : site
    );
    setSites(updatedSites);
  };

  //met à jour les sites
  const handleUpdate = async (site: Site) => {
    try {
      await updateSite(site);
      notify("Site mis à jour avec succès", "success");
      
      // Recharger la liste des sites après la mise à jour
      const updatedSites = await getSite();
      setSites(updatedSites);
    } catch (error) {
      notify("Erreur lors de la mise à jour du site", "error");
    }
  };

  //supprime les sites
  const handleDelete = async (villeID: number) => {
    try {
      await deleteSite(villeID);
      
      // Recharger la liste après suppression
      const updatedSites = await getSite();
      setSites(updatedSites);
      
      notify("Site supprimé avec succès", "success");
    } catch (error) {
      notify("Erreur lors de la suppression du site", "error");
    }
  };

  //ajoute un site
  const handleAddSite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSite(newSite);
      
      // Recharger la liste des sites après ajout
      const updatedSites = await getSite();
      setSites(updatedSites);
      
      setShowForm(false);
      setNewSite({ villeID: 0, ville: "" });
      notify("Site ajouté avec succès", "success");
    } catch (error) {
      notify("Erreur lors de l'ajout du site", "error");
    }
  };

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <button
        onClick={() => setShowForm(true)}
        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500 hover:text-white mb-4"
      >
        Ajouter un site
      </button>

      {showForm && (
        <form onSubmit={handleAddSite} className="bg-gray-100 p-4 rounded shadow-md">
          <div className="mb-4">
            <label htmlFor="ville" className="block text-sm font-medium">Ville</label>
            <input
              type="text"
              id="ville"
              value={newSite.ville}
              onChange={e => setNewSite({ ...newSite, ville: e.target.value })}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>

          <button type="submit" className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500 hover:text-white">
            Ajouter
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="ml-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500 hover:text-white"
          >
            Annuler
          </button>
        </form>
      )}

      <TableauSiteAdmin
        sites={sites}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default AdminPage;
