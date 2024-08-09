import { MacetasModel } from "../../config/db"
import { IMacetas} from '../../types/types'
import path from 'path';
import fs from 'fs';
const SERVER_URL = process.env.SERVER_URL;


const updatePlantasController = async (macetasData?: IMacetas): Promise<object> => {
  try {
    if (!macetasData) {
      throw new Error('Datos son requeridos');
    }

    const {id,title,description,boca,base,altura,peso,capacidad, imageUrl} = macetasData
    
    const macetaExist = await MacetasModel.findByPk(id)

    if(!macetaExist){
      throw new Error ('Id Inexistente');
    }
    
    // Opcional: Elimina la imagen antigua del sistema de archivos si es necesario
    const imageToDelete = macetaExist.imageUrl.split(`${SERVER_URL}`)[1]
    const filePath = path.resolve(__dirname, '..', '..', 'storage'+imageToDelete);
    if(fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }


    await macetaExist.update({
      title,
      description,
      boca,
      base,
      altura,
      peso,
      capacidad,
      imageUrl
    })

    return {ok:true, msg:{macetaExist}};
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default updatePlantasController