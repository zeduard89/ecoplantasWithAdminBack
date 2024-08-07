import express, { ErrorRequestHandler } from "express"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import morgan from "morgan"
import cors from "cors"
import path from "path"

// Importacion de Rutas Dinamicas
import { router } from "../routes/index"

const server = express()

server.use(
  cors({
    origin: "*", // Permitir acceso desde cualquier origen
    credentials: true
  })
)

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
server.use(bodyParser.json({ limit: "50mb" }))
server.use(cookieParser())
server.use(morgan("dev"))

// Serve static HTML files from the 'public' directory
server.use(express.static(path.join(__dirname,'../storage'))); 

// Html
server.use("/index",(_req,res)=>{
  res.sendFile(path.join(__dirname,'../../views/index.html')); // Serve the HTML file directly
})

// Routes
server.use("/", router)

// Error catching middleware.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status: number = err.status !== undefined ? err.status : 500
  const message: string = err.message !== undefined ? err.message : String(err)
  console.error(err)
  res.status(status).send(message)
}

server.use(errorHandler)

export default server