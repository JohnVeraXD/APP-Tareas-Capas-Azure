import React from 'react';
import '../../styles/globals.css';
import Footer from '@/components/layout/Footer';
import SimpleNavbar from '@/components/layout/SimpleNavar';
import { Notification } from "@/widgets"; //Importar el componente

import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

import Router from "next/router";

import { CrearGrupo } from "@/pages/dashboard/Grupos";

import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
} from "@material-tailwind/react";

import {
  PlusIcon,
} from "@heroicons/react/24/solid";


export default function Grupos_Tareas() {

  //estado para almacenar todo los grupos del usuario
  const [secciones, setSecciones] = useState([]);

  //estado para abrir el modal para crear una seccion
  const [openCreate, setOpenCreate] = useState(false);
  const cerrar = (value) => {
    setOpenCreate(value);
    Obtener_Grupos_Usuario();
  };

  const [error, setError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const [openAlert, setOpenAlert] = useState(false);
  const crear = (value) => {
    setOpenAlert(value);
  };

  const cookies = new Cookies();

  useEffect(() => {
    Obtener_Grupos_Usuario();
  }, []);

  //funcion para cargar los grupso que tiene el usuario obteniendo su id de la cookie
  const Obtener_Grupos_Usuario = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_ACCESLINK +
        "grupos/GruposUsuario/" +
        cookies.get("id_user"),
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      //console.log(response);
      const data = await response.json();
      //console.log(data);
      setSecciones(data);

    } catch (error) {
      //colocar una alerta de error
      setError(true);
      //console.log(error);
      setMensajeError(error.response.data.error);
    }
  };

  //Funcion para abrir la lista de tareas que tiene x grupo
  const AbrirTareas = (r_id_grupo, r_titulo) => {
    // Navegar a la página "ListaTareas" con los datos
    Router.push({
      pathname: '/dashboard/Tareas/ListaTareas',
      query: { r_id_grupo, r_titulo },
    });
  };

  return (
    <div className="p-1 contenedor">
      <SimpleNavbar />

      <div className=" bg-white contenido border border-gray-300 p-2 mt-2 ml-2 mr-2">

        <Card className="h-full w-full mt-1 rounded-none p-0">
          {<CrearGrupo abrir={openCreate} cerrar={cerrar} crear={crear} />}
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Lista de Grupos de tareas creados
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button
                  className="flex items-center gap-3"
                  size="sm"
                  color="green"
                  onClick={() => setOpenCreate(true)}
                >
                  <PlusIcon strokeWidth={2} className="h-4 w-4" /> Crear Grupo
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            {secciones.length === 0 && (
              <Typography
                color="gray"
                variant="h4"
                className="mt-1 font-normal mx-auto items-center text-center"
              >
                Usted no tiene ningun grupo creado
              </Typography>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-5">
              {secciones.map(
                ({ r_id_grupo, r_fecha_creacion, r_titulo, r_descripcion }) => (
                  <div
                    key={r_id_grupo}
                    className={`bg-blue-gray-50 shadow-2xl rounded-none cursor-pointer hover:border-4`}
                    onClick={() => AbrirTareas(r_id_grupo, r_titulo)}
                  >
                    <div className="bg-zinc-900 rounded-2xl">
                      <div className="mx-auto">
                        <div className="w-full p-4">
                          <input
                            className="w-full text-2xl text-center bg-blue-gray-50 font-semibold	text-blue-gray-800 "
                            disabled
                            value={r_titulo}
                          />
                        </div>
                        <div className="w-full p-4">
                          <input
                            className="w-full text-justify bg-blue-gray-50 font-normal	text-blue-gray-800 "
                            disabled
                            value={r_descripcion}
                          />
                        </div>
                        <div className="w-full p-2 pr-5 pb-3">
                          <input
                            className="w-full text-right bg-blue-gray-50 font-normal	text-blue-gray-800 "
                            disabled
                            value={"Fecha de creación: " + r_fecha_creacion}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </CardBody>
          <Notification mensaje="Grupo creado" abrir={openAlert} crear={crear} />
        </Card>
      </div>
      <div className="p-2">
        <Footer />
      </div>
    </div>
  )
}
