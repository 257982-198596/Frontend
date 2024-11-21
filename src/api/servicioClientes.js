import axios from "axios";
import { urlAPI } from "../api/api";

//Get - Clientes (Find All)
export const getClientesApi = async () => {
  try {
    const response = await axios.get(`${urlAPI}clientes`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Error al obtener clientes");
    }
  } catch (error) {
    console.error(
      "Error al realizar el GET CLIENTES:",
      error.response?.data || error.message
    );
    console.log(error.response.data.errors.Nombre);
    throw new Error(error.response?.data?.message || "Error GET CLIENTES");
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
    } else {
      throw new Error("Error al crear cliente");
    }
  } catch (error) {
    console.error(
      "Error al realizar el POST:",
      error.response?.data || error.message
    );
    console.log(error.response.data.errors.Nombre);
    throw new Error(error.response?.data?.message || "Error al crear cliente");
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
    console.error(
      "Error al realizar el PUT CLIENTES:",
      error.response?.data || error.message
    );
    console.log(error.response.data.errors.Nombre);
    throw new Error(
      error.response?.data?.message || "Error al actualizar cliente"
    );
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
    console.error(
      "Error al realizar el DELETE:",
      error.response?.data || error.message
    );
    console.log(error.response.data.errors);
    throw new Error(
      error.response?.data?.message || "Error al eliminar cliente"
    );
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
