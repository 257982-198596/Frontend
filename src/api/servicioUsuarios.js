import { urlAPI } from "./api";
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