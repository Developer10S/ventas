import React, { useContext, useEffect } from "react";
import { ClienteContext } from "../../contexts/clienteContext";
import RowCliente from "./RowCliente";

const TableCliente = () => {
 
  const {clientesList, obtenerClientes} = useContext(ClienteContext);
  
  //jquey, funcion que recibe una funcion

  useEffect(() => {
    obtenerClientes();
    // eslint-disable-next-line
  }, []);

 // const arr = clientesList || [];
//  if( arr === 0) return <p>No existen clientes. </p>
//if (clientesList.length === 0) return <center><p>No existen clientes.</p></center>

  return (
    <div className="table-container">
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Acciones</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Dirección</th>
            <th>Telefono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          { clientesList && clientesList.length ?
           clientesList.map(cliente => (
              <RowCliente cliente={cliente} key={cliente.idCliente} />
            )):null
          }
        </tbody>
      </table>
    </div>
  );
}
 
export default TableCliente;
