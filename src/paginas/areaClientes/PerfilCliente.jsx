import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getClienteById, putActualizarPerfilClienteAPI } from '../../api/servicioClientes';
import { mostrarError, mostrarSuccess } from '../../componentes/Toasts';
import { cargarClientes } from '../../slices/sliceClientes';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

export default function PerfilCliente() {
  const dispatch = useDispatch();
  const clienteId = localStorage.getItem('idCliente');
  const [cliente, setCliente] = useState(null);
  const losDocumentos = useSelector((state) => state.sliceTiposDocumentos.tiposDocumentos);
  const losPaises = useSelector((state) => state.slicePaises.paises);

  const [formData, setFormData] = useState({
    nombre: '',
    idDocumento: '',
    numDocumento: '',
    telefono: '',
    direccion: '',
    persona: '',
    idPais: '',
    email: '',
    password: '', 
  });

  useEffect(() => {
    async function fetchCliente() {
      try {
        const response = await getClienteById(clienteId);
        setCliente(response.data);
        console.log('Cliente:', response.data);
        setFormData({
          nombre: response.data.nombre || '',
          idDocumento: response.data.documentoId || '',
          numDocumento: response.data.numDocumento || '',
          telefono: response.data.telefono || '',
          direccion: response.data.direccion || '',
          persona: response.data.personaContacto || '',
          idPais: response.data.paisId || '',
          email: response.data.usuarioLogin?.email || '',
          password: response.data.usuarioLogin?.password || '' ,
          suscriptorId: response.data.suscriptorId || '',
        });
        //guardado del suscriptor para reutilizar funcion de actualizacion clientes
        localStorage.setItem('idSuscriptor', response.data.suscriptorId);
      } catch (error) {
        console.error('Error al obtener cliente:', error);
      }
    }

    fetchCliente();

  }, [clienteId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarFormulario = (formData) => {
    if (!formData.nombre) {
      mostrarError('El nombre es obligatorio');
      return false;
    }
    if (formData.nombre.length <= 3) {
      mostrarError('El nombre debe tener más de 3 caracteres');
      return false;
    }
    if (!formData.idDocumento) {
      mostrarError('El tipo de documento es obligatorio');
      return false;
    }
    if (!formData.numDocumento) {
      mostrarError('El número de documento es obligatorio');
      return false;
    }
    if (!/^\d+$/.test(formData.numDocumento)) {
      mostrarError('El número de documento debe ser numérico');
      return false;
    }
    if (!formData.telefono) {
      mostrarError('El número de teléfono es obligatorio');
      return false;
    }
    if (formData.telefono.length <= 7) {
      mostrarError('El teléfono debe tener más de 7 caracteres');
      return false;
    }
    if (!/^\d+$/.test(formData.telefono)) {
      mostrarError('El teléfono debe ser numérico');
      return false;
    }
    if (!formData.direccion) {
      mostrarError('El campo dirección es obligatorio');
      return false;
    }
    if (formData.direccion.length <= 5) {
      mostrarError('La dirección debe tener más de 5 caracteres');
      return false;
    }
    if (!formData.persona) {
      mostrarError('La persona de contacto es obligatoria');
      return false;
    }
    if (formData.persona.length <= 5) {
      mostrarError('La persona de contacto debe tener más de 5 caracteres');
      return false;
    }
    if (!formData.idPais) {
      mostrarError('El país de origen es obligatorio');
      return false;
    }
    if (!formData.email) {
      mostrarError('El correo electrónico es obligatorio');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      mostrarError('El correo electrónico no es válido');
      return false;
    }
    return true;
  };

  const submitEditarCliente = async (event) => {
    event.preventDefault();
    if (!validarFormulario(formData)) {
      return;
    }
    try {
      console.log('Editando cliente', formData);
      const objCliente = { id: clienteId, ...formData };
      const respuestaAPI = await putActualizarPerfilClienteAPI(objCliente);
      if (respuestaAPI.status === 200) {
        dispatch(cargarClientes(respuestaAPI.data));
        mostrarSuccess('Datos actualizados correctamente');
      }
    } catch (error) {
      mostrarError(error.message);
    }
  };

  if (!cliente) {
    return <p>Cliente no encontrado.</p>;
  }

  return (
    <div className="container-fluid">
      <h3>Perfil del Cliente</h3>
      <Form onSubmit={submitEditarCliente}>
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
          <Form.Label htmlFor="idDocumento">Seleccione Tipo de Documento *</Form.Label>
          <Form.Select
            id="idDocumento"
            name="idDocumento"
            value={formData.idDocumento}
            onChange={handleChange}
            disabled={true}
          >
            <option value="">Seleccione un tipo</option>
            {losDocumentos.map((tipodoc) => (
              <option key={tipodoc.id} value={tipodoc.id}>
                {tipodoc.nombre}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="numDocumento">Número de Documento *</Form.Label>
          <Form.Control
            type="number"
            id="numDocumento"
            name="numDocumento"
            value={formData.numDocumento}
            onChange={handleChange}
            readOnly={true}
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
          <Form.Label htmlFor="idPais">País de Origen *</Form.Label>
          <Form.Select
            id="idPais"
            name="idPais"
            value={formData.idPais}
            onChange={handleChange}
          >
            <option value="">Seleccione un pais</option>
            {losPaises.map((pais) => (
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
            readOnly={true}
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
            Guardar Cambios
          </Button>
        </div>
        <ToastContainer />
      </Form>
    </div>
  );
}
