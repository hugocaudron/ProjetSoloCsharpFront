import React from "react";
import { Salarie } from "../models/salarieModel";
import { Service } from "../models/salarieModel"; // Add this line to import Service
import { Site } from "../models/salarieModel"; // Add this line to import Service

interface SalarieTableProps {
  salaries: Salarie[];
  handleChange: (idSalary: number, field: string, value: string) => void;
  handleUpdate: (salarie: Salarie) => void;
  handleDelete: (idSalary: number) => void;
  services: Service[]; // Liste des services disponibles
  sites: Site[]; // Liste des sites disponibles
}

const SalarieTable: React.FC<SalarieTableProps> = ({
  salaries,
  handleChange,
  handleUpdate,
  handleDelete,
  services,
  sites
}) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2 min-w-[120px]">idSalary</th>
            <th className="border px-4 py-2 min-w-[120px]">Nom</th>
            <th className="border px-4 py-2 min-w-[120px]">Prénom</th>
            <th className="border px-4 py-2 min-w-[120px]">Téléphone Fixe</th>
            <th className="border px-4 py-2 min-w-[120px]">Téléphone Portable</th>
            <th className="border px-4 py-2 min-w-[120px]">Email</th>
            <th className="border px-4 py-2 min-w-[120px]">Service</th>
            <th className="border px-4 py-2 min-w-[120px]">Site</th>
            <th className="border px-4 py-2 min-w-[120px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map(salarie => (
            <tr key={salarie.idSalary}>
              <td className="border px-4 py-2">{salarie.idSalary}</td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={salarie.nom}
                  onChange={e => handleChange(salarie.idSalary, "nom", e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={salarie.prénom}
                  onChange={e => handleChange(salarie.idSalary, "prénom", e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={salarie.telFixe}
                  onChange={e => handleChange(salarie.idSalary, "telFixe", e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={salarie.telPortable}
                  onChange={e => handleChange(salarie.idSalary, "telPortable", e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="email"
                  value={salarie.email}
                  onChange={e => handleChange(salarie.idSalary, "email", e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              {/* Colonne Service avec menu déroulant */}
              <td className="border px-4 py-2">
                <select
                  value={salarie.idServices} // On utilise idServices pour la sélection
                  onChange={e => handleChange(salarie.idSalary, "idServices", e.target.value)}
                  className="w-full p-1 border rounded"
                >
                  {services.map((service) => (
                    <option key={service.idService} value={service.idService}>
                      {service.service}
                    </option>
                  ))}
                </select>
              </td>
              {/* Colonne Site avec menu déroulant */}
              <td className="border px-4 py-2">
                <select
                  value={salarie.idSite} // On utilise idSite pour la sélection
                  onChange={e => handleChange(salarie.idSalary, "idSite", e.target.value)}
                  className="w-full p-1 border rounded"
                >
                  {sites.map((site) => (
                    <option key={site.villeID} value={site.villeID}>
                      {site.ville}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border px-4 py-2 flex justify-end space-x-2">
                <button
                  onClick={() => handleUpdate(salarie)}
                  className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-500 hover:text-white"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(salarie.idSalary)}
                  className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-700"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalarieTable;
