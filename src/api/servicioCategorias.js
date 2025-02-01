import axios from "axios";
import { urlAPI, ApiKey } from "../api/api";

//Get - Categorias (Find All)
export const getCategoriasApi = async (suscriptorId) => {
  try {
    const response = await axios.get(`${urlAPI}categorias/suscriptor/${suscriptorId}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "ApiKey" : ApiKey,
      },
    });

    if (response.status === 200) {
      return response; 
    } else {
      throw new Error("Error al obtener categorias");
    }
  } catch (error) {
    console.error("Error al realizar el GET CATEGORIAS:", error.response?.data || error.message);
    console.log(error.response.data.errors.Nombre);
    throw new Error(error.response?.data?.message || "Error GET CATEGORIAS");
  }
};

// POST - NUEVA CATEGORIA
export const postNuevaCategoriaAPI = async (objCategoria) => {
  try {
    const response = await axios.post(
      `${urlAPI}categorias`,
      armarJsonCategoria(objCategoria),
      {
        headers: {
          "Content-Type": "application/json",
          "ApiKey" : ApiKey,
        },
      }
    );
    if (response.status === 201 || response.status === 200) {
      return response;
    } 
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

// PUT - ACTUALIZAR CATEGORIA
export const putActualizarCategoriaAPI = async (objCategoria) => {
  try {
    const response = await axios.put(
      `${urlAPI}categorias/${objCategoria.id}`,
      armarJsonCategoria(objCategoria),
      {
        headers: {
          "Content-Type": "application/json",
          "ApiKey" : ApiKey,
        },
      }
    );

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Error al actualizar categoria");
    }
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

// ELIMINAR CATEGORIA
export const borrarCategoriaEnAPI = async (idCategoria) => {
  try {
    console.log("id", idCategoria);
    const response = await axios.delete(`${urlAPI}categorias/${idCategoria}`, {
      headers: {
        "Content-Type": "application/json",
        "ApiKey" : ApiKey,
      },
    }); 
    return idCategoria;
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

function armarJsonCategoria(obj) {
  const suscriptorId = localStorage.getItem("idSuscriptor");
  const json = {
    Nombre: obj.nombre,
    SuscriptorId: suscriptorId
  };
  return json;
}


