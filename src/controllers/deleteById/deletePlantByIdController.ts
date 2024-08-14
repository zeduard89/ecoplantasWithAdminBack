import { PlantasModel } from "../../config/db"
import path from 'path';
import fs from 'fs';
const SERVER_URL = process.env.SERVER_URL;

const deletePlantByIdController = async (plantId:number): Promise<object> => {
  try {   

    const plantExist = await PlantasModel.findByPk(plantId)

    if(!plantExist){
      throw new Error ('La planta en la DB no existe');
    }

    // Borra la imagen
    const imageToDelete = plantExist.imageUrl.split(`${SERVER_URL}`)[1]
    const filePath = path.resolve(__dirname,'..', '..', 'storage'+imageToDelete);
    if(fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await PlantasModel.destroy({
      where: {
        id: plantId
      }
    });

    return { ok: true, message: 'Planta eliminada con éxito' };
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default deletePlantByIdController