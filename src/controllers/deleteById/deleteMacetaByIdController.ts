import { MacetasModel } from "../../config/db"

const deleteMacetaByIdController = async (macetaId:number): Promise<object> => {
  try {   

    const macetaExist = await MacetasModel.findByPk(macetaId)

    if(!macetaExist){
      throw new Error ('La planta en la DB no existe');
    }

    await MacetasModel.destroy({
      where: {
        id: macetaId
      }
    });

    return { ok: true, message: 'Maceta eliminada con éxito' };
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default deleteMacetaByIdController