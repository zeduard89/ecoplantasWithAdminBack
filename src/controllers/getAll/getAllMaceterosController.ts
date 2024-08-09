import { MaceterosModel } from "../../config/db"

const getAllMaceterosController = async (): Promise<object> => {
  try {   
    const categoryValue = 'maceteros';

    const maceterosArray = await MaceterosModel.findAll({
      where:{
        category:categoryValue
      }
    })

    if(maceterosArray.length === 0){
      throw new Error ('No hay plantas en la DB');
    }

    return {ok:true, maceterosArray};
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default getAllMaceterosController