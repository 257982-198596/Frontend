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

// POST - NUEVO CLIENTE
export const postNuevoClienteAPI = async (objCliente) => {
  try {
    console.log('objCliente', objCliente);
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
    console.error("Error al realizar el POST:", error.response?.data || error.message);
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
      return response; // Devuelve los datos actualizados
    } else {
      throw new Error("Error al actualizar cliente");
    }
  } catch (error) {
    console.error("Error al realizar el PUT:", error.message || error);
    throw new Error("Error al actualizar cliente");
  }
};


//ELIMINAR CLIENTE
export const borrarClienteEnAPI = async (idCliente) => {
  try {
    const response = await axios.delete(`${urlAPI}clientes/${idCliente}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return { idCliente }; 
    } else {
      throw new Error("Error al eliminar cliente");
    }
  } catch (error) {
    console.error("Error al realizar el POST:", error.response?.data || error.message);
    console.log(error.response.data.errors.Nombre);
    throw new Error(error.response?.data?.message || "Error al crear cliente");
  }
};

function armarJsonCliente(obj) {
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