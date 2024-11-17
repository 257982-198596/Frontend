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
const jsonCliente = {
  "idUsuarioSuscriptor": "1",
  "nombre": "OSE Uruguay",
  "DocumentoId": "2",
  "numDocumento": "3848348348",
  "telefono": "09748758",
  "direccion": "Test 23423",
  "PersonaContacto": "Pedro Al",
  "PaisId": "9",
  "UsuarioLogin":{
      "Email":"pedro@ose.com.uy",
      "Password":"123"
  }
};
export const postNuevoClienteAPI = async (objCliente) => {
  try {
    const response = await axios.post(
      `${urlAPI}clientes`,
      armarJson(objCliente),
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

function armarJson(obj) {
  console.log('obj', obj)
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
  }
  console.log("json", json);
  return json;
}