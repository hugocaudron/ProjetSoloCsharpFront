import { jwtDecode } from "jwt-decode";
import { AdminLogin, AdminRegister } from "../models/authentificationModel";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const register = async ({
  email,
  password,
  confirmPassword,
}: AdminRegister): Promise<boolean> => {
  try {
    const registerData = {
      email,
      password,
      confirmPassword,
    };

    const response = await fetch(`${API_URL}/admins/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    if (!response.ok) throw new Error("Erreur lors de l'ajout");
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const login = async ({
  email,
  password,
}: AdminLogin): Promise<boolean> => {
  try {
    console.log(email, password);
    const response = await fetch(`${API_URL}/admins/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Erreur lors de la connexion");

    const data = await response.json();
    const token = data.token;

    if (token) {
      document.cookie = `token=${token}; path=/; max-age=${
        60 * 60 * 12
      }; secure`;

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getTokenFromCookie = (): any => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((row) => row.startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

export const getInfoFromToken = (): any => {
  const token = getTokenFromCookie();
  if (token) {
    const decodedToken = jwtDecode<any>(token);
    return {
      id: parseInt(decodedToken.CustomerID),
      firstName: decodedToken.FirstName,
      email: decodedToken.Email,
    };
  }
  return null;
};

export const logOut = () => {
  document.cookie = "token=; path=/; max-age=0;";
  sessionStorage.clear();
  localStorage.removeItem("customerInfo");
};
