import axios from "axios";
import { urlAPI } from "../api/api";

//Get - Frecuencias (Find All)
export const getFrecuenciasApi = async () => {
  try {
    const response = await axios.get(`${urlAPI}frecuencias`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (response.status === 200) {
      return response; 
    } else {
      throw new Error("Error al obtener frecuencias");
    }
  } catch (error) {
    console.error("Error al realizar el GET FRECUENCIAS:", error.response?.data || error.message);
    console.log(error.response.data.errors.Nombre);
    throw new Error(error.response?.data?.message || "Error GET FRECUENCIAS");
  }
};

  
  