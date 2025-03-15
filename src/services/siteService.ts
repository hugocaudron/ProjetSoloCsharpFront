import { Site } from "../models/salarieModel";
import { getTokenFromCookie } from "./authentification";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const getSite = async (): Promise<Site[]> => {
  try {
    const response = await fetch(`${API_URL}/sites`);
    console.log("API url", API_URL);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data: Site[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des sites :", error);
    throw error;
  }
};

export const createSite = async (site: {
  villeID: number;
  ville: string;
}): Promise<void> => {
  const token = getTokenFromCookie();

  try {
    const response = await fetch(`${API_URL}/sites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(site),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de l'ajout du site : ${response.status}`);
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du site :", error);
    throw error;
  }
};

export const updateSite = async (site: Site): Promise<void> => {
  const token = getTokenFromCookie();

  try {
    const response = await fetch(`${API_URL}/sites/${site.villeID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ajout du token ici
      },
      body: JSON.stringify(site),
    });

    if (!response.ok) {
      throw new Error(
        `Erreur lors de la mise à jour du site : ${response.status}`
      );
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du site :", error);
    throw error;
  }
};

export const deleteSite = async (villeID: number): Promise<void> => {
  const token = getTokenFromCookie();

  try {
    const response = await fetch(`${API_URL}/sites/${villeID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Ajout du token ici aussi
      },
    });

    if (!response.ok) {
      throw new Error(
        `Erreur lors de la suppression du site : ${response.status}`
      );
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du site :", error);
    throw error;
  }
};
