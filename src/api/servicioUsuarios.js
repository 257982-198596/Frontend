const urlAPI = "";

//Login - 
export const iniciarSesionApi = async (usuario, password) => {
    const response = await fetch(`${urlAPI}`, {
      method: "POST",
      body: JSON.stringify({
        usuario: usuario,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const jsonLogin = await response.json();
    return jsonLogin;
  };