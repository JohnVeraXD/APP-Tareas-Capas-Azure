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


export default function CrearTareas({ re_id_grupo, abrir, cerrar, crear }) {

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen((cur) => !cur);
    const cookies = new Cookies();

    //estado para almacenar la info de la tarea
    const [tarea, setTarea] = useState({
        p_titulo: "",
        p_descripcion: "",
        p_importante: false,
        p_id_user: cookies.get("id_user"),
        p_id_grupos: 0,
    });

    //funcion para guardar en el json las variables para enviar al form
    const HandleChange = (e) => {
        if (e.target.type === "checkbox") {
            // Si el evento proviene de un checkbox, actualiza p_importante con el estado del checkbox
            setTarea({ ...tarea, [e.target.name]: e.target.checked });
        } else {
            // Para otros tipos de input, actualiza normalmente
            setTarea({ ...tarea, [e.target.name]: e.target.value });
        }
    };

    //variable para detectar un error y mostrar el error
    const [error, setError] = useState(false);
    //variable para almacenar el mensaje del error
    const [mensajeError, setMensajeError] = useState("");

    useEffect(() => {
        setTarea((prevTarea) => ({
            ...prevTarea,
            p_id_grupos: re_id_grupo,
        }));
    }, [re_id_grupo]);

    useEffect(() => {
        setError(false);
        setMensajeError("");
    }, []);
    //funcion para crear la tarea
    const Crear_Tarea = async () => {     
        try {
            const result = await axios.post(
                process.env.NEXT_PUBLIC_ACCESLINK + "tareas/CrearTarea",
                tarea,
                {
                    withCredentials: true,
                }
            );
            crear(true);
            cerrar(false);
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
    const cerrar1 = (valor) => {
        setError(valor);
    };
    return (
        <>
            <Dialog
                size="xs"
                open={abrir}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                {error ? (
                    <Dialog_Error
                        mensaje={mensajeError}
                        titulo="Error al llenar el formulario"
                        cerrar={cerrar1}
                    />
                ) : (
                    ""
                )}

                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Crear Tarea
                        </Typography>
                        <IconButton
                            className="!absolute top-3 right-3 bg-transparent shadow-none"
                            onClick={() => cerrar(false)}
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
                            onChange={HandleChange}
                        />

                        <Input
                            label="Descripcion"
                            size="lg"
                            name="p_descripcion"
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
                            onClick={Crear_Tarea}
                            fullWidth
                            color="green"
                        >
                            Aceptar
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}
