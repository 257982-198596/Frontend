import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getPaisesApi } from "../api/servicioPaises"; 
import { useDispatch } from "react-redux";
import { cargarPaises } from "../slices/slicePaises"; 
import { postNuevoSuscriptorAPI } from "../api/servicioSuscriptores";
import { mostrarError, mostrarSuccess } from "../componentes/Toasts";

function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    rut: "",
    numDocumento: "",
    telefono: "",
    direccion: "",
    persona: "",
    PaisId: "",
    email: "",
    password: "",
  });

  const [paises, setPaises] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarFormulario = (formData) => {
    if (!formData.nombre) {
      mostrarError("El nombre es obligatorio");
      return false;
    }
    if (formData.nombre.length <= 3) {
      mostrarError("El nombre debe tener más de 3 caracteres");
      return false;
    }
    if (!formData.rut) {
      mostrarError("El RUT es obligatorio");
      return false;
    }
    if (!/^\d{12}$/.test(formData.rut)) {
      mostrarError("El RUT debe tener exactamente 12 caracteres numéricos");
      return false;
    }
    if (!formData.telefono) {
      mostrarError("El número de teléfono es obligatorio");
      return false;
    }
    if (formData.telefono.length <= 7) {
      mostrarError("El teléfono debe tener más de 7 caracteres");
      return false;
    }
    if (formData.telefono.length >= 15) {
      mostrarError("El teléfono debe tener menos de 15 caracteres");
      return false;
    }
    if (!/^\d+$/.test(formData.telefono)) {
      mostrarError("El teléfono debe ser numérico");
      return false;
    }
    if (!formData.direccion) {
      mostrarError("El campo dirección es obligatorio");
      return false;
    }
    if (formData.direccion.length <= 5) {
      mostrarError("La dirección debe tener más de 5 caracteres");
      return false;
    }
    if (!formData.persona) {
      mostrarError("La persona de contacto es obligatoria");
      return false;
    }
    if (formData.persona.length <= 5) {
      mostrarError("La persona de contacto debe tener más de 5 caracteres");
      return false;
    }
    if (!formData.PaisId) {
      mostrarError("El país de origen es obligatorio");
      return false;
    }
    if (!formData.email) {
      mostrarError("El correo electrónico es obligatorio");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      mostrarError("El correo electrónico no es válido");
      return false;
    }
    if (!formData.password) {
      mostrarError("La contraseña es obligatoria");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario(formData)) {
      return;
    }
    try {
      const response = await postNuevoSuscriptorAPI(formData);
      if (response.status === 201) {
        mostrarSuccess("Suscriptor registrado exitosamente");
      }
    } catch (error) {
      mostrarError("Error al registrar el suscriptor: " + error.message);
    }
  };

  useEffect(() => {
    const GetPaises = async () => {
      try {
        const response = await getPaisesApi();
        if (response.status === 200) {
          const payload = {
            paisesStore: response.data,
          };
          dispatch(cargarPaises(payload));
          setPaises(response.data); 
        } else {
          throw new Error("Error al obtener paises");
        }
      } catch (error) {
        console.log("Error API Paises", error);
      }
    };

    GetPaises();
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-4">
          <h3>Registro de Suscriptores</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="nombre">Nombre del cliente *</Form.Label>
              <Form.Control
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingrese el nombre del cliente"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="rut">RUT *</Form.Label>
              <Form.Control
                type="text"
                id="rut"
                name="rut"
                value={formData.rut}
                onChange={handleChange}
                placeholder="Ingrese el RUT"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="telefono">Número de Teléfono *</Form.Label>
              <Form.Control
                type="number"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="direccion">Dirección *</Form.Label>
              <Form.Control
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="persona">Persona de Contacto *</Form.Label>
              <Form.Control
                type="text"
                id="persona"
                name="persona"
                value={formData.persona}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="PaisId">País de Origen *</Form.Label>
              <Form.Select
                id="PaisId"
                name="PaisId"
                value={formData.PaisId}
                onChange={handleChange}
              >
                <option value="">Seleccione un pais</option>
                {paises.map((pais) => (
                  <option key={pais.id} value={pais.id}>
                    {pais.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Correo Electrónico *</Form.Label>
              <Form.Control
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Contraseña *</Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button variant="dark" type="submit" className="botones-formularios">
                Registrar
              </Button>
              <Link to="/login">
                <Button variant="secondary" className="botones-formularios">Volver al Login</Button>
              </Link>
            </div>
            <ToastContainer />
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Registro;