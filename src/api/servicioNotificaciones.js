import axios from "axios";
import { urlAPI, ApiKey } from "../api/api";

//Get - Notificaciones (Find All)
export const getNotificacionesApi = async (suscriptorId) => {
  try {
    const response = await axios.get(`${urlAPI}notificaciones/suscriptor/${suscriptorId}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "ApiKey" : ApiKey,
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Error al obtener notificaciones");
    }
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

export const obtenerCantidadNotificacionesAPI = async (clienteId) => {
  try {
    const response = await axios.get(`${urlAPI}notificaciones/cantidad-notificaciones/${clienteId}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "ApiKey" : ApiKey,
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Error al obtener la cantidad de notificaciones");
    }
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

export const enviarRecordatorioAPI = async (idServicio) => {
    try {

        console.log("Enviando recordatorio para el servicioAPI:", idServicio)
        const response = await axios.post(
          `${urlAPI}notificaciones/enviar`,
          armarJsonNotificacion(idServicio),
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
    }

export const getNotificacionesPorMesApi = async (suscriptorId, year) => {
  try {
    const response = await axios.get(`${urlAPI}notificaciones/suscriptor/${suscriptorId}/anio/${year}/notificaciones-por-mes`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "ApiKey" : ApiKey,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error al obtener notificaciones por mes");
    }
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

  function armarJsonNotificacion(idServicio) {
    console.log("idServicio", idServicio);
    const json = {
        servicioNotificadoId: idServicio,
    };
    console.log("json", json);
    return json;
  }
