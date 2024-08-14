import { MacetasModel } from "../../config/db"
import path from 'path';
import fs from 'fs';
const SERVER_URL = process.env.SERVER_URL;

const deleteMacetaByIdController = async (macetaId:number): Promise<object> => {
  try {   

    const macetaExist = await MacetasModel.findByPk(macetaId)

    if(!macetaExist){
      throw new Error ('La planta en la DB no existe');
    }

    // Borra la imagen
    const imageToDelete = macetaExist.imageUrl.split(`${SERVER_URL}`)[1]
    const filePath = path.resolve(__dirname,'..', '..', 'storage'+imageToDelete);
    if(fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await MacetasModel.destroy({
      where: {
        id: macetaId
      }
    });

    return { ok: true, message: 'Maceta eliminada con éxito' };
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default deleteMacetaByIdController