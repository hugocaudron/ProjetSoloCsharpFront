import React, { useState, useEffect } from "react";
import { getService, createService, updateService, deleteService } from "../services/serviceService";
import ServiceTable from "../components/TableauServiceAdmin";
import { notify } from "../pages/Login";
import { Service } from "../models/salarieModel";
import { getTokenFromCookie } from "../services/authentification";
import { useNavigate } from "react-router-dom";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newService, setNewService] = useState<Service>({ idService: 0, service: "" });

  // Vérifie si l'utilisateur est connecté
  useEffect(() => {
    const token = getTokenFromCookie();
    if (!token) {
      navigate("/");
      notify("Vous n'avez pas accès à cette page", "error");
    }
  }, [navigate]);

  // Charge les services
  useEffect(() => {
    const loadServices = async () => {
      const servicesData = await getService();
      setServices(servicesData);
    };
    loadServices();
  }, []);

  // Modifie les services
  const handleChange = (idService: number, field: string, value: string) => {
    const updatedServices = services.map(service =>
      service.idService === idService ? { ...service, [field]: value } : service
    );
    setServices(updatedServices);
  };

  // Met à jour les services
  const handleUpdate = async (service: Service) => {
    try {
      await updateService(service);
      notify("Service mis à jour avec succès", "success");
    } catch (error) {
      notify("Erreur lors de la mise à jour du service", "error");
    }
  };

  // Supprime les services
  const handleDelete = async (idService: number) => {
    try {
      await deleteService(idService);
      setServices(services.filter(service => service.idService !== idService));
      notify("Service supprimé avec succès", "success");
    } catch (error) {
      notify("Impossible de supprimer un service : un salarié y est associé", "error");
    }
  };

  // Ajoute un service
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createService(newService); // Ajoute le service à l'API
  
      // Recharge la liste des services en récupérant les données à jour depuis l'API
      const updatedServices = await getService();
      setServices(updatedServices); 
  
      setShowForm(false);
      setNewService({ idService: 0, service: "" });
      notify("Service ajouté avec succès", "success");
    } catch (error) {
      notify("Erreur lors de l'ajout du service", "error");
    }
  };
  
  
  

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <button
        onClick={() => setShowForm(true)}
        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500 hover:text-white mb-4"
      >
        Ajouter un service
      </button>

      {showForm && (
        <form onSubmit={handleAddService} className="bg-gray-100 p-4 rounded shadow-md">
          <div className="mb-4">
            <label htmlFor="service" className="block text-sm font-medium">Service</label>
            <input
              type="text"
              id="service"
              value={newService.service}
              onChange={e => setNewService({ ...newService, service: e.target.value })}
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

      <ServiceTable
        services={services}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default AdminPage;
