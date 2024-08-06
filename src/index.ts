import server from "./config/server";
import { sequelize, AdminModel } from "./config/db";
import "dotenv/config";
import createAdmin from './controllers/admin/createAdmin';
import { IAdmin } from "./types/types";


// Configuración del puerto
const PORT = process.env.PORT || "3002";

// Datos del administrador
const adminData: IAdmin = {
  userName: process.env.ADMIN_NAME || '',
  lastName: process.env.ADMIN_LASTNAME || '',
  password: process.env.ADMIN_PASSWORD || '',
  email: process.env.ADMIN_EMAIL || ''
};

const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Modelos sincronizados con éxito.");

    server.listen(PORT, async () => {
      console.log(`Servidor levantado en el puerto ${PORT}`);

      try {
        const adminExist = await AdminModel.findOne({
          where: {
            email: adminData.email
          }
        });
        if (adminExist) {
          console.log('Administrador Unico Existente:');
        }else{
          await createAdmin(adminData);
          console.log('Administrador Unico creado con exito:');
        }
        
      } catch (error) {
        console.error('Error en la inicialización:', error);
      }
    });
  } catch (error) {
    console.error("Error al sincronizar los modelos de Sequelize:", error);
  }
};

startServer();
