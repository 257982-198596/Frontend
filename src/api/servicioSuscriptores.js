import axios from "axios";
import { urlAPI, ApiKey } from "../api/api";

// POST - NUEVO SUSCRIPTOR
export const postNuevoSuscriptorAPI = async (objSuscriptor) => {
  try {
    const response = await axios.post(
      `${urlAPI}suscriptores`,
      armarJsonSuscriptor(objSuscriptor),
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

export const obtenerSuscriptorPorIdUsuarioApi = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    console.log("id", id);
    const response = await axios.get(`${urlAPI}suscriptores/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "ApiKey" : ApiKey,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

function armarJsonSuscriptor(obj) {
    console.log(obj);
  const json = {
    nombre: obj.nombre,
    DocumentoId: obj.idDocumento,
    rut: obj.rut,
    telefono: obj.telefono,
    direccion: obj.direccion,
    PersonaContacto: obj.persona,
    PaisId: obj.PaisId,
    UsuarioLogin: {
      Email: obj.email,
      Password: obj.password,
    },
  };
  return json;
}
