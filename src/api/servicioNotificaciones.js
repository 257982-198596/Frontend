import axios from "axios";
import { urlAPI } from "../api/api";

//Get - Servicios (Find All)
export const getNotificacionesApi = async () => {
  try {
    const response = await axios.get(`${urlAPI}notificaciones`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
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

export const enviarRecordatorioAPI = async (idServicio) => {
    try {

        console.log("Enviando recordatorio para el servicioAPI:", idServicio)
        const response = await axios.post(
          `${urlAPI}notificaciones/enviar`,
          armarJsonNotificacion(idServicio),
          {
            headers: {
              "Content-Type": "application/json",
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



  function armarJsonNotificacion(idServicio) {
    console.log("idServicio", idServicio);
    const json = {
        servicioNotificadoId: idServicio,
    };
    console.log("json", json);
    return json;
  }
