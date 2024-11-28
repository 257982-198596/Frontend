import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServiciosActivosEnApi, getServiciosPagosEnApi } from "../../api/servicioServiciosDelCliente";


function FormularioCobro({ formData, handleChange, onSubmit, modo, lasMonedas, losClientes, losMediosDePago, clienteId  }) {
    const isReadOnly = modo === "detalle";
    const [losServicios, setLosServicios] = useState([]);

    useEffect(() => {
        const fetchServicios = async () => {
            if (!clienteId) return; 
            
            try {
                let response;
                if (modo === "detalle") {
                    // Obtener servicios pagados
                    response = await getServiciosPagosEnApi(clienteId);
                    
                    
                } else {
                    // Obtener servicios activos
                    response = await getServiciosActivosEnApi(clienteId);
                }
                setLosServicios(response.data); // Actualizar la lista de servicios
            } catch (error) {
                console.error("Error al obtener los servicios:", error);
            }
        };
    
        fetchServicios();
    }, [clienteId, modo]); // Ejecutar cada vez que cambie el cliente o el modo
    

    return (
        <Form onSubmit={onSubmit}>
            
            <Form.Group className="mb-3">
                <Form.Label htmlFor="cliente">Cliente</Form.Label>
                <Form.Select
                    id="cliente"
                    name="cliente"
                    value={formData.cliente}
                    onChange={handleChange}
                    disabled={isReadOnly}
                >
                    <option value="">Seleccione un cliente</option>
                    {losClientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nombre}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label htmlFor="servicio">
            {modo === "detalle" ? "Servicio Pago" : "Servicio Activo (a pagar) *Seleccione primero el cliente"}
            </Form.Label>
                <Form.Select
                    id="servicio"
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleChange}
                    disabled={isReadOnly}
                >
                    <option value="">Seleccione un servicio</option>
                    {losServicios.map((servicio) => (
                        <option key={servicio.id} value={servicio.id}>
                            {servicio.descripcion}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="monto">Monto</Form.Label>
                <Form.Control
                    type="number"
                    id="monto"
                    name="monto"
                    value={formData.monto}
                    onChange={handleChange}
                    placeholder="Ingrese el monto del cobro"
                    readOnly={isReadOnly}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="moneda">Moneda</Form.Label>
                <Form.Select
                    id="moneda"
                    name="moneda"
                    value={formData.moneda}
                    onChange={handleChange}
                    disabled={isReadOnly}
                >
                    <option value="">Seleccione una moneda</option>
                    {lasMonedas.map((moneda) => (
                        <option key={moneda.id} value={moneda.id}>
                            {moneda.nombre}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="medioDePago">Medio de Pago</Form.Label>
                <Form.Select
                    id="medioDePago"
                    name="medioDePago"
                    value={formData.medioDePago}
                    onChange={handleChange}
                    disabled={isReadOnly}
                >
                    <option value="">Seleccione una medios de pago</option>
                    {losMediosDePago.map((mediosDePago) => (
                        
                        <option key={mediosDePago.id} value={mediosDePago.id}>
                            {mediosDePago.nombre}
                        </option>
                        
                    ))}
                </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-center">
                {!isReadOnly && (
                    <Button variant="dark" type="submit" className="botones-formularios">
                        {modo === "alta" ? "Crear Cobro" : "Guardar Cambios"}
                    </Button>
                )}
                <Link to="/cobros">
                    <Button variant="secondary" className="botones-formularios">
                        Volver al Listado
                    </Button>
                </Link>
            </div>
        </Form>
    );
}

export default FormularioCobro;
