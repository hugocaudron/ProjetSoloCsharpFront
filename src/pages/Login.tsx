import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authentification";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // Connexion à l'application
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const isLoggedIn = await login({ email, password });
    setIsLoading(false);
    if (isLoggedIn) {
      navigate("/");
      notify("Vous êtes bien connecter !", "success");
    } else {
      notify("Adresse mail ou mot de passe incorrect.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-white">
      <div className="bg-white p-8 rounded-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        {isLoading && (
          <p className="text-red-500 text-center mb-4">
            Chargement en cours...
          </p>
        )}
        <form onSubmit={handleLogin}>
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
              placeholder="Entrez votre email"
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
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-300 text-black p-2 rounded-lg w-full hover:bg-gray-400"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

export const notify = (message: string, type: "success" | "error" | "info") => {
  switch (type) {
    case "success":
      toast.success(message); // Affiche un toast de succès
      break;
    case "error":
      toast.error(message); // Affiche un toast d'erreur
      break;
    case "info":
      toast.info(message); // Affiche un toast d'information
      break;
    default:
      toast.info(message); // Affiche un toast d'information par défaut
      break;
  }
};
