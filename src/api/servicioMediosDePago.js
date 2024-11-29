import axios from "axios";
import { urlAPI } from "../api/api";

//Get - Medios de Pago (Find All)
export const getMediosDePagoApi = async () => {
  try {
    const response = await axios.get(`${urlAPI}mediosdepago`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (response.status === 200) {
      return response; 
    } else {
      throw new Error("Error al obtener medios de pago");
    }
  } catch (error) {
    console.error("Error al realizar el GET MEDIOS DE PAGO:", error.response?.data || error.message);
    console.log(error.response.data.errors.Nombre);
    throw new Error(error.response?.data?.message || "Error GET MEDIOS DE PAGO");
  }
};

  
  