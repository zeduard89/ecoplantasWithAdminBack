import { PlantasModel } from "../../config/db"
import { IPlantas} from '../../types/types'
// import path from 'path';
// import fs from 'fs';
// const SERVER_URL = process.env.SERVER_URL;


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