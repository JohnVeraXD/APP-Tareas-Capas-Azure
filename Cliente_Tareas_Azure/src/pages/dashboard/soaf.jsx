import React, { useState } from 'react';
import axios from "axios";

const SoapClient = () => {
  const [result, setResult] = useState('');

  const callSoapService = async (methodName, args = {}) => {
    // Configurar la URL del servicio SOAP
    const url = 'http://localhost:8000/';

    // Construir la solicitud SOAP
    const soapRequest = `
   <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/ xmlns:web="http://example.com/">
     <soapenv:Header/>
     <soapenv:Body>
       <web:${methodName}>
         ${Object.entries(args)
        .map(([key, value]) => `<${key}>${value}</${key}>`)
        .join('')}
       </web:${methodName}>
     </soapenv:Body>
   </soapenv:Envelope>
 `;

    try {
      // Realizar la llamada al servicio SOAP
      const response = await axios.post(url, soapRequest, {
        headers: {
          'Content-Type': 'text/xml',
        },
        withCredentials: true,
      });

      console.log(response.data);

      // Verificar si la respuesta fue exitosa
      if (response.ok) {
        const responseBody = await response.text();

        // Procesar la respuesta XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseBody, 'text/xml');
        const resultValue = xmlDoc.querySelector('return').textContent;

        // Actualizar el estado con el resultado
        setResult(resultValue);
      } else {
        console.error('Error al llamar al servicio SOAP:', response.statusText);
      }
    } catch (error) {
      console.error('Error al llamar al servicio SOAP:', error);
    }
  };

  return (
    <div>
      <h1>Consumir Servicios SOAP desde React</h1>
      <div>
        <button onClick={() => callSoapService('create_user', { nombre_apellidos: 'Nombre Apellido', email: 'correo@example.com', google_id: 'google_id' })}>
          Crear Usuario
        </button>
      </div>
      <div>
        <button onClick={() => callSoapService('read_user', { user_id: 'correo@example.com' })}>
          Leer Usuario
        </button>
      </div>
      <div>
        <button onClick={() => callSoapService('read_all_users')}>
          Leer Todos los Usuarios
        </button>
      </div>
      <div>
        <button onClick={() => callSoapService('update_user', { user_id: 'correo@example.com', new_nombre_apellidos: 'Nuevo Nombre', new_email: 'nuevo_correo@example.com', new_google_id: 'nuevo_google_id' })}>
          Actualizar Usuario
        </button>
      </div>
      <div>
        <button onClick={() => callSoapService('delete_user', { user_id: 'correo@example.com' })}>
          Eliminar Usuario
        </button>
      </div>

      <div>
        <strong>Resultado:</strong>
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export default SoapClient;