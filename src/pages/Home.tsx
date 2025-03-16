import React, { useEffect, useState } from "react";
import { getSalaries } from "../services/salarieService";
import { getSite } from "../services/siteService";
import { getService } from "../services/serviceService";
import { Salarie, Site, Service } from "../models/salarieModel";
import SalarieTable from "../components/TableauSalarie";

const Home: React.FC = () => {
  const [salaries, setSalaries] = useState<Salarie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [search, setSearch] = useState<string>("");
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<string>("");
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<string>("");
  

  // Récupérer les salariés, les sites et les services
  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const data = await getSalaries();
        setSalaries(data);
      } catch (err) {
        setError("Impossible de récupérer les salariés.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Récupérer les sites
    const fetchSites = async () => {
      try {
        const data = await getSite();
        setSites(data);
      } catch (err) {
        console.error("Impossible de récupérer les sites", err);
      }
    };

    // Récupérer les services
    const fetchServices = async () => {
      try {
        const data = await getService();
        setServices(data);
      } catch (err) {
        console.error("Impossible de récupérer les services", err);
      }
    };

    fetchSalaries();
    fetchSites();
    fetchServices();
  }, []);

  // ouverture de la page de connexion avec cette suite de caractères
  useEffect(() => {
    const sequence = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
    let currentIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === sequence[currentIndex]) {
        currentIndex++;
        if (currentIndex === sequence.length) {
          window.location.href = "/login";
          currentIndex = 0;
        }
      } else {
        currentIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtrer les salariés
  const filteredSalaries = salaries.filter((salarie) => {
    return (
      (!search ||
        salarie.nom.toLowerCase().includes(search.toLowerCase())) &&
      (!selectedService ||
        salarie.service.idService === Number(selectedService)) &&
      (!selectedSite || salarie.site.villeID === Number(selectedSite))
    );
  });

  if (loading) return <p>Chargement des données...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="p-4 w-screen">
      <h1 className="text-2xl font-bold mb-4">Liste des Salariés</h1>

      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Rechercher un salarié..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-lg w-full"
        />

        <select
          value={selectedSite}
          onChange={(e) => setSelectedSite(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="">Tous les sites</option>
          {sites.map((site) => (
            <option key={site.villeID} value={site.villeID}>
              {site.ville}
            </option>
          ))}
        </select>
          
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="">Tous les services</option>
          {services.map((service) => (
            <option key={service.idService} value={service.idService}>
              {service.service}
            </option>
          ))}
        </select>
      </div>

      <SalarieTable salaries={filteredSalaries} />
    </div>
  );
};


export default Home;
