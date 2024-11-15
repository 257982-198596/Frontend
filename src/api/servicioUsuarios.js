const urlAPI = "http://localhost:18190/api/";

//Login - 
export const iniciarSesionApi = async (email, password) => {
    const response = await fetch(`${urlAPI}usuarios/iniciarsesion`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if(response.status == 200){
        const jsonLogin = await response.json();
        console.log(jsonLogin);
        return jsonLogin;
    }else{
        throw "Error al iniciar sesion";    
    }
    
  };