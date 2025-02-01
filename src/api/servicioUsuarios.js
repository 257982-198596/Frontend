import { urlAPI, ApiKey } from "../api/api";
import axios from "axios";

//Login - 
export const iniciarSesionApi = async (email, password) => {
  try {
    const response = await axios.post(
      `${urlAPI}usuarios/iniciarsesion`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "ApiKey" : ApiKey,
        },
      }
    );

    if (response.status === 200) {
      return response; 
    } else {
      throw new Error("Error al iniciar sesión");
    }
  } catch (error) {
    //console.log(error.response?.data);
    throw new Error(error.response?.data.message);
  }
};

// Obtener Cliente por Email
export const obtenerClientePorIdDeUsuario = async (email) => {
  try {
    const response = await axios.get(`${urlAPI}usuarios/obtener-cliente-por-email`, {
      params: { email: email },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "ApiKey" : ApiKey,
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Error al obtener cliente por email");
    }
  } catch (error) {
    throw new Error(error.response?.data.message);
  }
};