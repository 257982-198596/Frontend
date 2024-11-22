import axios from "axios";
import { urlAPI } from "../api/api";

//Get - Servicios de un Cliente (Find All de cliente)
export const obtenerServiciosClienteAPI = async (idCliente) => {
  try {
    const response = await axios.get(
      `${urlAPI}serviciosdelcliente/${idCliente}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    if (response.status === 200) {
      console.log(response.data);
      return response;
    } else {
      throw new Error("Error al obtener servicios del cliente");
    }
  } catch (error) {
    console.error(
      "Error al realizar el GET SERVICIOS DEL CLIENTE:",
      error.response?.data || error.message
    );
    console.log(error.response.data.errors.Nombre);
    throw new Error(
      error.response?.data?.message || "Error GET SERVICIOS DEL CLIENTE"
    );
  }
};

export const asociarServicioAPI = async (idCliente) => {
  try {
    console.log('idCliente', idCliente)
  } catch (error) {
    console.error(
      "Error al realizar el GET SERVICIOS DEL CLIENTE:",
      error.response?.data || error.message
    );
    console.log(error.response.data.errors.Nombre);
    throw new Error(
      error.response?.data?.message || "Error GET SERVICIOS DEL CLIENTE"
    );
}
};
