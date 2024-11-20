import { urlAPI } from "../api/api";

//Get - Tipos Documentos (Find All)
export const getTiposDocumentosApi = async () => {
    const response = await fetch(`${urlAPI}documentos`, {
      method: "GET",
      
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if(response.status == 200){
        const jsonLogin = await response.json();
        
        return jsonLogin;
    }else{
        throw "Error al obtener clientes";    
    }
    
  };

  
  