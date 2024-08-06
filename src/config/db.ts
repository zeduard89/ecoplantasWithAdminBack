import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import AdminModel from "../models/AdminModel"


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
    models: [AdminModel],
  }
);

sequelize.addModels([
    AdminModel,
])

// 1:1 Esto permite que un usuario tenga un perfil asociado.

// ProjectModel.hasOne(ImagesModel, { foreignKey: 'PId' });
// ImagesModel.belongsTo(UserModel, { foreignKey: 'ImagesId'})

//! 1:N Esto permite que un usuario tenga múltiples proyectos asociados.
// creatorId, es un atributo de ProjectModel y tarjetkey apunta al id del UserModel



export {
  sequelize,
  AdminModel,
}