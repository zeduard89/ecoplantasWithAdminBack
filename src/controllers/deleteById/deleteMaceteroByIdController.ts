import { MaceterosModel } from "../../config/db"

const getMaceterosByIdController = async (maceteroId:number): Promise<object> => {
  try {   

    const maceterosExist = await MaceterosModel.findByPk(maceteroId)

    if(!maceterosExist){
      throw new Error ('La planta en la DB no existe');
    }

    await MaceterosModel.destroy({
      where: {
        id: maceteroId
      }
    });

    return { ok: true, message: 'Macetero eliminada con éxito' };
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default getMaceterosByIdController