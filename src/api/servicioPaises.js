const urlAPI = "http://localhost:18190/api/";

//Get - Paises (Find All)
export const getPaisesApi = async () => {
    const response = await fetch(`${urlAPI}paises`, {
      method: "GET",
      
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if(response.status == 200){
        const jsonLogin = await response.json();
        
        return jsonLogin;
    }else{
        throw "Error al obtener paises";    
    }
    
  };

  
  