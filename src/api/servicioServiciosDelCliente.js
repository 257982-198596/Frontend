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

//Get - Servicios ACTIVOS de un Cliente 
export const getServiciosActivosEnApi = async (idCliente) => {
  try {
    const response = await axios.get(
      `${urlAPI}serviciosdelcliente/activos/${idCliente}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Error al obtener servicios ACTIVOS del cliente");
    }
  } catch (error) {
    console.error(
      "Error al realizar el GET SERVICIOS ACTIVOS DEL CLIENTE:",
      error.response?.data || error.message
    );
    console.log(error.response.data.errors.Nombre);
    throw new Error(
      error.response?.data?.message || "Error GET SERVICIOS ACTIVOS DEL CLIENTE"
    );
  }
};

//Get - Servicios PAGOS de un Cliente 
export const getServiciosPagosEnApi = async (idCliente) => {
  try {
    const response = await axios.get(
      `${urlAPI}serviciosdelcliente/pagos/${idCliente}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Error al obtener servicios PAGOS del cliente");
    }
  } catch (error) {
    console.error(
      "Error al realizar el GET SERVICIOS PAGOS DEL CLIENTE:",
      error.response?.data || error.message
    );
    console.log(error.response.data.errors.Nombre);
    throw new Error(
      error.response?.data?.message || "Error GET SERVICIOS PAGOS DEL CLIENTE"
    );
  }
};

//Get by ID - Servicios de un Cliente 
export const obtenerServicioDelClienteAPI = async (idServicioDelCliente) => {
  try {
    const response = await axios.get(
      //TODO sacar id innecesario
      `${urlAPI}serviciosdelcliente/1/${idServicioDelCliente}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Error al obtener servicio del cliente");
    }
  } catch (error) {
    console.error(
      "Error al realizar el POST SERVICIOS DEL CLIENTE:",
      error.response?.data || error.message
    );
    console.log(error.response.data.errors.Nombre);
    throw new Error(
      error.response?.data?.message || "Error POST SERVICIOS DEL CLIENTE"
    );
}
}  
//POST - Nuevo Servicios de un Cliente 
export const postServicioDelClienteAPI = async (objServicioCliente) => {
  try {
    const response = await axios.post(
        `${urlAPI}serviciosdelcliente`,
        JSON.stringify(objServicioCliente),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        return response;
      } else {
        throw new Error("Error al crear cliente");
      }
  } catch (error) {
    console.error(
      "Error al realizar el POST SERVICIOS DEL CLIENTE:",
      error.response?.data || error.message
    );
    console.log(error.response.data.errors.Nombre);
    throw new Error(
      error.response?.data?.message || "Error POST SERVICIOS DEL CLIENTE"
    );
}
};

//PUT - Actualizar Servicios de un Cliente 
export const putServicioDelClienteAPI = async (idServicioCliente, objServicioCliente) => {
  try {
    console.log(objServicioCliente)
    const response = await axios.put(
        `${urlAPI}serviciosdelcliente/${idServicioCliente}`,
        JSON.stringify(objServicioCliente),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        return response;
      } else {
        throw new Error("Error al actualizar servicio del cliente");
      }
  } catch (error) {
    console.error(
      "Error al realizar el POST SERVICIOS DEL CLIENTE:",
      error.response?.data || error.message
    );
    console.log(error.response.data.errors.Nombre);
    throw new Error(
      error.response?.data?.message || "Error POST SERVICIOS DEL CLIENTE"
    );
}
};

// DELETE - Eliminar Servicio de un Cliente
export const eliminarServicioDelClienteAPI = async (idServicioCliente) => {
  try {
    const response = await axios.delete(
      `${urlAPI}serviciosdelcliente/${idServicioCliente}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return idServicioCliente;
  } catch (error) {
    console.error(
      "Error al realizar el DELETE:",
      error.response?.data || error.message
    );
    console.log(error.response.data.errors);
    throw new Error(
      error.response?.data?.message || "Error al eliminar servicio del cliente"
    );
  }
};
