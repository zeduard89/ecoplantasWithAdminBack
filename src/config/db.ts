import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import AdminModel from "../models/AdminModel"
import PlantasModel from "../models/PlantasModel"
import MacetasModel from "../models/MacetasModel"
import MaceterosModel from "../models/MaceterosModel"


dotenv.config()

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME,DB_PORT } = process.env;
const sequelize = new Sequelize({
  dialect: "mysql",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: parseInt(DB_PORT || '3306', 10),
  dialectOptions: {
    
  },
  logging: false,
  models: [AdminModel, PlantasModel, MacetasModel, MaceterosModel],
});

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