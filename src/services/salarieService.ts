import { Salarie } from "../models/salarieModel";
import { getTokenFromCookie } from "./authentification";

const API_URL = process.env.REACT_APP_API_BASE_URL;
// Récupérer les salariés
export const getSalaries = async (): Promise<Salarie[]> => {
  try {
    const token = getTokenFromCookie();
    const response = await fetch(`${API_URL}/salaries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API url", API_URL);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data: Salarie[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des salariés :", error);
    throw error;
  }
};
// Ajouter un salarié
export const createSalarie = async (newSalarie: Salarie): Promise<Salarie> => {
  const token = getTokenFromCookie();

  try {
    const response = await fetch(`${API_URL}/salaries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newSalarie),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de l'ajout du salarié : ${response.status}`);
    }

    const addedSalarie: Salarie = await response.json();
    return addedSalarie;
  } catch (error) {
    console.error("Erreur lors de l'ajout du salarié :", error);
    throw error;
  }
};
// Mettre à jour un salarié
export const updateSalarie = async (salarie: Salarie): Promise<void> => {
  const token = getTokenFromCookie();

  try {
    const response = await fetch(`${API_URL}/salaries/${salarie.idSalary}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(salarie),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la mise à jour du salarié : ${response.status}`);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du salarié :", error);
    throw error;
  }
};
// Supprimer un salarié
export const deleteSalarie = async (idSalary: number): Promise<void> => {
  const token = getTokenFromCookie();

  try {
    const response = await fetch(`${API_URL}/salaries/${idSalary}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression du salarié : ${response.status}`);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du salarié :", error);
    throw error;
  }
};
