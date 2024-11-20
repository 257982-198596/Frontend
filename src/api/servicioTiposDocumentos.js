import axios from "axios";
import { urlAPI } from "../api/api";

//Get - Tipos Documentos (Find All)
export const getTiposDocumentosApi = async () => {
  try {
    const response = await axios.get(`${urlAPI}documentos`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (response.status === 200) {
      return response; 
    } else {
      throw new Error("Error al obtener tipos de documentos");
    }
  } catch (error) {
    console.error("Error al realizar el GET TIPOS DOCS:", error.response?.data || error.message);
    console.log(error.response.data.errors.Nombre);
    throw new Error(error.response?.data?.message || "Error GET TIPOS DOCS");
  }
};

  
  