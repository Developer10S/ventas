import React, { createContext, useReducer } from "react";
import { OBTENER_CLIENTES, REGISTRAR_CLIENTE,OBTENER_CLIENTE, MODIFICAR_CLIENTE,ELIMINAR_CLIENTE } from "../const/actionTypes";
import ClienteRedurcer from "../reducer/clienteReducer";
import {v4 as uuidv4} from 'uuid';

export const ClienteContext = createContext();

export const ClienteContextProvider = (props) => {
  const initialState = {
    clientesList: [],
    clienteActual: null
  };

  //dispatch permite enviar una acción
  const [state, dispatch] = useReducer(ClienteRedurcer, initialState);

  const obtenerClientes= () =>{
    const clientes =[
      {
        idCliente: 1,
        nombres: "Mario",
        apellidos: "andres",
        direccion: "centro",
        telefono: "31256987",
        email: "mario@gmail.com",
      },
      {
        idCliente: 2,
        nombres: "Julian",
        apellidos: "ser",
        direccion: "av. 100",
        telefono: "30345434",
        email: "julain@gmail.com",
      },
    ];

    dispatch({
      type: OBTENER_CLIENTES,
      payload: clientes
    })
  }

  const registrarCliente = cliente=>{

    let clienteNuevo={
      ...cliente,
      idCliente: uuidv4()
    }

    console.log(clienteNuevo);
    dispatch({
      type: REGISTRAR_CLIENTE,
      payload: clienteNuevo,
      
    })
  }

  const obtenerCliente=cliente=>{
    dispatch({

      type: OBTENER_CLIENTE,
      payload: cliente

    })
  }

  const actualizarCliente = cliente=>{
    dispatch({
      type: MODIFICAR_CLIENTE,
      payload:cliente
    })
  }

  const eliminarCliente= idCliente=>{
    dispatch({
      type: ELIMINAR_CLIENTE,
      payload: idCliente
    })
  }

  return (
    <ClienteContext.Provider
      value={{
        clientesList: state.clientesList,
        clienteActual: state.clienteActual,

        obtenerClientes,
        registrarCliente,
        obtenerCliente,
        actualizarCliente,
        eliminarCliente
      }}
    >
      {props.children}
    </ClienteContext.Provider>
  )
}
