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
        
    const plantExist = await PlantasModel.findOne({
      where:{
        title
      }
    })
    
    if (plantExist && plantExist.id !== Number(id)) {
      throw new Error('Título existente');
    }

    const plantToUpdate = await PlantasModel.findByPk(id)
    
    if(!plantToUpdate){
      throw new Error ('Planta no encontrada');
    }

    await plantToUpdate.update({
      title,
      description,
      imageUrl})

    return {ok:true, success:true};
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default updatePlantasController