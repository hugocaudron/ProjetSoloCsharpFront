import React, { useState, useEffect } from "react";
import { getSalaries, createSalarie, updateSalarie, deleteSalarie } from "../services/salarieService";
import SalarieTable from "../components/TableauSalarieAdmin";
import { notify } from "../pages/Login";
import { Salarie, Service, Site } from "../models/salarieModel";
import { getTokenFromCookie } from "../services/authentification";
import { useNavigate } from "react-router-dom";

// Page d'administration des salariés
const AdminPageSalarie: React.FC = () => {
  const navigate = useNavigate();
  const [salaries, setSalaries] = useState<Salarie[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newSalarie, setNewSalarie] = useState<Salarie>({
    idSalary: 0,
    nom: "",
    prénom: "",
    telFixe: 0,
    telPortable: 0,
    email: "",
    idServices: 0,
    idSite: 0,
    site: { villeID: 0, ville: "" },
    service: { idService: 0, service: "" }
  });
  const [services, setServices] = useState<Service[]>([]);
  const [sites, setSites] = useState<Site[]>([]);

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const token = getTokenFromCookie();
    if (!token) {
      navigate("/");
      notify("Vous n'avez pas accès à cette page", "error");
    }
  }, [navigate]);

  // Charger les salariés, services et sites
  useEffect(() => {
    const loadData = async () => {
      try {
        const salariesData = await getSalaries();
        const servicesData = await fetchServices();
        const sitesData = await fetchSites();
        setSalaries(salariesData);
        setServices(servicesData);
        setSites(sitesData);
      } catch (error) {
        console.error("Erreur de chargement des données", error);
      }
    };
    loadData();
  }, []);

  // Récupérer les services
  const fetchServices = async (): Promise<Service[]> => {
    const token = getTokenFromCookie();
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/services`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
    return await response.json();
  };

  // Récupérer les sites
  const fetchSites = async (): Promise<Site[]> => {
    const token = getTokenFromCookie();
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/sites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
    return await response.json();
  };

  // Mettre à jour un salarié
  const handleChange = (idSalary: number, field: string, value: any) => {
    const updatedSalaries = salaries.map(salarie =>
      salarie.idSalary === idSalary ? { ...salarie, [field]: value } : salarie
    );
    setSalaries(updatedSalaries);
  };

  // Mettre à jour un salarié
  const handleUpdate = async (salarie: Salarie) => {
    try {
      await updateSalarie(salarie);
      notify("Salarié mis à jour avec succès", "success");
    } catch (error) {
      notify("Erreur lors de la mise à jour du salarié", "error");
    }
  };

  // Supprimer un salarié
  const handleDelete = async (idSalary: number) => {
    try {
      await deleteSalarie(idSalary);
      setSalaries(salaries.filter(salarie => salarie.idSalary !== idSalary));
      notify("Salarié supprimé avec succès", "success");
    } catch (error) {
      notify("Impossible de supprimer ce salarié", "error");
    }
  };

  // Ajouter un salarié
  const handleAddSalarie = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedSalarie = await createSalarie(newSalarie);
      setSalaries([...salaries, addedSalarie]);
      setShowForm(false);
      setNewSalarie({
        idSalary: 0,
        nom: "",
        prénom: "",
        telFixe: 0,
        telPortable: 0,
        email: "",
        idServices: 0,
        idSite: 0,
        site: { villeID: 0, ville: "" },
        service: { idService: 0, service: "" }
      });
      notify("Salarié ajouté avec succès", "success");
    } catch (error) {
      notify("Erreur lors de l'ajout du salarié", "error");
    }
  };

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <button
        onClick={() => setShowForm(true)}
        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500 hover:text-white mb-4"
      >
        Ajouter un salarié
      </button>

      {showForm && (
        <form onSubmit={handleAddSalarie} className="bg-gray-100 p-4 rounded shadow-md flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Nom"
            value={newSalarie.nom}
            onChange={e => setNewSalarie({ ...newSalarie, nom: e.target.value })}
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Prénom"
            value={newSalarie.prénom}
            onChange={e => setNewSalarie({ ...newSalarie, prénom: e.target.value })}
            required
            className="p-2 border rounded"
          />
          <input
            type="string"
            placeholder="Téléphone fixe"
            value={newSalarie.telFixe}
            onChange={e => setNewSalarie({ ...newSalarie, telFixe: Number(e.target.value) })}
            required
            className="p-2 border rounded"
          />
          <input
            type="string"
            placeholder="Téléphone portable"
            value={newSalarie.telPortable}
            onChange={e => setNewSalarie({ ...newSalarie, telPortable: Number(e.target.value) })}
            required
            className="p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newSalarie.email}
            onChange={e => setNewSalarie({ ...newSalarie, email: e.target.value })}
            required
            className="p-2 border rounded"
          />
          {/* Menu déroulant pour le Service */}
          <select
            value={newSalarie.idServices}
            onChange={e => setNewSalarie({ ...newSalarie, idServices: Number(e.target.value) })}
            required
            className="p-2 border rounded"
          >
            <option value="">Sélectionner un service</option>
            {services.map(service => (
              <option key={service.idService} value={service.idService}>
                {service.service}
              </option>
            ))}
          </select>
          {/* Menu déroulant pour le Site */}
          <select
            value={newSalarie.idSite}
            onChange={e => setNewSalarie({ ...newSalarie, idSite: Number(e.target.value) })}
            required
            className="p-2 border rounded"
          >
            <option value="">Sélectionner un site</option>
            {sites.map(site => (
              <option key={site.villeID} value={site.villeID}>
                {site.ville}
              </option>
            ))}
          </select>
          <button type="submit" className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500 hover:text-white">Ajouter</button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Annuler
          </button>
        </form>
      )}

      <SalarieTable
        salaries={salaries}
        services={services}
        sites={sites}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default AdminPageSalarie;
