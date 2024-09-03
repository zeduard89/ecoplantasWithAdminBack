import { PlantasModel } from "../../config/db"
import { IPlantas} from '../../types/types'
import fs from 'fs';
import path from 'path';
const SERVER_URL = process.env.SERVER_URL;


const uploadPlantasController = async (plantData?: IPlantas): Promise<object> => {
  try {
    if (!plantData) {
      throw new Error('Datos son requeridos');
    }

    let {title,description,category,imageUrl} = plantData

    if (!title) {
      throw new Error('Datos incompletos: title');}
    if(!description){
      description=''}
    if(!imageUrl){
      throw new Error('Datos incompletos: imagen');}
    
    const plantExist = await PlantasModel.findOne({
      where:{title}
    })
    if(plantExist){
      const imageToDelete = imageUrl.split(`${SERVER_URL}`)[1]
    const filePath = path.resolve(__dirname,'..', '..', 'storage'+imageToDelete);
    if(fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
      throw new Error ('Planta Existente');
    }

    const newPlant = await PlantasModel.create({
      title,
      description,
      category,
      imageUrl
    })

    return {ok:true, msg:{newPlant}};
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default uploadPlantasController