import { MacetasModel } from "../../config/db"

const getAllMacetasController = async (): Promise<object> => {
  try {   
    const categoryValue = 'macetas';

    const macetasArray = await MacetasModel.findAll({
      where:{
        category:categoryValue
      }
    })

    if(macetasArray.length === 0){
      throw new Error ('No hay plantas en la DB');
    }

    return {ok:true, macetasArray};
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default getAllMacetasController