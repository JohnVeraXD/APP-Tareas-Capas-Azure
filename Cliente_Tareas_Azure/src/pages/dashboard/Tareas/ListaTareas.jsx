import React from 'react'
import Footer from '@/components/layout/Footer'
import '../../../styles/globals.css'
import SimpleNavbar from '@/components/layout/SimpleNavar'
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Notification } from "@/widgets"; //Importar el componente
import Cookies from "universal-cookie";
import { CrearTareas, ModificarTarea } from "@/pages/dashboard/Tareas";

import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Checkbox,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";

import {
    PlusIcon,
} from "@heroicons/react/24/solid";



export default function ListaTareas() {

    const router = useRouter();

    // Obtener los datos de la URL solo en el lado del cliente
    const { r_id_grupo, r_titulo } = router.query;

    //estado para almacenar todo las tareas de x grupo de x usuario
    const [secciones, setSecciones] = useState([]);

    useEffect(() => {
        if (r_id_grupo && r_titulo) {
            Obtener_Tareas_Usuario();
        }
        //console.log("Hola" + r_id_grupo + "    " + r_titulo)

    }, [r_id_grupo, r_titulo]);


    //estado para abrir el modal para modoficar una tarea
    const [openCreateM, setOpenCreateM] = useState(false);
    const cerrarM = (value) => {
        setOpenCreateM(value);
        Obtener_Tareas_Usuario();
    };

    const crearM = (value) => {
        setOpenAlert(value);
    };

    //estado para abrir el modal para crear una tarea
    const [openCreate, setOpenCreate] = useState(false);
    const cerrar = (value) => {
        setOpenCreate(value);
        Obtener_Tareas_Usuario();
    };

    const [error, setError] = useState(false);
    const [mensajeError, setMensajeError] = useState("");

    const [openAlert, setOpenAlert] = useState(false);
    const crear = (value) => {
        setOpenAlert(value);
    };

    const cookies = new Cookies();

    useEffect(() => {

    }, []);


    //funcion para cargar las tareas de x grupo que tiene el usuario obteniendo su id de la cookie
    const Obtener_Tareas_Usuario = async () => {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_ACCESLINK +
                "tareas/ListaTareas/" +
                cookies.get("id_user") + "/"
                + r_id_grupo,
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

    const [r1_titulo, setR1_titulo] = useState('');
    const [r1_descripcion, setR1_descripcion] = useState('');
    const [r1_importante, setR1_importante] = useState('');
    const [r1_id_tareas, setR1IdTareas] = useState('');

    //Funcion para abrir la lista de tareas que tiene x grupo
    const ModificarTareas = (r_titulo, r_descripcion, r_importante, r_id_tareas) => {
        setR1_titulo(r_titulo);
        setR1_descripcion(r_descripcion);
        setR1_importante(r_importante);
        setR1IdTareas(r_id_tareas);
    };

    return (
        <div className="p-1 contenedor">
            <SimpleNavbar />

            <div className=" bg-white contenido border border-gray-300 p-2 mt-2 ml-2 mr-2">

                <Card className="h-full w-full mt-1 rounded-none p-0">
                    {<CrearTareas re_id_grupo={r_id_grupo} abrir={openCreate} cerrar={cerrar} crear={crear} />}
                    {<ModificarTarea re_titulo={r1_titulo} re_descripcion={r1_descripcion} re_importante={r1_importante} re_id_tareas={r1_id_tareas} abrirM={openCreateM} cerrarM={cerrarM} crearM={crearM} />}
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-8 flex items-center justify-between gap-8">
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Lista de Tareas creadas.
                                </Typography>
                            </div>
                            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                                <Button
                                    className="flex items-center gap-3"
                                    size="sm"
                                    color="green"
                                    onClick={() => setOpenCreate(true)}
                                >
                                    <PlusIcon strokeWidth={2} className="h-4 w-4" /> Crear Tareas
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
                                Usted no tiene ninguna tarea creada
                            </Typography>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-5">
                            {secciones.map(
                                ({ r_id_tareas, r_titulo, r_descripcion, r_fecha_creacion, r_completada, r_importante }) => (
                                    <div
                                        key={r_id_tareas}
                                        className={`${r_importante
                                            ? ' bg-blue-200'  // Se aplica si r_importante es true
                                            : 'bg-blue-gray-50'
                                            } shadow-2xl rounded-none cursor-pointer hover:border-4 `}
                                        onClick={() => { ModificarTareas(r_titulo, r_descripcion, r_importante, r_id_tareas); setOpenCreateM(true) }}
                                    >
                                        <div className="bg-zinc-900 rounded-2xl">
                                            <div className="mx-auto">
                                                <div className="w-full p-4">
                                                    <input
                                                        className={`${r_importante
                                                            ? ' bg-blue-200'  // Se aplica si r_importante es true
                                                            : 'bg-blue-gray-50'
                                                            }  w-full text-2xl text-center font-semibol	text-blue-gray-800 `}
                                                        disabled
                                                        value={r_titulo}
                                                    />
                                                </div>
                                                <div className="w-full p-4">
                                                    <input
                                                        className={`${r_importante
                                                            ? ' bg-blue-200'  // Se aplica si r_importante es true
                                                            : 'bg-blue-gray-50'
                                                            } w-full text-justify font-normal	text-blue-gray-800`}
                                                        disabled
                                                        value={r_descripcion}
                                                    />
                                                </div>
                                                <div className="w-full p-2 pr-5">
                                                    <input
                                                        className={`${r_importante
                                                            ? ' bg-blue-200'  // Se aplica si r_importante es true
                                                            : 'bg-blue-gray-50'
                                                            }  w-full text-right font-normal	text-blue-gray-800 `}
                                                        disabled
                                                        value={"Fecha de creación: " + r_fecha_creacion}
                                                    />
                                                </div>
                                                <div className="w-full h-full flex items-center justify-center p-2 pb-3">
                                                    <Card className="w-full max-w-[50%]">
                                                        <label
                                                            htmlFor={r_id_tareas}
                                                            className="flex w-full cursor-pointer items-center px-3 py-2"
                                                        >
                                                            <ListItemPrefix className="mr-3">
                                                                <Checkbox
                                                                    id={r_id_tareas}
                                                                    ripple={false}
                                                                    className="hover:before:opacity-0"
                                                                    containerProps={{
                                                                        className: "p-0",
                                                                    }}
                                                                    color="green"
                                                                />
                                                            </ListItemPrefix>
                                                            <Typography color="blue-gray" className="font-bold w-full h-full flex items-center justify-center ">
                                                                {r_completada ? "Completado" : "Pendiente"}
                                                            </Typography>
                                                        </label>
                                                    </Card>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                )
                            )}
                        </div>
                    </CardBody>
                    <Notification mensaje="Tarea creada" abrir={openAlert} crear={crear} />
                    <Notification mensaje="Tarea Modificada" abrir={openAlert} crear={crear} />
                </Card>
            </div>
            <div className="p-2">
                <Footer />
            </div>
        </div>
    )
}