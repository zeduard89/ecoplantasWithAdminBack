import { MaceterosModel } from "../../config/db"

const getMaceterosByIdController = async (plantId:number): Promise<object> => {
  try {   

    const maceterosExist = await MaceterosModel.findByPk(plantId)

    if(!maceterosExist){
      throw new Error ('La planta en la DB no existe');
    }

    return {ok:true, maceterosExist};
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default getMaceterosByIdController