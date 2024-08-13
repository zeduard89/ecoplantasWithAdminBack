import { PlantasModel } from "../../config/db"

const deletePlantByIdController = async (plantId:number): Promise<object> => {
  try {   

    const plantExist = await PlantasModel.findByPk(plantId)

    if(!plantExist){
      throw new Error ('La planta en la DB no existe');
    }

    await PlantasModel.destroy({
      where: {
        id: plantId
      }
    });

    return { ok: true, message: 'Planta eliminada con éxito' };
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default deletePlantByIdController