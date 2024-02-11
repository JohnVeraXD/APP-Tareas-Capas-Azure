import { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    IconButton,
    ListItemPrefix,
} from "@material-tailwind/react";

import { XCircleIcon } from "@heroicons/react/24/solid";

import Cookies from "universal-cookie";
import axios from "axios";
import { Dialog_Error, Notification } from "@/widgets"; //Importar el componente


export default function ModificarTarea({ re_titulo, re_descripcion, re_importante, re_id_tareas, abrirM, cerrarM, crearM }) {

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen((cur) => !cur);

    //estado para almacenar la info de la tarea
    const [tarea, setTarea] = useState({
        p_titulo: "",
        p_descripcion: "",
        p_importante: false,
        p_id_tareas: 0,
    });

    //funcion para guardar en el json las variables para enviar al form
    const HandleChange = (e) => {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setTarea((prevTarea) => ({
            ...prevTarea,
            [e.target.name]: value,
        }));
    };

    //variable para detectar un error y mostrar el error
    const [error, setError] = useState(false);
    //variable para almacenar el mensaje del error
    const [mensajeError, setMensajeError] = useState("");

    useEffect(() => {
        //console.log({re_titulo,re_descripcion,re_importante,re_id_tareas});
        setTarea((prevTarea) => ({
            ...prevTarea,
            p_titulo: re_titulo,
            p_descripcion: re_descripcion,
            p_importante: re_importante,
            p_id_tareas: re_id_tareas,
        }));
    }, [re_titulo, re_descripcion, re_importante, re_id_tareas]);

    useEffect(() => {
        setError(false);
        setMensajeError("");
    }, []);
    //funcion para modificar la tarea
    const Modificar_Tarea = async () => {
        try {
            const result = await axios.put(
                process.env.NEXT_PUBLIC_ACCESLINK + "tareas/ModificarTarea",
                tarea,
                {
                    withCredentials: true,
                }
            );
            crearM(true);
            cerrarM(false);
            //console.log(result);
        } catch (error) {
            //colocar una alerta de error
            if (error.response.data.error == "tareas_titulo_key") {
                setMensajeError("El titulo debe ser unico");
            }
            else {
                setMensajeError(error.response.data.error);
            }
            setError(true);
        }
    };

    //funcion para Eliminar la tarea
    const Eliminar_Tarea = async () => {
        try {
            const result = await axios.delete(
                process.env.NEXT_PUBLIC_ACCESLINK + "tareas/EliminarTarea/" + tarea.p_id_tareas,
                {
                    withCredentials: true,
                }
            );
            crearM(true);
            cerrarM(false);
            //console.log(result);
        } catch (error) {
            //colocar una alerta de error
            setMensajeError(error.response.data.error);
            setError(true);
        }
    };


    const cerrar1 = (valor) => {
        setError(valor);
    };
    return (
        <>
            <Dialog
                size="xs"
                open={abrirM}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                {error ? (
                    <Dialog_Error
                        mensaje={mensajeError}
                        titulo="Error al llenar el formulario"
                        cerrarM={cerrar1}
                    />
                ) : (
                    ""
                )}

                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Modificar Tarea
                        </Typography>
                        <IconButton
                            className="!absolute top-3 right-3 bg-transparent shadow-none"
                            onClick={() => cerrarM(false)}
                        >
                            <XCircleIcon className="w-11" color="orange" />
                        </IconButton>

                        <Typography
                            className="mb-3 font-normal"
                            variant="paragraph"
                            color="gray"
                        >
                            Llene el formulario
                        </Typography>

                        <Input
                            label="Titulo"
                            size="lg"
                            name="p_titulo"
                            value={tarea.p_titulo}
                            onChange={HandleChange}
                        />

                        <Input
                            label="Descripcion"
                            size="lg"
                            name="p_descripcion"
                            value={tarea.p_descripcion}
                            onChange={HandleChange}
                        />

                        <Card className="w-full max-w-[100%]">
                            <label
                                htmlFor="Tareas"
                                className="flex w-full cursor-pointer items-center px-3 py-2"
                            >
                                <ListItemPrefix className="mr-3">
                                    <Checkbox
                                        id="Tareas"
                                        name="p_importante"
                                        ripple={false}
                                        checked={tarea.p_importante}
                                        className="hover:before:opacity-0"
                                        containerProps={{
                                            className: "p-0",
                                        }}
                                        color="green"
                                        onChange={HandleChange} // Asocia la función HandleChange al evento onChange del Checkbox
                                    />
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="font-bold w-full h-full flex items-center justify-center ">
                                    Es Importante?
                                </Typography>
                            </label>
                        </Card>

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button
                            variant="gradient"
                            onClick={Modificar_Tarea}
                            fullWidth
                            color="green"
                        >
                            Aceptar
                        </Button>
                    </CardFooter>
                    <CardFooter className="pt-0">
                        <Button
                            variant="gradient"
                            onClick={Eliminar_Tarea}
                            fullWidth
                            color="red"
                        >
                            Eliminar
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}
