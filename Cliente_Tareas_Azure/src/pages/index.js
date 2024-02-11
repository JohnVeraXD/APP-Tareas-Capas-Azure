import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import Lottie from "lottie-react";
import Dialog_Error from "../widgets/dialog_error";
import Cookies from "universal-cookie";
import anim from "../../public/anim/TareasHome.json";
import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import Router from "next/router";

//paguina para el login desde los administradores --> profesores
export default function Index() {
    //Borrar cookies en caso de existir alguna
    useEffect(() => {
        const cookies = new Cookies();
        cookies.remove("id_user");
        cookies.remove("myTokenName");
    }, []);
    //variables para el inicio de sesion
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    //variable para detectar un error y mostrar el error 
    const [error, setError] = useState(false);
    //variable para almacenar el mensaje del error
    const [mensajeError, setMensajeError] = useState('');

    //variable para saber si se inicio sesion correctamente 
    const [autenticado, setAutencidado] = useState(false);
    //funcion para alimentar la variable que contiene las credenciales 
    const HandleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    //Envento clik para iniciar con google


    const login = useGoogleLogin({
        onSuccess: async (respose) => {

            try {
                const res = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${respose.access_token}`,
                        },
                    }
                );

                console.log(res.data);
                //Aqui va para sacar el token ty sacar el mail del token que te regresa google
                const email = res.data.email;
                console.log(email);

                //Llama al metodo pasandole el email
                GoogleLogin(email);

            } catch (error) {
                console.log(error);

            }
        },
    });


    const GoogleLogin = async (p_email) => {
        try {

            console.log(p_email);
            const result = await axios.post(
                process.env.NEXT_PUBLIC_ACCESLINK + "authgoogle/LoginGoogle",
                { p_email },
                {
                    withCredentials: true,
                }
            );
            //console.log("asdas", result);

            const cookies = new Cookies();
            //Cookie para el token
            cookies.set("myTokenName", result.data.token, { path: "/" }); //enviar cokiee y almacenarla
            //Cookie para el id del usuario
            cookies.set("id_user", result.data.id, { path: "/" });

            //para abrir la nueva ruta en la misma pestana
            Router.push("/dashboard/Home");

            console.log(result.data);

        } catch (error) {
            console.log(error);

            //colocar una alerta de error cuando no se pueda inciar sesion
            setError(true);
            setMensajeError(error.response.data.error);
        }
    };


    //funcion para cerrar el dialog del error 
    const cerrar = (valor) => {
        setError(valor)
    }



    return (
        <div className=" w-full h-ful ">
            {error ? <Dialog_Error mensaje={mensajeError} titulo="Error Inicio de sesion" cerrar={cerrar} /> : ("")}
            <Card color="transparent" shadow={false} className="mx-auto w-full max-w-[24rem] mt-10 shadow-xl p-6 hover:shadow-green-500 border-4 border-blue-900  border-solid text-center bg-white items-center justify-center rounded-none">
                <div className="p-2 mx-auto">
                    <Typography variant="h4" color="blue-gray">
                        Gestionador de Tareas
                    </Typography>
                    <Lottie animationData={anim} className="w-40 mx-auto" />
                </div>
                <Typography variant="h4" color="blue-gray">
                    Iniciar Sesion
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Ir a la aplicación de gestion de tareas
                </Typography>
                <form className="mt-8 mb-2" >
                    <div
                        className="h-auto bg-gray-200  flex items-center justify-center mt-4 cursor-pointer text-center rounded-lg mx-auto"
                        onClick={login}
                    >
                        <div className="p-2">
                            <img
                                className="h-7 w-7 rounded-full"
                                src="/img/Home/Google.png"
                                alt="User image"
                            />
                        </div>
                        <div className="ml-2 p-3 pr-10 font-bold text-blue-gray-600">
                            Iniciar sesion
                        </div>
                    </div>
                    <div
                        className="h-auto bg-gray-200  flex items-center justify-center mt-4 cursor-pointer text-center rounded-lg mx-auto"
                    >
                        <div className="p-2">
                            <img
                                className="h-7 w-7 rounded-full"
                                src="/img/Home/Google.png"
                                alt="User image"
                            />
                        </div>
                        <div className="ml-2 p-3 pr-10 font-bold text-blue-gray-600">
                            Registrarse
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
}

