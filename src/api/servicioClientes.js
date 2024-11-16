import axios from "axios";

const urlAPI = "http://localhost:18190/api/";

//Get - Clientes (Find All)
export const getClientesApi = async () => {
  const response = await fetch(`${urlAPI}clientes`, {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (response.status == 200) {
    const jsonLogin = await response.json();

    return jsonLogin;
  } else {
    throw "Error al obtener clientes";
  }
};

//ALTA CLIENTE

export const postNuevoClienteAPI = async (objCliente) => {
  try {
    const response = await axios.post(
      `${urlAPI}clientes`,
      {
        idUsuarioSuscriptor: objCliente.idUsuarioSuscriptor,
        nombre: objCliente.nombre,
        DocumentoId: objCliente.idDocumento,
        numDocumento: objCliente.numeroDocumento,
        telefono: objCliente.telefono,
        direccion: objCliente.direccion,
        PersonaContacto: objCliente.persona,
        PaisId: objCliente.idPais,
        UsuarioLogin: {
          Email: objCliente.email,
          Password: objCliente.password,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error al crear cliente");
    }
  } catch (error) {
    console.error("Error al realizar el POST:", error.message || error);
    throw new Error("Error al crear cliente");
  }
};

//ELIMINAR CLIENTE
export const borrarClienteEnAPI = async () => {
  const response = await fetch(`${urlAPI}clientes`, {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (response.status == 200) {
    const jsonLogin = await response.json();

    return jsonLogin;
  } else {
    throw "Error al obtener clientes";
  }
};
