import { Service } from "../models/salarieModel";
import { getTokenFromCookie } from "./authentification";

const API_URL = process.env.REACT_APP_API_BASE_URL;
// Récupérer les services
export const getService = async (): Promise<Service[]> => {
  try {
    const token = getTokenFromCookie();
    const response = await fetch(`${API_URL}/services`, {
      headers: {
        Authorization: `Bearer ${token}`, // Ajout du token ici
      },
    });
    console.log("API url", API_URL);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const data: Service[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des services :", error);
    throw error;
  }
};
// Ajouter un service
export const createService = async (newService: Service): Promise<Service> => {
  const token = getTokenFromCookie();

  try {
    const response = await fetch(`${API_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ajout du token ici
      },
      body: JSON.stringify(newService),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de l'ajout du service : ${response.status}`);
    }

    // Récupération de l'objet service ajouté
    const addedService: Service = await response.json();
    return addedService;
  } catch (error) {
    console.error("Erreur lors de l'ajout du service :", error);
    throw error;
  }
};

// Mettre à jour un service
export const updateService = async (service: Service): Promise<void> => {
  const token = getTokenFromCookie();

  try {
    const response = await fetch(`${API_URL}/services/${service.idService}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ajout du token ici
      },
      body: JSON.stringify(service),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la mise à jour du service : ${response.status}`);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du service :", error);
    throw error;
  }
};
// Supprimer un service
export const deleteService = async (idService: number): Promise<void> => {
  const token = getTokenFromCookie();

  try {
    const response = await fetch(`${API_URL}/services/${idService}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Ajout du token ici aussi
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression du service : ${response.status}`);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du service :", error);
    throw error;
  }
};
