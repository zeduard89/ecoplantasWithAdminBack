import { MaceterosModel } from "../../config/db"
import { IMaceteros} from '../../types/types'

const updateMaceterosController = async (maceteroData?: IMaceteros): Promise<object> => {
  try {
    if (!maceteroData) {
      throw new Error('Datos son requeridos');
    }

    const {id,title,description,base,altura,largo, imageUrl} = maceteroData
    
    const maceteroExist = await MaceterosModel.findByPk(id)

    if(!maceteroExist){
      throw new Error ('Id Inexistente');
    }

    await maceteroExist.update({
      title,
      description,
      base,
      altura,
      largo,
      imageUrl
    })

    return {ok:true, msg:{maceteroExist}};
    
  } catch (error) {
    const errorMessage =
      (error as Error).message
    return { errorMessage }
  }
}

export default updateMaceterosController