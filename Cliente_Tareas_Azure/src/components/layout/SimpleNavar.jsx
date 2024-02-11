import React from "react";
import anim from "../../../public/anim/TareasHome.json";
import Lottie from "lottie-react";
import Router from "next/router";


import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  ListItem,
  ListItemPrefix,
  List,
  Button,
} from "@material-tailwind/react";

import {
  PowerIcon,
  InboxIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";


import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";



function NavList() {


  const RedirectGrupos = () => {
    Router.push('../../dashboard/Grupos_Tareas');
  };

  return (
    <ul className="my-2 flex flex-col lg:flex-row gap-2 lg:mb-0 lg:mt-0 lg:items-center lg:gap-6">
      <hr className="my-2 border-blue-gray-50" />
      <ListItem onClick={RedirectGrupos} >
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
    </ul>
  );
}

export function SimpleNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto max-w-100% px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div>
          <Lottie animationData={anim} className="w-20 mx-auto" />
        </div>
        <Typography
          as="a"
          href="/dashboard/Home"
          variant="h3"
          className="mr-4 cursor-pointer py-1.5"
        >
          Gestionador de Tareas
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}

export default SimpleNavbar;