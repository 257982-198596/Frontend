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
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
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
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
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
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
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
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
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
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
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
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
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
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};
