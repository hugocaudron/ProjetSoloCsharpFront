import React from "react";
import { Service } from "../models/salarieModel";

interface ServiceTableProps {
  services: Service[];
  handleChange: (idService: number, field: string, value: string) => void;
  handleUpdate: (service: Service) => void;
  handleDelete: (idService: number) => void;
}

const ServiceTable: React.FC<ServiceTableProps> = ({ services, handleChange, handleUpdate, handleDelete }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID Service</th>
            <th className="border px-4 py-2">Service</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.idService}>
              <td className="border px-4 py-2">{service.idService}</td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={service.service}
                  onChange={e => handleChange(service.idService, "service", e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border px-4 py-2 flex justify-start space-x-2">
                <button
                  onClick={() => handleUpdate(service)}
                  className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-500 hover:text-white"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(service.idService)}
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

export default ServiceTable;
