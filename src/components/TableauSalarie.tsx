import React from "react";
import { Salarie } from "../models/salarieModel";

interface SalarieTableProps {
  salaries: Salarie[];
}

const SalarieTable: React.FC<SalarieTableProps> = ({ salaries }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">ID</th>
          <th className="border border-gray-300 px-4 py-2">Nom</th>
          <th className="border border-gray-300 px-4 py-2">Prénom</th>
          <th className="border border-gray-300 px-4 py-2">Téléphone Fixe</th>
          <th className="border border-gray-300 px-4 py-2">Téléphone Portable</th>
          <th className="border border-gray-300 px-4 py-2">Email</th>
          <th className="border border-gray-300 px-4 py-2">Service</th>
          <th className="border border-gray-300 px-4 py-2">Site</th>
        </tr>
      </thead>
      <tbody>
        {salaries.map((salarie) => (
          <tr key={salarie.idSalary} className="text-center">
            <td className="border border-gray-300 px-4 py-2">{salarie.idSalary}</td>
            <td className="border border-gray-300 px-4 py-2">{salarie.nom}</td>
            <td className="border border-gray-300 px-4 py-2">{salarie.prénom}</td>
            <td className="border border-gray-300 px-4 py-2">{salarie.telFixe}</td>
            <td className="border border-gray-300 px-4 py-2">{salarie.telPortable}</td>
            <td className="border border-gray-300 px-4 py-2">{salarie.email}</td>
            <td className="border border-gray-300 px-4 py-2">{salarie.service.service}</td>
            <td className="border border-gray-300 px-4 py-2">{salarie.site.ville}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default SalarieTable;
