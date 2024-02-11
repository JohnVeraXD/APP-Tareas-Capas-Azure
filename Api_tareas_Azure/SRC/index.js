const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookie_parser = require("cookie-parser");
const http = require("http");

//Este middleware se ejecuta antes de entrar a una ruta protegida, es decir, se necesita un token valido para acceder
const { authenticateToken } = require("./middleware/authorization.js");

//Importacion de las rutas principales en variables
const authRoutes = require("./routes/auth-routes.js");
const gruposRoutes = require("./routes/grupos-routes.js");
const tareasRoutes = require("./routes/tareas-routes.js");

//config entorno
dotenv.config();


//Configurar el puerto donde se abre la API
const app = express();
const PORT = 4099;

//direccion donde se abre
const corsOptions = {credentials: true, origin: "http://localhost:3000"};

//configuracion del server
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookie_parser());

//Rutas publicas
app.use("/authgoogle", authRoutes);


//Rutas protegidas por el token
//app.use("/users", authenticateToken, userRoutes);
app.use("/grupos", authenticateToken, gruposRoutes);
app.use("/tareas", authenticateToken, tareasRoutes);


//Iniciar la API
app.listen(PORT, () => console.log("SERVER ON PORT" + PORT));
