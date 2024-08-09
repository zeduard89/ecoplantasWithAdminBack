import { PlantasModel } from "../../config/db"

const getPlantByIdController = async (plantId:number): Promise<object> => {
  try {   

    const plantExist = await PlantasModel.findByPk(plantId)

    if(!plantExist){
      throw new Error ('La planta en la DB no existe');
    }

    return {ok:true, plantExist};
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default getPlantByIdController