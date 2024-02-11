import React from "react";
import anim from "../../../public/anim/TareasHome.json";
import Lottie from "lottie-react";

import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";

export function BarraNavegacion() {
    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            
            <div className="mb-2 flex items-center gap-4 p-4">
                <Typography variant="h5" color="blue-gray">
                    Gestionador de Tareas
                </Typography>
            </div>
            <div>
                <Lottie animationData={anim} className="w-40 mx-auto" />
            </div>
            <List>
                <hr className="my-2 border-blue-gray-50" />
                <ListItem>
                    <ListItemPrefix>
                        <InboxIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Grupos de tareas

                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Perfil
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Cerrar sesión
                </ListItem>
            </List>
        </Card>
    );
}

export default BarraNavegacion;