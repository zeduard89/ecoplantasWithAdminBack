import { MacetasModel } from "../../config/db"

const getMacetaByIdController = async (macetaId:number): Promise<object> => {
  try {   

    const macetaExist = await MacetasModel.findByPk(macetaId)

    if(!macetaExist){
      throw new Error ('La planta en la DB no existe');
    }

    return {ok:true, macetaExist};
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default getMacetaByIdController