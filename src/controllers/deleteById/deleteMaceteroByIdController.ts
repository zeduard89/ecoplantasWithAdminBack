import { MaceterosModel } from "../../config/db"
import path from 'path';
import fs from 'fs';
const SERVER_URL = process.env.SERVER_URL;

const getMaceterosByIdController = async (maceteroId:number): Promise<object> => {
  try {   

    const maceterosExist = await MaceterosModel.findByPk(maceteroId)

    if(!maceterosExist){
      throw new Error ('La planta en la DB no existe');
    }

    // Borra la imagen
    const imageToDelete = maceterosExist.imageUrl.split(`${SERVER_URL}`)[1]
    const filePath = path.resolve(__dirname,'..', '..', 'storage'+imageToDelete);
    if(fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await MaceterosModel.destroy({
      where: {
        id: maceteroId
      }
    });

    return { ok: true, message: 'Macetero eliminada con éxito' };
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default getMaceterosByIdController