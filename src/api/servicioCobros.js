import axios from "axios";
import { urlAPI } from "../api/api";

//Get - Cobros (Find All)
export const getCobrosApi = async () => {
  try {
    const response = await axios.get(`${urlAPI}cobrosrecibidos`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (response.status === 200) {
      return response; 
    } else {
      throw new Error("Error al obtener cobros");
    }
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};


//ELIMINAR COBRO
export const borrarCobroEnAPI = async (idCobro) => {
  try {
    console.log("id", idCobro);
    const response = await axios.delete(`${urlAPI}cobrosrecibidos/${idCobro}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }); 
    return idCobro;
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};
  
//POST NUEVO COBRO
export const postNuevoCobroAPI = async (objCobro) => {
  try {
    console.log('objCobro', objCobro)
    const response = await axios.post(
      `${urlAPI}cobrosrecibidos`,
      armarJsonCobro(objCobro),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 201 || response.status === 200) {
      return response;
    } else {
      throw new Error("Error al crear cobro");
    }
  } catch (error) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};
  

// PUT - ACTUALIZAR COBRO
export const putActualizarCobroAPI = async (objcobro) => {
  try {
    const response = await axios.put(
      `${urlAPI}cobrosrecibidos/${objcobro.id}`,
      armarJsonCobro(objcobro),
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

function armarJsonCobro(obj) {
  const json = {
    ClienteId: obj.cliente,
    ServicioDelClienteId: obj.servicio,
    Monto: obj.monto,
    MonedaDelCobroId: obj.moneda,
    fechaDePago: obj.fechaDePago,
    MedioPagoId: obj.medioDePago
  };
  console.log('json', json)
  return json;
}