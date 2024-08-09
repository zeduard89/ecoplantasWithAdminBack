import { PlantasModel } from "../../config/db"

const getAllPlantsController = async (): Promise<object> => {
  try {   
    const categoryValue = 'plantas';

    const plantasArray = await PlantasModel.findAll({
      where:{
        category:categoryValue
      }
    })

    if(plantasArray.length === 0){
      throw new Error ('No hay plantas en la DB');
    }

    return {ok:true, plantasArray};
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default getAllPlantsController