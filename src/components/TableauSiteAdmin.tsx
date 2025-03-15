import React, { useState, useEffect } from "react";
import { notify } from "../pages/Login";

export interface Site {
  villeID: number;
  ville: string;
}

interface SiteTableProps {
  fetchSites: () => Promise<Site[]>;
  updateSite: (site: Site) => Promise<void>;
  deleteSite: (villeID: number) => Promise<void>;
}

const SiteTable: React.FC<SiteTableProps> = ({ fetchSites, updateSite, deleteSite }) => {
  const [sites, setSites] = useState<Site[]>([]);

  useEffect(() => {
    const loadSites = async () => {
      const data = await fetchSites();
      setSites(data);
    };
    loadSites();
  }, []);

  const handleChange = (villeID: number, field: string, value: string | number) => {
    const updatedSites = sites.map(site =>
      site.villeID === villeID ? { ...site, [field]: value } : site
    );
    setSites(updatedSites);
  };

  const handleUpdate = async (site: Site) => {
    await updateSite(site);
  };

  const handleDelete = async (villeID: number) => {
    try {
      await deleteSite(villeID);
      setSites(sites.filter(site => site.villeID !== villeID));
    } catch (error) {
      notify("Impossible de supprimer le site : un service est associé.", "error");
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2 min-w-[100px]">Ville ID</th>
            <th className="border px-4 py-2 min-w-[100px]">Ville</th>
            <th className="border px-4 py-2 min-w-[100px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sites.map(site => (
            <tr key={site.villeID}>
              <td className="border px-4 py-2 min-w-[100px]">{site.villeID}</td>
              <td className="border px-4 py-2 min-w-[100px]">
                <input
                  type="text"
                  value={site.ville}
                  onChange={e => handleChange(site.villeID, "ville", e.target.value)}
                  className="w-full p-1 border rounded"
                />
              </td>
              <td className="border px-4 py-2 flex justify-start space-x-2 min-w-[100px]">
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

export default SiteTable;
