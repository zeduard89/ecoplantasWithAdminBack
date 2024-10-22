import { MacetasModel } from "../../config/db"
import { IMacetas} from '../../types/types'

const updatePlantasController = async (macetasData?: IMacetas): Promise<object> => {
  try {
    if (!macetasData) {
      throw new Error('Datos son requeridos');
    }

    const {id,title,description,boca,base,altura,peso,capacidad, imageUrl} = macetasData
    
    const macetaExist = await MacetasModel.findOne({
      where:{
        title
      }
    })
    
    if (macetaExist && macetaExist.id !== Number(id)) {
      throw new Error('Título existente');
    }

    const macetaToUpdate = await MacetasModel.findByPk(id)
    
    if(!macetaToUpdate){
      throw new Error ('Maceta no encontrada');
    }

    await macetaToUpdate.update({
      title,
      description,
      boca,
      base,
      altura,
      peso,
      capacidad,
      imageUrl
    })

    return {ok:true, success:true};
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default updatePlantasController