import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authentification";
import { toast } from "react-toastify";

const RegisterAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      notify("Les mots de passe ne correspondent pas.", "error");
      return;
    }

    setIsLoading(true);
    const isRegistered = await register({ email, password, confirmPassword });
    setIsLoading(false);

    if (isRegistered) {
      notify("Admin créé avec succès !", "success");
      navigate("/");
    } else {
      notify("Erreur lors de la création de l'admin.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-top justify-center bg-white">
      <div className="bg-white p-8 rounded-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Création Admin</h2>
        {isLoading && (
          <p className="text-red-500 text-center mb-4">Chargement en cours...</p>
        )}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded-lg w-full"
              placeholder="Entrez un email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded-lg w-full"
              placeholder="Entrez un mot de passe"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border p-2 rounded-lg w-full"
              placeholder="Confirmez le mot de passe"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-300 text-black p-2 rounded-lg w-full hover:bg-gray-400"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAdmin;

export const notify = (message: string, type: "success" | "error" | "info") => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    default:
      toast.info(message);
      break;
  }
};
