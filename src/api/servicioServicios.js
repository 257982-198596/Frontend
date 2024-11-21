import axios from "axios";
import { urlAPI } from "../api/api";

//Get - Servicios (Find All)
export const getServiciosApi = async () => {
  try {
    const response = await axios.get(`${urlAPI}servicios`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Error al obtener servicios");
    }
  } catch (error) {
    console.error(
      "Error al realizar el GET SERVICIOS:",
      error.response?.data || error.message
    );
    console.log(error.response.data.errors.Nombre);
    throw new Error(error.response?.data?.message || "Error GET SERVICIOS");
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
        },
      }
    );
    if (response.status === 201 || response.status === 200) {
      return response;
    } else {
      throw new Error("Error al crear servicio");
    }
  } catch (error) {
    console.error(
      "Error al realizar el POST:",
      error.response?.data || error.message
    );
    console.log(error.response.data.errors.Nombre);
    throw new Error(error.response?.data?.message || "Error al crear servicio");
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
        },
      }
    );

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Error al actualizar servicio");
    }
  } catch (error) {
    console.error(
      "Error al realizar el PUT SERVICIO",
      error.response?.data || error.message
    );
    console.log(error.response.data.errors.Nombre);
    throw new Error(
      error.response?.data?.message || "Error al actualizar servicio"
    );
  }
};

//ELIMINAR SERVICIO
export const borrarServicioEnAPI = async (idServicio) => {
  try {
    console.log("id", idServicio);
    const response = await axios.delete(`${urlAPI}servicios/${idServicio}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }); 
    return idServicio;
  } catch (error) {
    console.error(
      "Error al realizar el DELETE de SERVICIO",
      error.response?.data || error.message
    );
    console.log(error.response.data.errors);
    throw new Error(
      error.response?.data?.message || "Error al eliminar servicio"
    );
  }
};

function armarJsonServicio(obj) {
  const json = {
    SuscriptorId: obj.idUsuarioSuscriptor,
    Nombre: obj.nombre,
    Descripcion: obj.descripcion,
    CategoriaId: obj.categoriaId

  };
  return json;
}