import React from "react";
import { Site } from "../models/salarieModel";

interface SiteTableProps {
  sites: Site[];
  handleChange: (villeID: number, field: string, value: string) => void;
  handleUpdate: (site: Site) => void;
  handleDelete: (villeID: number) => void;
}

const TableauSiteAdmin: React.FC<SiteTableProps> = ({ sites, handleChange, handleUpdate, handleDelete }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID Ville</th>
            <th className="border px-4 py-2">Nom Ville</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sites.map(site => (
            <tr key={site.villeID}>
              <td className="border px-4 py-2">{site.villeID}</td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={site.ville}
                  onChange={e => handleChange(site.villeID, "ville", e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border px-4 py-2 flex justify-start space-x-2">
                <button
                  onClick={() => handleUpdate(site)}
                  className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-500 hover:text-white"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(site.villeID)}
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

export default TableauSiteAdmin;
