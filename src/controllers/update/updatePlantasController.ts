import { PlantasModel } from "../../config/db"
import { IPlantas} from '../../types/types'
import path from 'path';
import fs from 'fs';
const SERVER_URL = process.env.SERVER_URL;


const updatePlantasController = async (plantData?: IPlantas): Promise<object> => {
  try {
    if (!plantData) {
      throw new Error('Datos son requeridos');
    }

    const {id,title,description, imageUrl} = plantData
    
    const plantExist = await PlantasModel.findByPk(id)

    if(!plantExist){
      throw new Error ('Id Inexistente');
    }
    
    // Opcional: Elimina la imagen antigua del sistema de archivos si es necesario
    const imageToDelete = plantExist.imageUrl.split(`${SERVER_URL}`)[1]
    const filePath = path.resolve(__dirname, '..', '..', 'storage'+imageToDelete);
    if(fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }


    await plantExist.update({
      title,
      description,
      imageUrl
    })

    return {ok:true, msg:{plantExist}};
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default updatePlantasController