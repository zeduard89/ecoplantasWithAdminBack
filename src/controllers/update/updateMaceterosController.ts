import { MaceterosModel } from "../../config/db"
import { IMaceteros} from '../../types/types'
import path from 'path';
import fs from 'fs';
const SERVER_URL = process.env.SERVER_URL;


const updateMaceterosController = async (maceteroData?: IMaceteros): Promise<object> => {
  try {
    if (!maceteroData) {
      throw new Error('Datos son requeridos');
    }

    const {id,title,description,base,altura,largo, imageUrl} = maceteroData
    
    const maceteroExist = await MaceterosModel.findByPk(id)

    if(!maceteroExist){
      throw new Error ('Id Inexistente');
    }
    
    // Opcional: Elimina la imagen antigua del sistema de archivos si es necesario
    const imageToDelete = maceteroExist.imageUrl.split(`${SERVER_URL}`)[1]
    const filePath = path.resolve(__dirname, '..', '..', 'storage'+imageToDelete);
    if(fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }


    await maceteroExist.update({
      title,
      description,
      base,
      altura,
      largo,
      imageUrl
    })

    return {ok:true, msg:{maceteroExist}};
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default updateMaceterosController