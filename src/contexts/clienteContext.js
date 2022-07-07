import React, { createContext, useReducer } from 'react';
import ClienteRedurcer from '../reducer/clienteReducer';

import Axios from 'axios';
import Swal from 'sweetalert2'

import { ELIMINAR_CLIENTE, MODIFICAR_CLIENTE, OBTENER_CLIENTE, OBTENER_CLIENTES, REGISTRAR_CLIENTE } from '../const/actionTypes';

export const ClienteContext = createContext();

export const ClienteContextProvider = props => {

  const initialState = {
    clientesList: [],
    clienteActual: null
  }

  const [state, dispatch] = useReducer(ClienteRedurcer, initialState);

  const obtenerClientes = async () => {
    try {
      const resultado = await Axios.get('/personas');
      dispatch({
        type: OBTENER_CLIENTES,
        payload: resultado.data
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener los clientes',
        toast: true
      });
      console.log(error);
    }
  }

  const registrarCliente = async persona => {
    try {
      const resultado = await Axios.post('/personas', persona);
      dispatch({
        type: REGISTRAR_CLIENTE,
        payload: resultado.data
      })
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Cliente registrado correctamente.',
        toast: true
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar el cliente',
        toast: true
      });
      console.log(error);
    }
  }
  
  const obtenerCliente = async persona => {
    try {
      let clienteEncontrado = null;
      if(persona !== null) {
        const resultado = await Axios.get(`/personas/${persona.idPersona}`);
        clienteEncontrado = resultado.data;
      } else {
        clienteEncontrado = persona;
      }

      dispatch({
        type: OBTENER_CLIENTE,
        payload: clienteEncontrado
      })

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener el cliente',
        toast: true
      });
      console.log(error);
    }
  }

  const actualizarCliente = async persona => {
    try {
      const resultado = await Axios.put(`/personas`, persona);
        
      dispatch({
        type: MODIFICAR_CLIENTE,
        payload: resultado.data,
      })

      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Cliente modificado correctamente.',
        toast: true
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo modificar el cliente',
        toast: true
      });
      console.log(error);
    }
  }

  const eliminarCliente = async idPersona => {
    try {

      Swal.fire({
        title: '¿Desea continuar?',
        text: 'Se eliminará el cliente seleccionado',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar'
      }).then(async (result) => {
        if(result.value) {
          await Axios.delete(`/personas/${idPersona}`);
          dispatch({
            type: ELIMINAR_CLIENTE,
            payload: idPersona
          })
          
          Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'Cliente eliminado correctamente.',
            toast: true
          });
        }
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el cliente',
        toast: true
      });
      console.log(error);
    }
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
        eliminarCliente,
      }}
    >
      {props.children}
    </ClienteContext.Provider>
  )
}