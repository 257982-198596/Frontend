import axios from "axios";
import { urlAPI } from "../api/api";

// Get - Clientes by SuscriptorId
export const getClientesApi = async (suscriptorId) => {
  try {
    console.log("URL DE LA API servicioClientes", urlAPI);
    const response = await axios.get(`${urlAPI}clientes/suscriptor/${suscriptorId}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    console.log("response.data", response.data);
    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Error al obtener clientes");
    }
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

// POST - NUEVO CLIENTE
export const postNuevoClienteAPI = async (objCliente) => {
  try {
    const response = await axios.post(
      `${urlAPI}clientes`,
      armarJsonCliente(objCliente),
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
};

// PUT - ACTUALIZAR CLIENTE
export const putActualizarClienteAPI = async (objCliente) => {
  try {
    const response = await axios.put(
      `${urlAPI}clientes/${objCliente.id}`,
      armarJsonCliente(objCliente),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Error al actualizar cliente");
    }
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

//ELIMINAR CLIENTE
export const borrarClienteEnAPI = async (idCliente) => {
  try {
    console.log("id", idCliente);
    const response = await axios.delete(`${urlAPI}clientes/${idCliente}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }); 
    return idCliente;
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

// PUT - HABILITAR CLIENTE
export const habilitarClienteEnAPI = async (idCliente) => {
  try {
    const response = await axios.put(`${urlAPI}clientes/habilitar/${idCliente}`, {}, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Error al habilitar cliente");
    }
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

// PUT - DESHABILITAR CLIENTE
export const deshabilitarClienteEnAPI = async (idCliente) => {
  try {
    const response = await axios.put(`${urlAPI}clientes/deshabilitar/${idCliente}`, {}, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Error al deshabilitar cliente");
    }
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

function armarJsonCliente(obj) {
  const json = {
    SuscriptorId: obj.idUsuarioSuscriptor,
    nombre: obj.nombre,
    DocumentoId: obj.idDocumento,
    numDocumento: obj.numDocumento,
    telefono: obj.telefono,
    direccion: obj.direccion,
    PersonaContacto: obj.persona,
    PaisId: obj.idPais,
    UsuarioLogin: {
      Email: obj.email,
      Password: obj.password,
    },
  };
  return json;
}
