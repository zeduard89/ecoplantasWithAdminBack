import { MacetasModel } from "../../config/db"
import { IMacetas} from '../../types/types'

const updatePlantasController = async (macetasData?: IMacetas): Promise<object> => {
  try {
    if (!macetasData) {
      throw new Error('Datos son requeridos');
    }

    const {id,title,description,boca,base,altura,peso,capacidad, imageUrl} = macetasData
    
    const macetaExist = await MacetasModel.findByPk(id)

    if(!macetaExist){
      throw new Error ('Id Inexistente');
    }

    await macetaExist.update({
      title,
      description,
      boca,
      base,
      altura,
      peso,
      capacidad,
      imageUrl
    })

    return {ok:true, msg:{macetaExist}};
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default updatePlantasController