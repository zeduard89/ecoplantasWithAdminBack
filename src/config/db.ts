import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import AdminModel from "../models/AdminModel"
import PlantasModel from "../models/PlantasModel"
import MacetasModel from "../models/MacetasModel"
import MaceterosModel from "../models/MaceterosModel"

dotenv.config()

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, NODE_ENV } = process.env;
const sequelize = new Sequelize(
  `postgres://${DB_USER ?? ""}:${DB_PASSWORD ?? ""}@${DB_HOST ?? ""}/${DB_NAME ?? ""}`,
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: NODE_ENV === 'production' ? {
        require: true,
        rejectUnauthorized: false // Solo si estás usando un certificado autofirmado
      } : false
    },
    logging: false,
    native: false,
    models: [AdminModel, PlantasModel,MacetasModel,MaceterosModel],
  }
);

sequelize.addModels([
    AdminModel,PlantasModel,MacetasModel,MaceterosModel
])



export {
  sequelize,
  AdminModel,
  PlantasModel,
  MacetasModel,
  MaceterosModel
}