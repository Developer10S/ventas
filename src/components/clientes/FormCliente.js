import React, { useContext, useEffect, useState } from "react";
import { ClienteContext } from "../../contexts/clienteContext";
import { ModalContext } from "../../contexts/modalContenx";

const FormCliente = () => {
  const { setShowModal } = useContext(ModalContext);
  const {registrarCliente, clienteActual, obtenerCliente, actualizarCliente} =useContext(ClienteContext);


  const clienteDefault = {
    nombres: "",
    apellidos: "",
    direccion: "",
    telefono: "",
    email: "",
  };
  const [cliente, setCliente] = useState(clienteDefault);
  const [mensaje, setMensaje] = useState(null);

  useEffect(()=>{
    if (clienteActual!==null){
      setCliente({
        ...clienteActual,
        direccion:clienteActual.direccion!==null? clienteActual.direccion:'',
        telefono:clienteActual.telefono!==null? clienteActual.telefono:'',
      })
    }else{
      setCliente(clienteDefault);
    }
  }, [clienteActual]);

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

 

  //funcion para retornar el objeto solo con los valores ingresados
  const obtenerClienteEnviar=()=>{
    let clineteTemp={...cliente};
    if(clineteTemp.direccion==='') delete clineteTemp.direccion;    
    if(clineteTemp.telefono==='') delete clineteTemp.telefono;
    return clineteTemp;
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    //validaciones
    if (
      cliente.nombres.trim() === "" ||
      cliente.apellidos.trim() === "" ||
      cliente.email.trim() === ""
    ) {
      setMensaje("Los nombres, apellidos y email son requeridos");
      return;
    }
    //obtener el objeto a enviar
    if(clienteActual!==null){      
      actualizarCliente(obtenerClienteEnviar());
    }else{
      registrarCliente(obtenerClienteEnviar());
    }
  
    //limpiar y cerra el modal
   
    cerrarModal();    
  };

  const cerrarModal = () => {
    limpiarForm();
    setShowModal(false);
    obtenerCliente(null);
  };

  const limpiarForm=()=>{
    setMensaje(null);
    setCliente(clienteDefault);
  } 
  return (
    <form onSubmit={handleOnSubmit}>
        {mensaje ? <div className="notification is-danger">{mensaje}</div>:null}
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Nombre Completo</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control is-expanded has-icons-left">
              <input
                autoComplete="off"
                className="input"
                type="text"
                placeholder="Nombre"
                name="nombres"
                value={cliente.nombres}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control is-expanded">
              <input
                autoComplete="off"
                className="input"
                type="text"
                placeholder="Apellidos"
                name="apellidos"
                value={cliente.apellidos}
                onChange={handleChange}
              />
            </p>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Direccion</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control is-expanded has-icons-left">
              <input
                autoComplete="off"
                className="input"
                type="text"
                placeholder="Ingrese su direccion"
                name="direccion"
                value={cliente.direccion}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-map-marked-alt"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Telefono</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control is-expanded has-icons-left">
              <input
                autoComplete="off"
                className="input"
                type="text"
                placeholder="Telefono"
                name="telefono"
                value={cliente.telefono}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-phone"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Email</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control is-expanded has-icons-left">
              <input
                autoComplete="off"
                className="input"
                type="email"
                placeholder="Ingrese su Email"
                name="email"
                value={cliente.email}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="field is-horizontal">
        <div className="field-label"></div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary mr-1">
                Guardar
              </button>
              <button
                type="button"
                className="button"
                onClick={() => cerrarModal()}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormCliente;
