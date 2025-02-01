import axios from "axios";
import { urlAPI, ApiKey } from "../api/api";

// Get - Servicios by SuscriptorId
export const getServiciosApi = async (suscriptorId) => {
  try {
    const response = await axios.get(`${urlAPI}servicios/suscriptor/${suscriptorId}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "ApiKey" : ApiKey,
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Error al obtener servicios");
    }
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

// POST - NUEVO SERVICIO
export const postNuevoServicioAPI = async (objServicio) => {
  try {
    const response = await axios.post(
      `${urlAPI}servicios`,
      armarJsonServicio(objServicio),
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

// PUT - ACTUALIZAR SERVICIO
export const putActualizarServicioAPI = async (objServicio) => {
  try {
    const response = await axios.put(
      `${urlAPI}servicios/${objServicio.id}`,
      armarJsonServicio(objServicio),
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
      throw new Error("Error al actualizar servicio");
    }
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

//ELIMINAR SERVICIO
export const borrarServicioEnAPI = async (idServicio) => {
  try {
    console.log("id", idServicio);
    const response = await axios.delete(`${urlAPI}servicios/${idServicio}`, {
      headers: {
        "Content-Type": "application/json",
        "ApiKey" : ApiKey,
      },
    }); 
    return idServicio;
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

function armarJsonServicio(obj) {
  const suscriptorId = localStorage.getItem("idSuscriptor");
  const json = {
    SuscriptorId: suscriptorId,
    Nombre: obj.nombre,
    Descripcion: obj.descripcion,
    CategoriaId: obj.categoriaId

  };
  return json;
}